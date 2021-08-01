import React from 'react';
import styled from 'styled-components';
import UserInfo from '../../components/UserInfo/Userinfo';
import logo from './logo.svg';

const Wrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    max-width: 1500px;
    height: 105px;
    display: flex;
    z-index: 100;
    align-items: center;
    justify-content: space-between;
    padding: 0 30px;
    margin: auto;
`
const Logo = styled.img`

`

const Header = () => (
    <Wrapper>
        <Logo src={logo} />
        <UserInfo />
    </Wrapper>
)

export default Header;