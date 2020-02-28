import styled, { keyframes, css } from 'styled-components';

export const Title = styled.h2`
    font-size: 22px;
    color: ${props => props.inputColor};
`;

export const Form = styled.form`
    margin-top: 30px;
    display: flex;
    flex-direction: row;

    input {
        flex: 1;
        padding: 10px 15px;
        border-radius: 4px;
        font-size: 16px;
        border: 1px solid ${props => props.inputColor};
    }
`;

const rotate = keyframes`
    from{
        transform: rotate(0deg)
    }to{
        transform: rotate(360deg)
    }`;

export const SubmitBtn = styled.button.attrs(props => ({
    type: 'submit',
    disabled: props.loading
}))`
    background-color: #ba5c12;
    border: 0;
    padding: 0 15px;
    margin-left: 10px;
    border-radius: 4px;

    /* &[disabled] {
        cursor: not-allowed;
        opacity: 0.6;
    } */

    ${props =>
        props.loading &&
        css`
            svg {
                animation: ${rotate} 2s linear infinite;
            }
        `}
`;

export const List = styled.ul`
    list-style: none;
    margin-top: 30px;
    li {
        color: #fff;
        padding: 15px 0;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        & + li {
            border-top: 1px solid #eee;
        }
    }

    a {
        color: #fff;
        text-decoration: none;
    }
`;
