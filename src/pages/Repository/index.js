import React, { Component } from 'react';
import api from '../../services/api';
import PropTypes from 'prop-types';
import { Loading, Owner, IssuesList, IssueFilter, PageArrows } from './styles';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
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
        loading: true,
        page: 1
    };

    componentDidMount = async () => {
        const { match } = this.props;
        console.log(match);

        console.log(this.state.page);

        const repoName = decodeURIComponent(match.params.repository);

        const [repo, issues] = await Promise.all([
            api.get(`/repos/${repoName}`),
            api.get(`/repos/${repoName}/issues`, {
                params: {
                    state: 'all',
                    page: 1
                }
            })
        ]);

        this.setState({
            repository: repo.data,
            issues: issues.data,
            loading: false
        });
    };

    handleSelect = async e => {
        const repoName = this.state.repository.full_name;
        const issseStatus = e.target.value;
        const issues = await api.get(`/repos/${repoName}/issues`, {
            params: {
                state: issseStatus,
                page: 1
            }
        });

        this.setState({
            issues: issues.data
        });
    };

    handlePageUp = async e => {
        const repoName = this.state.repository.full_name;
        const page = this.state.page + 1;
        const issues = await api.get(`/repos/${repoName}/issues`, {
            params: {
                page: page
            }
        });

        this.setState({
            issues: issues.data,
            page: page
        });
    };

    handlePageDown = async e => {
        const repoName = this.state.repository.full_name;
        let page = this.state.page;
        if (this.state.page > 1) {
            console.log('no of');
            page = this.state.page - 1;
        }
        const issues = await api.get(`/repos/${repoName}/issues`, {
            params: {
                page: page
            }
        });

        this.setState({
            issues: issues.data,
            page: page
        });
    };

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
                    <IssueFilter>
                        <label style={{ marginRight: 10 }}>
                            Status da issue:
                        </label>
                        <select
                            value={this.state.value}
                            onChange={this.handleSelect}
                        >
                            <option value="all">Todas</option>
                            <option value="open">Abertas</option>
                            <option value="closed">Fechadas</option>
                        </select>
                    </IssueFilter>
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
                    <div style={{ textAlign: 'center', paddingTop: 20 }}>
                        <PageArrows
                            onClick={this.handlePageDown}
                            style={{ margin: 10 }}
                            // disabled={this.state.page}
                        >
                            <FaArrowLeft />
                        </PageArrows>

                        <PageArrows
                            onClick={this.handlePageUp}
                            style={{ margin: 10 }}
                        >
                            <FaArrowRight></FaArrowRight>
                        </PageArrows>
                    </div>
                </Container>
            </>
        );
    }
}
