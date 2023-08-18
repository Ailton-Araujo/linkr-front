import { useContext, useRef, useState } from "react";
import styled from "styled-components";
import { IoIosArrowDown, IoIosSearch } from "react-icons/io";
import useUserInfo from "../../hooks/useUserInfo";
import { DebounceInput } from 'react-debounce-input';
import { queryUsers } from "../../services/Api";
import AuthContext from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

const TopMenu = () => {
  const { userInfo } = useUserInfo();
  const { auth } = useContext(AuthContext);
  const ref = useRef(null);

  const [dropDown, setDropDown] = useState(false);
  const [search, setSearch] = useState("");
  const [usersSearch, setUsersSearch] = useState([]);

  const dropMenu = () => {
    setDropDown(!dropDown);
  };

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  function success(data) {
    setUsersSearch(data);
  }
  function failure(error) {
    console.log(error);
  }

  function handleChange(e){
    if (e.target.value){
      queryUsers(e.target.value, auth.token, success, failure)
      setSearch(e.target.value);
    }
    else
    {
      setUsersSearch([]);
      setSearch("")
    }
  }

  return (
    <>
      <Navbar>
        <h1>linkr</h1>
        <SearchBox>          
          <SearchBar>
            <DebounceInput
              type="text"
              placeholder="Search for people"
              name="search"
              value={search}
              minLength={3}
              debounceTimeout={300}
              onChange={handleChange}
              ref={ref}
              />
            <IoIosSearch className="icon"/>
          </SearchBar>
          <Users>
            { usersSearch.length > 0 && search ? 
            usersSearch.map(user => 
              <Link to={`/user/${user.id}`} key={user.id}>
                <User>
                    <img src={user.image} alt={`user ${user.username} image`}/>
                    <p>{user.username}</p>
                </User>
              </Link>)
            : ""}
          </Users>
        </SearchBox>
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
  height: 72px;
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

const SearchBar = styled.div`
    width: 563px;
    height: 45px;
    background-color: white;
    display: flex;
    align-items: center;
    border-radius: 8px;
    padding: 0 10px;
    input {
      border: none;
      vertical-align: middle;
      width: 550px;
      height: 45px;
      font-family: "Lato", sans-serif;
      font-size: 19px;
      line-height: 23px;
    }
    input::placeholder{
        color: rgba(198, 198, 198, 1);
      }
    input:focus{
      outline: none;
    }
    .icon {
    fill: rgba(198, 198, 198, 1);
    font-size: 30px;
  }
  @media (max-width: 800px) {
    width: 350px;
    input {
      width: 320px;
    }
    position: absolute;
    top: 40px;
    left: calc(1vh - 160px);
    margin: 15px auto;
  }
`;

const SearchBox = styled.div`
    position: relative;
    a:-webkit-any-link {
      text-decoration: none;
      color: inherit;
  }
`

const Users = styled.div`
  position: absolute;
  z-index: 1;
  border-radius: 8px;
  background-color: rgba(231, 231, 231, 1);
  width: 563px;
  @media (max-width: 800px) {
    width: 350px;
    position: absolute;
    top: 80px;
    left: calc(1vh - 160px);
    margin: 15px auto;
  }
`

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
`

export default TopMenu;
