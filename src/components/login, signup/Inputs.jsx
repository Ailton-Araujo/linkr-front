import styled from "styled-components";

const LoginSignUpInput = ({
  placeholder,
  body,
  setBody,
  name,
  value,
  type,
  test,
}) => {
  const handleChange = (e) => {
    setBody({ ...body, [e.target.name]: e.target.value });
  };

  return (
    <LogSignInput
      data-test={test}
      onChange={handleChange}
      name={name}
      value={value}
      placeholder={placeholder}
      type={type}
    ></LogSignInput>
  );
};

const LogSignInput = styled.input`
  height: 65px;
  width: 80%;
  margin-bottom: 10px;
  border: solid white 1px;
  border-radius: 5px;
  padding-left: 10px;
  display: flex;
  align-items: center;
  font-family: "Lato", sans-serif;
  font-size: 30px;

  &::placeholder {
    font-family: "Oswald", sans-serif;
    font-size: 30px;
    font-weight: 700;
    color: #9f9f9f;
  }
`;

export default LoginSignUpInput;
