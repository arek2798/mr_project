import React, { useState } from 'react';
import styled from 'styled-components';
import UserTemplate from '../../templates/UserTemplate';
import boy1 from '../../avatars/boy1.svg';
import boy2 from '../../avatars/boy2.svg';
import boy3 from '../../avatars/boy3.svg';
import girl1 from '../../avatars/girl1.svg';
import girl2 from '../../avatars/girl2.svg';
import girl3 from '../../avatars/girl3.svg';
import { connect } from 'react-redux';
import { updateUserStats } from '../../actions';

const Wrapper = styled.div`
    height: 550px;
    width: 540px;
    background-color: #FFFFFF;
    box-shadow: 4px 0px 22px -4px rgba(0, 0, 0, 0.25);
    border-radius: 20px;
    position: relative;
    padding: 0 50px;
    display: grid;
    grid-template-rows: 85px 80px auto;
    grid-row-gap: 10px;
    color: #252525;
`
const Avatar = styled.div`
    width: 170px;
    height: 170px;
    position: relative;
    top: -85px;
    margin: auto;
    background-color: #FFCD6F;
    border-radius: 50%;
    border: 10px solid #FFFFFF;
    overflow: hidden;
    filter: drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.25));

    img {
        position: relative;
        top: 22px;
        left: 50%;
        transform: translateX(-50%);
    }
`
const SimplyBtn = styled.button`
    font-size: 18px;
    color: #252525;
    text-decoration: underline;
    cursor: pointer;
    background-color: transparent;
    border: none;
`
const ButtonsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    
    button {
        width: 100px;
        height: 30px;
        margin: 5px 0;
    }
`
const ProfilDetails = styled.div`
    text-align: center;

    .name {
        font-size: 24px;
        margin-top: 20px;
    }
`
const Options = styled.div`
    font-size: 20px;
    margin-top: 50px;

    p {
        margin: 12px 0;
    }
    
    .link-type {
        text-decoration: underline;
        cursor: pointer;
    }
`
const AvatarsModal = styled.div`
    background: #FFFFFF;
    border-radius: 15px;
    box-shadow: 2px 2px 18px rgba(0, 0, 0, 0.15);
    position: absolute;
    top: 140px;
    left: 50%;
    transform: translateX(-50%);
`
const AvatarsWrapper = styled.div`
    padding: 30px;
    display: grid;
    grid-template-columns: repeat(3, 100px);
    grid-template-rows: 100px 100px;
    grid-column-gap: 20px;
    grid-row-gap: 20px;

    img {
        width: 100px;
        height: 100px;
        transition: all 0.2s ease-in-out;
        cursor: pointer;

        &:hover {
            transform: scale(1.2);
        }
    }
`

const ProfilView = ({ user, userStats, updateUserStats }) => {
    const [modalOpen, setModalOpen] = useState(false)

    const avatars = { "girl1": girl1, "girl2": girl2, "girl3": girl3, "boy1": boy1, "boy2": boy2, "boy3": boy3 }

    const changeAvatar = (avatar) => {
        const newUserStats = userStats;
        newUserStats.avatarType = avatar;
        updateUserStats(newUserStats);
        setModalOpen(false);
    }

    return (
        <UserTemplate horizontalCenter={true} verticalCenter={true}>
            <Wrapper>
                <Avatar>
                    <img src={avatars[userStats.avatarType]} alt="" />
                </Avatar>
                <ProfilDetails>
                    <SimplyBtn onClick={() => setModalOpen(!modalOpen)}>Zmień avatar</SimplyBtn>
                    <p className="name">{user.name}</p>
                </ProfilDetails>
                <Options>
                    <p>E-mail: {user.email}</p>
                    <ButtonsWrapper>
                        <SimplyBtn>Zmień hasło</SimplyBtn>
                        <SimplyBtn>Usuń konto</SimplyBtn>
                    </ButtonsWrapper>
                </Options>
                {modalOpen && <AvatarsModal>
                    <AvatarsWrapper>
                        {Object.keys(avatars).map((key, index) => <img key={key} src={avatars[key]} alt="" onClick={() => changeAvatar(key)} />)}
                    </AvatarsWrapper>
                </AvatarsModal>}
            </Wrapper>
        </UserTemplate>
    )
}

const mapStateToProps = ({ userStats, user }) => ({ userStats, user })

const mapDispatchToProps = (dispatch) => ({
    updateUserStats: (userStats) => dispatch(updateUserStats(userStats))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfilView);