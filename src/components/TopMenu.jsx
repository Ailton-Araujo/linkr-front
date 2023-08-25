import { useContext, useRef, useState } from "react";
import styled from "styled-components";
import { IoIosArrowDown, IoIosSearch } from "react-icons/io";
import useUserInfo from "../hooks/useUserInfo";
import { DebounceInput } from "react-debounce-input";
import { queryUsers } from "../services/Api";
import AuthContext from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const TopMenu = () => {
  const { userInfo } = useUserInfo();
  const { auth, logoutAuth } = useContext(AuthContext);
  const ref = useRef(null);

  const [dropDown, setDropDown] = useState("up");
  const [search, setSearch] = useState("");
  const [usersSearch, setUsersSearch] = useState([]);

  const navigate = useNavigate();

  const dropMenu = (dropDown) => {
    if (dropDown === "up") {
      setDropDown("down");
    } else {
      setDropDown("up");
    }
  };

  const onBlurDropMenu = (dropDown) => {
    if (dropDown === "down") {
      setDropDown("up");
    } else {
      return;
    }
  };

  function logout() {
    logoutAuth();
    navigate("/");
  }

  function success(data) {
    setUsersSearch(data);
  }
  function failure(error) {
    console.log(error);
  }

  function handleChange(e) {
    if (e.target.value) {
      queryUsers(e.target.value, auth.token, success, failure);
      setSearch(e.target.value);
    } else setUsersSearch([]);
  }

  function resetSearchBar () {
    setSearch("");
    setUsersSearch([]);
  };

  return (
    <header>
      <Navbar>
        <h1 onClick={() => navigate("/timeline")} style={{ cursor: "pointer" }}>
          linkr
        </h1>
        <section>
          <SearchBox>
            <SearchBar border={usersSearch.length > 0 ? true : false}>
              <DebounceInput
                type="text"
                placeholder="Search for people"
                name="search"
                value={search}
                minLength={3}
                debounceTimeout={300}
                onChange={handleChange}
                ref={ref}
                data-test="search"
              />
              <IoIosSearch className="icon" />
            </SearchBar>
            <Users>
              {usersSearch.length > 0
                ? usersSearch.map((user) => (
                    <Link
                      to={`/user/${user.id}`}
                      data-test="user-search"
                      key={user.id}
                    >
                      <User onClick={resetSearchBar}>
                        <img src={user.image} alt={user.username} />
                        <p>{user.username}</p>
                        {user.followed === "True" ? <li>following</li> : ""}
                      </User>
                    </Link>
                  ))
                : ""}
            </Users>
          </SearchBox>
        </section>
        <UserOptions
          onBlur={() => onBlurDropMenu(dropDown)}
          dropdown={dropDown}
          onClick={() => {
            dropMenu(dropDown);
          }}
        >
          <div>
            <IoIosArrowDown className="icon"></IoIosArrowDown>
          </div>
          <img
            data-test="avatar"
            src={userInfo.image}
            alt={userInfo.username}
          />
        </UserOptions>
        <Logout data-test="menu" dropdown={dropDown}>
          <p data-test="logout" onClick={logout}>
            logout
          </p>
        </Logout>
      </Navbar>
    </header>
  );
};

const Navbar = styled.nav`
  height: 72px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #171717;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  h1 {
    color: white;
    margin-left: 1rem;
    margin-top: 2px;
    font-family: "Passion One", cursive;
    font-size: 2.5rem;
    letter-spacing: 3px;
    line-height: 3px;
  }
  section {
    width: 55%;
    position: absolute;
    left: calc(45% / 2);
    top: calc((100% - 45px) / 2);
    @media (max-width: 520px) {
      width: 100%;
      position: absolute;
      padding: 12px 0px;
      top: 70px;
      left: 0;
      background-color: #333333;
    }
  }
`;

const Logout = styled.div`
  height: ${(props) => (props.dropdown === "down" ? "30px" : "0px")};
  width: 90px;
  top: 70px;
  right: 0;
  position: fixed;
  background-color: #171717;
  border-radius: 0 15px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: ${(props) => (props.dropdown === "down" ? "2" : "-1")};
  transition: height 1s, z-index 450ms ease-in-out;
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

const UserOptions = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  margin-right: 0.5rem;
  background-color: #171717;
  border: none;
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

  div {
    width: 40px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 20px;
    background-color: #171717;
    transition: transform 1s;
    transform: ${(props) =>
      props.dropdown === "down" ? "rotate(-180deg)" : ""};
  }

  &:hover {
    cursor: pointer;
  }

  button:hover {
    cursor: pointer;
  }
`;

const SearchBar = styled.div`
  width: 100%;
  height: 45px;
  background-color: white;
  display: flex;
  align-items: center;
  ${({ border }) => {
    return border ? `border-radius: 8px 8px 0px 0px;` : ` border-radius:8px;`;
  }};
  padding: 0 10px;
  input {
    width: 100%;
    height: 45px;
    border: none;
    vertical-align: middle;
    font-family: "Lato", sans-serif;
    font-size: 19px;
    line-height: 23px;
  }
  input::placeholder {
    color: rgba(198, 198, 198, 1);
  }
  input:focus {
    outline: none;
  }
  .icon {
    fill: rgba(198, 198, 198, 1);
    font-size: 30px;
  }
`;

const SearchBox = styled.div`
  width: 100%;

  a:-webkit-any-link {
    text-decoration: none;
    color: inherit;
  }
  @media (max-width: 520px) {
    width: 90%;
    margin: 0 auto;
  }
`;

const Users = styled.div`
  width: 100%;
  position: sticky;
  border-radius: 0px 0px 8px 8px;
  background-color: rgba(231, 231, 231, 1);

  li {
    color: #C5C5C5;
    margin-left: 15px;
    list-style-position: outside;
  }
`;

const User = styled.div`
  height: 60px;
  font-family: "Lato", sans-serif;
  font-size: 15px;
  display: flex;
  align-items: center;
  img {
    object-fit: cover;
    height: 39px;
    width: 39px;
    border-radius: 50%;
    margin: 12px;
  }
`;

export default TopMenu;
