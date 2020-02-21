import React from 'react';
import { Link } from 'react-router-dom';

const RepositoryItem = ({ data }) => {
    return (
        <li>
            <span>{data.name}</span>
            <Link to={`/repository/${encodeURIComponent(data.name)}`}>
                Detalhes
            </Link>
        </li>
    );
};

export default RepositoryItem;
