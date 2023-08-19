import styled from "styled-components";
import LoginSignUpInput from "../../components/login, signup/Inputs.jsx";
import LoginSignUpButton from "../../components/login, signup/buttons.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();
  const [disable, setDisabled] = useState(false);
  const action = "Singin In...";
  const [body, setBody] = useState({
    email: "",
    password: "",
    username: "",
    pictureUrl: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      body.email === "" ||
      body.password === "" ||
      body.username === "" ||
      body.pictureUrl === ""
    ) {
      return alert("Todos os campos são obrigatórios!");
    }
    setDisabled(true);
    axios
      .post(`${process.env.REACT_APP_API_URL}/signup`, body)
      .then(() => {
        setDisabled(false);
        navigate("/");
      })
      .catch((err) => {
        if (err.response.status === 409) {
          setDisabled(false);
          alert(`${err.response.data.message}`);
        }
      });
  };
  return (
    <Wrapper>
      <LogoContainer>
        <Logo>
          <h1>linkr</h1>
          <p>
            save, share and discover <br /> the best links on the web
          </p>
        </Logo>
      </LogoContainer>
      <FormContainer>
        <Form onSubmit={handleSubmit}>
          <LoginSignUpInput
            test={"email"}
            setBody={setBody}
            body={body}
            placeholder={"e-mail"}
            name={"email"}
            value={body.email}
            type={"email"}
          ></LoginSignUpInput>
          <LoginSignUpInput
            test={"password"}
            setBody={setBody}
            body={body}
            placeholder={"password"}
            name={"password"}
            value={body.password}
            type={"password"}
          ></LoginSignUpInput>
          <LoginSignUpInput
            test={"username"}
            setBody={setBody}
            body={body}
            placeholder={"username"}
            name={"username"}
            value={body.username}
            type={"text"}
          ></LoginSignUpInput>
          <LoginSignUpInput
            test={"picture-url"}
            setBody={setBody}
            body={body}
            placeholder={"picture Url"}
            name={"pictureUrl"}
            value={body.pictureUrl}
            type={"url"}
          ></LoginSignUpInput>
          <LoginSignUpButton
            test={"sign-up-btn"}
            disable={disable}
            action={action}
            purpose={"Sign Up"}
          ></LoginSignUpButton>
          <p data-test="login-link" onClick={() => navigate("/")}>
            Switch back to log in
          </p>
        </Form>
      </FormContainer>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  width: 100vw;
  display: flex;
  height: 100vh;

  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

const LogoContainer = styled.section`
  min-height: 30vh;
  background-color: #151515;
  width: 100%;
  position: relative;

  @media (max-width: 800px) {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    position: none;
    article {
      margin: 0;
      self-align: center;
      top: initial;
      transform: none;
      position: none;
    }
  }

  @media (max-width: 360px) {
    article {
      h1 {
        font-size: 5rem;
      }

      p {
        font-size: 1.5rem;
      }
    }
  }
`;

const Logo = styled.article`
  position: absolute;
  top: 20%;
  transform: translateX(10%);
  color: white;
  font-family: "Oswald", sans-serif;
  font-weight: 700;

  h1 {
    font-family: "Passion One", cursive;
    font-size: 6rem;
  }

  p {
    font-size: 2rem;
  }
`;

const FormContainer = styled.section`
  background-color: #333333;
  max-width: 100vw;
  min-height: 70vh;
  width: 900px;
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    font-family: "Lato", sans-serif;
    color: white;
    margin-top: 15px;
    line-height: 20px;
    text-decoration: underline;
  }

  p:hover {
    cursor: pointer;
  }
`;

const Form = styled.form`
  width: 400px;
  max-width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default SignUp;
