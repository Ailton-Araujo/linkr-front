import styled from "styled-components";


const FollowButton = ({paramid, authid, action, func, disabled, visibility}) => {
    return <StyledFollowButton data-test="follow-btn" visibility={visibility} disabled={disabled} onClick={() => func(action)} id={paramid} userid={authid} action={action}>{action}</StyledFollowButton>;
};

const StyledFollowButton = styled.button`
    cursor: ${props => props.disabled ? "wait" : "pointer"};
    display: ${props => props.id != props.userid && props.visibility ? "initial" : "none"};
    height: 40px;
    width: 110px;
    top: 20vh;
    right: 10vw;
    border: ${props => props.action === "Follow" ? "none" : "solid 1px #1877F2"};
    border-radius: 5px;
    background-color: ${props => props.action === "Follow" ? "#1877F2" : "white"};
    color: ${props => props.action === "Follow" ? "white" : "#1877F2"};
    font-family: "Lato", serif;
    font-weight: 700;
    font-size: 14px;
`;

export default FollowButton;