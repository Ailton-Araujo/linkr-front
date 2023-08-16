import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import AuthContext from "../../contexts/AuthContext";
import TopMenu from "../../components/TopMenu/TopMenu";
import CreateLinkr from "./CreateLinkr";
import { getTimeLine } from "../../services/Api";

export default function TimeLine() {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth || !auth.token) {
      navigate("/");
    }
  }, [auth]);

  return (
    <>
      <TopMenu />
      <TimeLineStyled>
        <h1>timeline</h1>
        <CreateLinkr token={auth.token} />
      </TimeLineStyled>
    </>
  );
}

const TimeLineStyled = styled.main`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  h1 {
    margin-top: 100px;
    margin-bottom: 45px;
    color: #fff;
    font-family: "Oswald", sans-serif;
    font-size: 43px;
    font-weight: 700;
  }
`;
