import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import AuthContext from "../../context/AuthContext";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TopMenu = () => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [dropDown, setDropDown] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const token = auth?.token;
  const retrieveUserInfo = async (token) => {
    const promise = axios.get(`${process.env.REACT_APP_API_URI}/userinfo`, {
      headers: { authorization: `Bearer ${token}` },
    });
    promise
      .then((res) => {
        setUserInfo(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response.status);
      });
  };

  const dropMenu = () => {
    setDropDown(!dropDown);
  };

  useEffect(() => {
    if (auth && auth.token) {
      retrieveUserInfo(token);
    } else {
      navigate("/");
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <>
      <Navbar>
        <h1>linkr</h1>
        <UserOptions onBlur={dropMenu} dropdown={dropDown} onClick={dropMenu}>
          <button>
            <IoIosArrowDown className="icon"></IoIosArrowDown>
          </button>
          <img src={userInfo.image} alt={userInfo.image} />
        </UserOptions>
      </Navbar>
      <Logout dropdown={dropDown}>
        <p onClick={logout}>logout</p>
      </Logout>
    </>
  );
};

const Navbar = styled.nav`
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #171717;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;

  h1 {
    color: white;
    margin-left: 1rem;
    margin-top: 2px;
    font-family: "Passion One", cursive;
    font-size: 2.5rem;
    letter-spacing: 3px;
    line-height: 3px;
  }
`;

const Logout = styled.div`
  height: ${(props) => (props.dropdown ? "80px" : "50px")};
  width: 90px;
  right: 0;
  position: absolute;
  background-color: #171717;
  transition: height 1s;
  border-radius: 0 15px;
  display: flex;
  justify-content: center;
  align-items: flex-end;

  p {
    color: white;
    font-family: "Lato", sans-serif;
    font-size: 15px;
    margin-bottom: 10px;
  }

  p:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

const UserOptions = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  margin-right: 0.5rem;
  img {
    object-fit: cover;
    height: 40px;
    width: 40px;
    border-radius: 50%;
    margin: 8px;
  }

  .icon {
    fill: white;
    font-size: 1em;
  }

  button {
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 20px;
    background-color: #171717;
    transition: transform 1s;
    transform: ${(props) => (props.dropdown ? "rotate(-180deg)" : "")};
  }

  &:hover {
    cursor: pointer;
  }
`;
export default TopMenu;
