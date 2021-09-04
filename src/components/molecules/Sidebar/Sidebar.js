import React from 'react';
import styled from 'styled-components';
import Menu from '../../components/Menu/Menu';

const Wrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 280px;
    height: 100vh;
    display: grid;
    align-items: center;

    @media (max-width: 1220px) {
        width: 240px;
    }
    
    @media (max-width: 1135px) {
        width: 80px;
    }
    
    @media (max-width: 520px) {
        position: fixed;
        z-index: 100;
        bottom: 0;
        top: unset;
        width: 100vw;
        height: 64px;
        box-shadow: 2px -2px 18px rgba(0, 0, 0, 0.15);
        background: #F3F6F9;
    }
`

const Sidebar = () => (
    <Wrapper>
        <Menu />
    </Wrapper>
)

export default Sidebar;