import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SearchBar from "./SearchBar";
import Switch from "react-switch";
import HeaderMenu from "./HeaderMenu";
import AlarmBox from "components/Box/AlarmBox";
import MobileSearchBar from "./MobileSearchBar";
import { Link } from "react-router-dom";
import { useMyPageData } from "api/mypage/mypageDataContext";
import { useWords } from "components/SideBar/DictionarySideBar/WordsContext";
import DictionarySideBar from "components/SideBar/DictionarySideBar/DictionarySideBar";
import { useRecoilValue } from "recoil";
import { alarmActiveState } from "recoil/atoms";

const Header = () => {
  const [isInvestMode, setIsInvestMode] = useState<boolean>(false);
  const { isOpen, setIsOpen } = useWords();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [isSearchClicked, setIsSearchClicked] = useState<boolean>(false);
  const { user_info } = useMyPageData();
  const isAlarmActive = useRecoilValue(alarmActiveState);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    setIsLoggedIn(!!accessToken);
  }, []);

  const handleModeChange = (checked: boolean) => {
    setIsInvestMode(checked);
    setIsOpen(checked);
  };

  const handleCloseSideBar = () => {
    setIsInvestMode(false);
    setIsOpen(false);
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("로그아웃하시겠습니까?");

    if (confirmLogout) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("id");
      setIsLoggedIn(false);
      window.location.href = "/";
    }
  };

  return (
    <>
      <HeaderContainer>
        <LeftSection>
          <SidebySideContainer>
            <Link to="/">
              <Logo src={`${process.env.PUBLIC_URL}/assets/Header/logo.svg`} alt="logo" />
            </Link>
            <SwitchContainer>
              <Switch checked={isInvestMode} onChange={handleModeChange} {...switchStyle} />
              {/* isinvestmode 속성을 문자열로 전달 */}
              <Mode $isinvestmode={isInvestMode.toString()}>{isInvestMode ? "설명모드" : "투자모드"}</Mode>
              <DictionarySideBar isOpen={isOpen} setIsOpen={setIsOpen} onClose={handleCloseSideBar} />
            </SwitchContainer>
          </SidebySideContainer>
          <HeaderMenu />
        </LeftSection>
        <Link to="/">
          <LogoName src={`${process.env.PUBLIC_URL}/assets/Header/only_nameLogo.png`} alt="logo_name" />
        </Link>
        <RightSection>
          {isLoggedIn ? (
            <AlarmButton onClick={() => setIsClicked((prevState) => !prevState)}>
              <Bell src={`${process.env.PUBLIC_URL}/assets/Header/${isAlarmActive ? "bell_active.png" : "bell.svg"}`} $active={isAlarmActive} />
              {isClicked ? <AlarmBox /> : null}
            </AlarmButton>
          ) : null}
          {isLoggedIn ? <UserName>{user_info?.nickname}</UserName> : null}
          {isLoggedIn ? <Logout onClick={handleLogout}>로그아웃</Logout> : <LoginLink to="/login">로그인</LoginLink>}
          <SearchBar />
          <ToggleButton onClick={() => setIsSearchClicked((prevState) => !prevState)}>
            <img src={`${process.env.PUBLIC_URL}/assets/Header/header_search.svg`} alt="search" />
          </ToggleButton>
        </RightSection>
      </HeaderContainer>
      {isSearchClicked ? <MobileSearchBar /> : null}
    </>
  );
};

export default Header;

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fefdfd;
  box-shadow: 0px 4px 2px 0px rgba(0, 0, 0, 0.04);
  padding: 0 13vw;
  margin-bottom: 5px;
  @media (max-width: 803px) {
    padding: 0 12vw;
  }
  @media (max-width: 768px) {
    justify-content: center;
    height: 65px;
    padding: 0 3vw;
    box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.04);
  }
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 450px;

  @media (max-width: 1203px) {
    width: 390px;
  }
  @media (max-width: 1069px) {
    width: 350px;
  }
  @media (max-width: 930px) {
    width: 300px;
  }
  @media (max-width: 890px) {
    width: 290px;
  }

  @media (max-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    flex: 1;
  }
`;

const LogoName = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  display: none;

  @media (max-width: 768px) {
    display: flex;
    width: 63px;
  }
`;

const Logo = styled.img`
  width: 128px;
  margin: 23.95px 3vw 0 0;

  @media (max-width: 768px) {
    display: none;
  }
`;

