import React from 'react';
import styled from 'styled-components';
import SearchBar from './SearchBar';

const HeaderContainer = styled.header`
    background: #FEFDFD;
    box-shadow: 0px 4px 2px 0px rgba(0, 0, 0, 0.04);
    color: white;
    display: flex;
    padding: 0 9%; 

}`;

const StyledLink = styled.a`
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

const LoginLink = styled.a`
    color: #676767;
    font-size: 14px;
    text-decoration: none;
    padding-top: 88px;
    margin-left: 538px;
    position: relative;
`;

const Header : React.FC = () => {
    return (
        <HeaderContainer>
            <StyledLink href="#">홈</StyledLink>
            <StyledLink href="#">주식사전</StyledLink>
            <StyledLink href="#">업종별시세</StyledLink>
            <StyledLink href="#">마이페이지</StyledLink>
            <LoginLink href="#">로그인</LoginLink>
            <SearchBar />
        </HeaderContainer>
    );
};

export default Header;