import styled from 'styled-components';

const Container = styled.div`
    max-width: 700px;
    background-color: #3e2f5b;
    border-radius: 4px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    padding: 30px;
    margin: 80px auto;
    color: #fff;
    h1 {
        font-size: 20px;
        display: flex;
        flex-direction: row;
        align-items: center;
        color: #fff;
        svg {
            margin-right: 10px;
            color: #fff;
        }
    }
    a {
        color: #fff;
        text-decoration: none;
    }
`;

export default Container;
