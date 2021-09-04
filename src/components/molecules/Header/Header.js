import React from 'react';
import styled from 'styled-components';
import UserInfo from '../../components/UserInfo/Userinfo';
import logo from './logo.svg';

const Wrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 105px;
    z-index: 100;
    background: #F3F6F9;

    @media (max-width: 520px) {
        height: 80px;
    }
`
const InsideWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 1500px;
    height: 100%;
    margin: auto;
    padding: 0 30px;

    @media (max-width: 520px) {
        padding: 0 30px 0 15px;
    }
`

const Logo = styled.img`
    @media (max-width: 1135px) {
        width: 130px;
    }

    @media (max-width: 520px) {
        width: 100px;
    }
`

const Header = () => (
    <Wrapper>
        <InsideWrapper>
            <Logo src={logo} />
            <UserInfo />
        </InsideWrapper>
    </Wrapper>
)

export default Header;