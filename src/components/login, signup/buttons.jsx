import styled from "styled-components";

const LoginSignUpButton = ({purpose, disable, action, datatest}) => {
    return (
        <LogSignButton data-test={datatest} disabled={disable} type="submit">{disable ? action : purpose}</LogSignButton>
    );
};

const LogSignButton = styled.button`
    height: 65px;
    width: 80%;
    background-color: #1877F2;
    opacity: ${props => props.disabled ? ".7" : "1"};
    color: white;
    border: none;
    border-radius: 5px;
    font-family: 'Oswald', sans-serif;
    font-size: 30px;
    font-weight: 700;
`;

export default LoginSignUpButton;