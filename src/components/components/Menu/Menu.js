import React from 'react';
import styled from 'styled-components';
import MenuItem from '../../atoms/MenuItem/Menuitem';
import { Home, BookOpen, CheckCircle, Award } from 'react-feather';
import boy1 from '../../../avatars/boy1.svg';
import boy2 from '../../../avatars/boy2.svg';
import boy3 from '../../../avatars/boy3.svg';
import girl1 from '../../../avatars/girl1.svg';
import girl2 from '../../../avatars/girl2.svg';
import girl3 from '../../../avatars/girl3.svg';
import { connect } from 'react-redux';

const Wrapper = styled.nav`
    padding-left: 50px;
    display: grid;
    grid-template-rows: 39px;
    grid-row-gap: 25px;

    @media (max-width: 1220px) {
        padding-left: 20px;
    }

    @media (max-width: 1135px) {
        padding-left: 25px;
    }
        
    @media (max-width: 520px) {
        display: flex;
        justify-content: space-around;
        padding-left: 0px;
    }
`
const Avatar = styled.div`
    width: 39px;
    height: 39px;
    border-radius: 50%;
    background: #FFCD6F;
    text-align: center;
    overflow: hidden;
    padding-top: 4px;
`

const Menu = ({ userStats }) => {
    const avatars = { "girl1": girl1, "girl2": girl2, "girl3": girl3, "boy1": boy1, "boy2": boy2, "boy3": boy3 }

    return (
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
            <MenuItem content="Profil" link={'/profil'} mobile="true">
                {/* <User /> */}
                <Avatar>
                    <img src={avatars[userStats.avatarType]} alt="" />
                </Avatar>
            </MenuItem>
        </Wrapper>
    )
}

const mapStateToProps = ({ userStats }) => ({ userStats })

export default connect(mapStateToProps)(Menu);