const SwitchContainer = styled.div`
  margin-top: 30px;
  display: flex;
  @media (max-width: 829px) {
    margin-left: 3px;
  }
  @media (max-width: 768px) {
    margin-top: 0;
    padding-left: 5vw;
  }
  @media (max-width: 410px) {
    padding-left: 6vw;
  }
  @media (max-width: 350px) {
    padding-left: 7vw;
  }
`;

interface ModeProps {
  $isinvestmode: string; // boolean에서 string으로 변경
}

const Mode = styled.div<ModeProps>`
  font-size: 12px;
  margin-left: 10px;
  padding-top: 3px;
  white-space: nowrap;
  font-family: ${(props) => (props.$isinvestmode === "true" ? "Pretendard-Bold" : "inherit")};
  color: ${(props) => (props.$isinvestmode === "true" ? "#708FFE" : "inherit")};

  @media (max-width: 853px) {
    margin-left: 5px;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

const switchStyle = {
  onHandleColor: "#708FFE", // 버튼 부분
  offHandleColor: "#708FFE",
  onColor: "#E5EAFD", // 트랙 부분
  offColor: "#E5EAFD",
  handleDiameter: 20,
  uncheckedIcon: false,
  checkedIcon: false,
  activeBoxShadow: "0px 0px 1px 5px rgba(0, 0, 0, 0.1)",
  height: 7,
  width: 46,
};

const SidebySideContainer = styled.div`
  display: flex;
  flex-direction: space-between;
  margin-right: 68px;
  @media (max-width: 768px) {
    margin-right: 0;
  }
`;

const LoginLink = styled(Link)`
  color: #676767;
  font-size: 14px;
  text-decoration: none;
  padding-top: 88px;
  padding-bottom: 16px;
  position: relative;

  @media (max-width: 768px) {
    background-image: url("${process.env.PUBLIC_URL}/assets/Header/login_person.svg");
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    text-indent: -9999px;
    width: 24px;
    padding-top: 0;
  }
`;

const AlarmButton = styled.button`
  border: none;
  background-color: #fff;
  cursor: pointer;
`;

interface BellProps {
  $active: boolean;
}

const Bell = styled.img<BellProps>`
  margin-top: 73px;
  padding-right: 5px;
  border-right: 1.5px solid #c3c3c3;
  @media (max-width: 1004px) {
    weight: 15px;
    height: 15px;
  }
  @media (max-width: 827px) {
    weight: 13px;
    height: 13px;
  }
  @media (max-width: 768px) {
    width: ${(props) => (props.$active == true ? "19px" : "20px")};
    height: ${(props) => (props.$active == true ? "22px" : "20px")};
    padding-right: 3px;
    margin-top: 4.5px;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    text-indent: -9999px;
    padding-top: 0;
    border-right: 0px;
  }
`;

const Logout = styled.button`
  color: #676767;
  background-color: #fff;
  border: none;
  font-size: 14px;
  text-decoration: none;
  margin-top: 88px;
  padding-bottom: 16px;
  white-space: nowrap;
  position: relative;
  cursor: pointer;

  @media (max-width: 1004px) {
    font-size: 12px;
  }
  @media (max-width: 827px) {
    font-size: 10px;
  }
  @media (max-width: 768px) {
    background-image: url("${process.env.PUBLIC_URL}/assets/Header/login_person.svg");
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    margin-top: 0px;
    text-indent: -9999px;
    width: 24px;
    padding-top: 0;
  }
`;

const UserName = styled.div`
  color: #676767;
  font-size: 14px;
  text-decoration: none;
  margin: 72px 0 0 0.3vw;
  padding: 1.5px 5px 1.5px 0;
  border-right: 1.5px solid #c3c3c3;
  position: relative;
  white-space: nowrap;
  @media (max-width: 1004px) {
    font-size: 12px;
    margin: 73px 0 0 0.3vw;
    padding: 0px 3px 1px 0;
  }
  @media (max-width: 827px) {
    font-size: 10px;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-grow: 1;

  @media (max-width: 768px) {
    flex: 1;
  }
`;

const ToggleButton = styled.button`
  display: none;

  @media (max-width: 768px) {
    display: block;
    background: rgba(255, 255, 255, 0.8);
    border: none;
    padding: 16px 0 14px 5px;
    cursor: pointer;
  }
`;
