import React from 'react';
import styled from 'styled-components';
import SearchBar from './SearchBar';
import {Link} from "react-router-dom";

const HeaderContainer = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #FEFDFD;
    box-shadow: 0px 4px 2px 0px rgba(0, 0, 0, 0.04);
    padding: 0 9%;
`;

const StyledLink = styled(Link)`
    color: #676767;
    font-family: 'Pretendard-Medium';
    font-size: 18px;
    text-decoration: none;
    padding-bottom: 16px;
    padding-top: 85px;
    margin-right: 68px;
    position: relative;

    &:hover {
        color: #708FFE;
        &:after {
            content: '';
            position: absolute;
            width: 100%;
            height: 2.5px;
            background-color: #708FFE;
            bottom: 0; 
            left: 0;
        }
    }
`;

const LoginLink = styled(Link)`
    color: #676767;
    font-size: 14px;
    text-decoration: none;
    padding-top: 88px;
    padding-bottom: 16px;
    position: relative;
`;

const RightSection = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-grow: 1;
`;

const Header: React.FC = () => {
    return (
        <HeaderContainer>
            <StyledLink to="/">홈</StyledLink>
            <StyledLink to="#">주식사전</StyledLink>
            <StyledLink to="#">업종별시세</StyledLink>
            <StyledLink to="#">마이페이지</StyledLink>
            <RightSection>
                <LoginLink to="#">로그인</LoginLink>
                <SearchBar />
            </RightSection>
        </HeaderContainer>
    );
};

export default Header;
