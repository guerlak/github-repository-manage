import styled from 'styled-components';

export const Loading = styled.div`
    color: #3e2f5b;
    font-size: 30px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

export const Owner = styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
        width: 120px;
        border-radius: 50%;
        margin-top: 20px;
    }

    h1 {
        font-size: 24px;
        margin-top: 10px;
    }

    p {
        margin-top: 5px;
        font-size: 14px;
        color: #ccc;
        line-height: 1.4;
        text-align: center;
        max-width: 400px;
    }

    a {
        color: #fff;
        text-decoration: none;
        font-weight: bold;
    }
`;

export const IssuesList = styled.ul`
    padding-top: 30px;
    margin-top: 30px;
    border-top: 1px solid #eee;
    list-style: none;

    li {
        display: flex;
        padding: 15px 10px;
        border: 1px solid #eee;
    }

    & + li {
        margin-top: 10px;
    }

    img {
        height: 36px;
        width: 36px;
        border-radius: 50%;
        border: 2px solid #eee;
    }

    div {
        flex: 1;
        margin-left: 15px;

        strong {
            font-size: 16px;
            a {
                text-decoration: none;
                color: #ccc;

                &:hover {
                    color: #fff;
                }
            }

            span {
                background-color: red;
                border-radius: 2px;
                margin-left: 5px;
                padding: 3px 4px;
                font-size: 12px;
            }
        }

        p {
            margin-top: 5px;
            font-size: 12px;
            color: #999;
        }
    }
`;
