import React, { Component } from 'react';

import RepositoryItem from '../../components/RepositoryItem/index';

import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Form, SubmitBtn, List } from './styles';
import Container from '../../components/Container';
import api from '../../services/api';

export default class Main extends Component {
    state = {
        newRepo: '',
        repositories: [],
        loading: false
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
        this.setState({ loading: true });
        const { newRepo, repositories } = this.state;
        const response = await api.get(`/repos/${newRepo}`);
        const data = {
            name: response.data.full_name
        };
        this.setState({
            repositories: [...repositories, data],
            newRepo: ''
        });
        this.setState({ loading: false });
    };

    render() {
        const { newRepo, repositories, loading } = this.state;
        return (
            <Container>
                <h1>
                    <FaGithubAlt />
                    Repositorios
                </h1>
                <Form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        placeholder="Adicionar Repositorio"
                        onChange={this.handleInputChange}
                        value={newRepo}
                    ></input>

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
