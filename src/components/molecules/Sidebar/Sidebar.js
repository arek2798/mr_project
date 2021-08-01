import React from 'react';
import styled from 'styled-components';
import Menu from '../../components/Menu/Menu';

const Wrapper = styled.div`
    position: relative;
    top: 0;
    left: 0;
    width: 280px;
    height: 100vh;
    display: grid;
    /* grid-template-rows: 200px auto; */
    align-items: center;
`

const Sidebar = () => (
    <Wrapper>
        <Menu />
    </Wrapper>
)

export default Sidebar;