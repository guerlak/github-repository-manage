import React, { Component } from 'react';
import api from '../../services/api';
import PropTypes from 'prop-types';
import { Loading, Owner, IssuesList } from './styles';
import { FaArrowLeft } from 'react-icons/fa';
import Container from '../../components/Container';
import { Link } from 'react-router-dom';

export default class Repository extends Component {
    static propTypes = {
        match: PropTypes.shape({
            params: PropTypes.shape({
                repository: PropTypes.string
            })
        }).isRequired
    };
    state = {
        repository: {},
        issues: [],
        loading: true
    };

    async componentDidMount() {
        const { match } = this.props;

        const repoName = decodeURIComponent(match.params.repository);

        const [repo, issues] = await Promise.all([
            api.get(`/repos/${repoName}`),
            api.get(`/repos/${repoName}/issues`, {
                params: {
                    state: 'open',
                    per_page: 5
                }
            })
        ]);

        this.setState({
            repository: repo.data,
            issues: issues.data,
            loading: false
        });
    }

    render() {
        const { repository, issues } = this.state;
        if (this.state.loading) {
            return <Loading>Aguarde...</Loading>;
        }
        return (
            <>
                <Container>
                    <Link to="/">
                        <FaArrowLeft /> Voltar
                    </Link>
                    <Owner>
                        <img
                            src={repository.owner.avatar_url}
                            alt={repository.owner.login}
                        ></img>
                        <h1>{repository.name}</h1>
                        <p>{repository.description}</p>
                    </Owner>

                    <IssuesList>
                        {issues.map(issue => (
                            <li key={String(issue.id)}>
                                <img
                                    src={issue.user.avatar_url}
                                    alt={issue.user.login}
                                ></img>
                                <div>
                                    <strong>
                                        <a href={issue.html_url}>
                                            {issue.title}
                                        </a>
                                        {issue.labels.map(label => (
                                            <span key={String(label.id)}>
                                                {label.name}
                                            </span>
                                        ))}
                                    </strong>
                                    <p>{issue.user.login}</p>
                                </div>
                            </li>
                        ))}
                    </IssuesList>
                </Container>
            </>
        );
    }
}
