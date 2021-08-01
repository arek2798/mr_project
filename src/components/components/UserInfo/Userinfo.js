import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import boy1 from '../../../avatars/boy1.svg';
import boy2 from '../../../avatars/boy2.svg';
import boy3 from '../../../avatars/boy3.svg';
import girl1 from '../../../avatars/girl1.svg';
import girl2 from '../../../avatars/girl2.svg';
import girl3 from '../../../avatars/girl3.svg';
import notificationIcon from './NotificationIcon.svg';
import newLevelIcon from './newLevel.svg';
import { logoutUser, removeNotifications } from '../../../actions';

const Wrapper = styled.div`
    display: flex;
    grid-column-gap: 20px;
    align-items: center;
`
const ProfilWrapper = styled.div`
    position: relative;
    
    .modal {
        top: 65px;
        right: -20px;
        display: flex;
        flex-direction: column;
        grid-row-gap: 15px;

        a {
            padding: 5px 0;
            transition: all 0.2s ease-in-out;
            border-radius: 10px;

            &:hover {
                background-color: #E8F4FA;
            }
        }
    }
`
const UserDetails = styled.div`
    display: flex;
    align-items: center;
    grid-column-gap: 20px;
    position: relative;
    cursor: pointer;
`
const Avatar = styled.div`
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: #FFCD6F;
    text-align: center;
    overflow: hidden;
    padding-top: 8px;
`
const UserName = styled.p`
    font-size: 1.8rem;
`
const Notification = styled.div`
    margin-right: 10px;
    position: relative;
    
    img {
        cursor: pointer;
    }
`
const NewNotification = styled.div`
    width: 10px;
    height: 10px;
    background-color: #0068FF;
    border-radius: 50%;
    position: absolute;
    top: 14px;
    right: 0;
`
const Modal = styled.div`
    min-width: 200px;
    background: #FFFFFF;
    border-radius: 15px;
    position: absolute;
    top: 40px;
    right: -10px;
    text-align: center;
    padding: 10px 15px;
    box-shadow: 2px 2px 18px rgba(0, 0, 0, 0.15);

    & > p {
        margin: 10px 0;
    }

    & > .logoutBtn {
        padding: 5px 0;
        transition: all 0.2s ease-in-out;
        border-radius: 10px;
        background: transparent;
        border: none;

        &:hover {
            background-color: #E8F4FA;
        }
    }
`
const Line = styled.div`
    height: 1px;
    width: 100%;
    background-color: #0068FF;
`
const NotificationItem = styled.div`
    display: flex;
    align-items: center;
    width: 260px;
    height: 60px;
    background-color: #FFE7C1;
    border-radius: 8px;
    padding: 5px 10px;
    margin: 12px 0;
`
const Icon = styled.div`
    font-size: 18px;
    width: 45px;
    color: #0068FF;
    display: flex;
    justify-content: space-around;
    align-items: center;
`

const RemoveBtn = styled.div`
    font-size: 14px;
    text-decoration: underline;
    cursor: pointer;
`

const UserInfo = ({ user, userStats, notifications, logoutUser, removeNotifications }) => {
    const [notifModalOpen, setNotifOpen] = useState(false);
    const [profilModalOpen, setProfilOpen] = useState(false);

    const avatars = { "girl1": girl1, "girl2": girl2, "girl3": girl3, "boy1": boy1, "boy2": boy2, "boy3": boy3 }

    return (
        <Wrapper >
            <Notification>
                <img src={notificationIcon} alt="" onClick={() => { setNotifOpen(!notifModalOpen); setProfilOpen(false) }} />
                {(notifications.length !== 0) && <NewNotification />}
                {notifModalOpen && <Modal>
                    {notifications.length ? <>
                        {notifications.map((item, index) => (
                            <NotificationItem key={index}>
                                <Icon>
                                    {item.value === '' ?
                                        <img src={newLevelIcon} alt="" />
                                        :
                                        item.value}
                                </Icon>
                                <p>{item.content}</p>
                            </NotificationItem>
                        ))}
                        <RemoveBtn onClick={removeNotifications}>Usuń wszystkie powiadomienia</RemoveBtn>
                    </>
                        :
                        'Brak powiadomień'}
                </Modal>}
            </Notification>
            <ProfilWrapper>
                <UserDetails onClick={() => { setProfilOpen(!profilModalOpen); setNotifOpen(false) }}>
                    <UserName>{user && user.name}</UserName>
                    <Avatar>
                        <img src={avatars[userStats.avatarType]} alt="" />
                    </Avatar>
                </UserDetails>
                {profilModalOpen && <Modal className="modal">
                    <Link to="/profil">Profil</Link>
                    <Link to="/profil">Ustawienia</Link>
                    <Line />
                    <button className="logoutBtn" onClick={logoutUser}>Wyloguj się</button>
                </Modal>}
            </ProfilWrapper>

        </Wrapper>
    )
}

const mapStateToProps = ({ user, userStats, notifications }) => ({ user, userStats, notifications })

const mapDispatchToProps = (dispatch) => ({
    logoutUser: () => dispatch(logoutUser()),
    removeNotifications: () => dispatch(removeNotifications())
})

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);