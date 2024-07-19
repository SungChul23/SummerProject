import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { faBars, faUser, faTimes } from "@fortawesome/free-solid-svg-icons";
//로그인 라우팅
import {Link} from "react-router-dom";


//css 부분
const Header = styled.div`
  max-width: flex;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: black;
  background-color: white;
  border-bottom: 2px solid #008080;

  .logo {
    margin: 0 1rem;
    font-size: 2rem;
  }

  .header__menulist {
    list-style: none;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .header__left {
    display: flex;
  }

  .header__right {
    list-style: none;
    display: flex;
  }

  .header__right div {
    margin: 0 1rem;
  }

  li {
    padding: 0 1rem;
  }

  .toggle {
    display: none;
    font-size: 1.5rem;
    padding: 1rem 1rem;
  }

  .user {
    display: none;
    font-size: 1.5rem;
    padding: 1rem 1rem;
  }

  @media screen and (max-width: 768px) {
    flex-wrap: wrap;

    .header__right {
      display: ${(props) => (props.userToggled ? "flex" : "none")};
      justify-content: center;
      align-items: center;
      flex-direction: column;
      width: 100%;
      background-color: white;
    }

    .header__menulist {
      display: ${(props) => (props.isToggled ? "flex" : "none")};
      flex-direction: column;
      width: 100%;
      background-color: white;
    }

    .header__menulist li,
    .header__right li {
      margin: 1rem 0;
      padding: 0;
    }

    .toggle {
      display: block;
    }

    .user {
      display: block;
    }
  }
`;

//리액트 html
function Head() {
    const [isToggled, setIsToggled] = useState(false);
    const [userToggled, setUserToggled] = useState(false);
  
    return (
      <Header isToggled={isToggled} userToggled={userToggled}>
        {/* 작대기 3개 버튼(bar) */}
        <div
          className="toggle"
          onClick={() => {
            setIsToggled(!isToggled);
          }}
        >
          <FontAwesomeIcon icon={!isToggled ? faBars : faTimes} />
        </div>
  
        {/* Apple 로고 */}
        <div className="logo">
          <FontAwesomeIcon icon={faStar} />
        </div>
  
        {/* User 버튼 */}
        <div
          className="user"
          onClick={() => {
            setUserToggled(!userToggled);
          }}
        >
          <FontAwesomeIcon icon={!userToggled ? faUser : faTimes} />
        </div>
  
        {/* 메뉴 리스트 */}
        <ul className="header__menulist">
          <li>게시판</li>
          <li>책정보</li>
        </ul>
  
        {/* User 메뉴 리스트 */}
        <ul className="header__right">
          <li>
            <Link to="/Login">로그인</Link>
          </li>
          <li>마이 페이지</li>
        </ul>
      </Header>
    );
  }
  
  
  export default Head;