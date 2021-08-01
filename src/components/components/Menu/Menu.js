import React from 'react';
import styled from 'styled-components';
import MenuItem from '../../atoms/MenuItem/Menuitem';
import { Home, BookOpen, CheckCircle, Award } from 'react-feather';

const Wrapper = styled.nav`
    padding-left: 50px;
    display: grid;
    grid-template-rows: 39px;
    grid-row-gap: 25px;
`

const Menu = () => (
    <Wrapper>
        <MenuItem icon={'Home'} content="Strona główna" link={'/panel'} exact={true}>
            <Home />
        </MenuItem>
        <MenuItem content="Nauka" link={'/lekcje'}>
            <BookOpen />
        </MenuItem>
        <MenuItem content="Testy" link={'/testy'}>
            <CheckCircle />
        </MenuItem>
        <MenuItem content="Osiągnięcia" link={'/osiagniecia'}>
            <Award />
        </MenuItem>
    </Wrapper>
)

export default Menu;