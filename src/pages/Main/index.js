import React, { Component } from 'react';

import RepositoryItem from '../../components/RepositoryItem/index';

import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Form, SubmitBtn, List, Title } from './styles';
import Container from '../../components/Container';
import api from '../../services/api';

export default class Main extends Component {
    state = {
        newRepo: '',
        repositories: [],
        loading: false,
        inputColor: 'grey'
    };

    componentDidMount() {
        const repositories = localStorage.getItem('repositories');
        if (repositories) {
            this.setState({ repositories: JSON.parse(repositories) });
        }
    }

    componentDidUpdate(_, prevState) {
        const { repositories } = this.state;
        if (prevState.repositories !== repositories) {
            localStorage.setItem('repositories', JSON.stringify(repositories));
        }
    }

    handleInputChange = e => {
        this.setState({ newRepo: e.target.value });
    };
    handleSubmit = async e => {
        e.preventDefault();

        try {
            this.setState({ loading: true });
            const check = this.state.repositories.filter(
                repo => repo.name == this.state.newRepo
            );

            if (check) {
                throw new Error('Repository duplicate');
            }
            const { newRepo, repositories } = this.state;
            const response = await api.get(`/repos/${newRepo}`);
            const data = {
                name: response.data.full_name
            };
            this.setState({
                repositories: [...repositories, data],
                newRepo: '',
                inputColor: 'grey'
            });
        } catch (err) {
            this.setState({ inputColor: 'red' });
            console.log(err.message);
        }
        this.setState({ loading: false });
    };

    render() {
        const { newRepo, repositories, loading, inputColor } = this.state;
        return (
            <Container>
                {/* <Title inputColor={inputColor}>Testing</Title> */}
                <h1>
                    <FaGithubAlt />
                    Repositorios
                </h1>
                <Form onSubmit={this.handleSubmit} inputColor={inputColor}>
                    <input
                        type="text"
                        placeholder="Adicionar Repositorio"
                        onChange={this.handleInputChange}
                        value={newRepo}
                    />

                    <SubmitBtn loading={loading}>
                        {loading ? (
                            <FaSpinner color="#fff" size={14} />
                        ) : (
                            <FaPlus color="#fff" size={14}></FaPlus>
                        )}
                    </SubmitBtn>
                </Form>

                <List>
                    {repositories.map(repo => (
                        <RepositoryItem key={repo.name} data={repo} />
                    ))}
                </List>
            </Container>
        );
    }
}
