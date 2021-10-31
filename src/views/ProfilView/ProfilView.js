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
import { deleteUser, updateUserStats, updateUser, deleteUserStats, logoutUser } from '../../actions';
import Button from '../../components/components/Button/Button';
import { useEffect } from 'react';

const Wrapper = styled.div`
    height: calc(100% - 100px);
    max-height: 500px;
    width: 540px;
    background-color: #FFFFFF;
    box-shadow: 4px 0px 22px -4px rgba(0, 0, 0, 0.25);
    border-radius: 20px;
    position: relative;
    padding: 0 50px 0;
    margin-top: 70px;
    display: grid;
    grid-template-rows: 85px 80px auto;
    grid-row-gap: 10px;
    /* color: #252525; */

    @media (max-width: 520px) {
        padding: 0 15px;
        height: 500px;
    }
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
    color: #0068FF;
    text-decoration: underline;
    cursor: pointer;
    background-color: transparent;
    border: none;
`
const ButtonsWrapper = styled.div`
    display: flex;
    flex-direction: row;
    
    button {
        width: 100px;
        height: 30px;
        margin: 5px 10px 0 0;
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
    font-size: 1.8rem;
    /* margin-top: 50px; */

    h4 {
        font-size: 2.1rem;
        color: #0068FF;
    }

    p {
        margin: 12px 0;
    }
    
    .link-type {
        text-decoration: underline;
        cursor: pointer;
    }
`
const AvatarsModalBg = styled.div`
    width: 100vw;
    height: 100vh;
    background: transparent;
    position: fixed;
    top: 0;
    left: 0;
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
const PasswordForm = styled.form`
    padding: 40px 20px;
    display: flex;
    flex-direction: column;
    height: 100%;

    h3 {
        text-align: center;
        color: #0068FF;
        font-size: 28px;
        margin-bottom: 40px;
    }

    label {
        font-size: 18px;
        margin-bottom: 8px;
        letter-spacing: 0.7px;
        transition: all 0.3s ease;
    }

    input {
        width: 100%;
        height: 35px;
        border: 1px solid #C4C4C4;
        border-radius: 5px;
        margin-bottom: 20px;
        padding-left: 10px;
        transition: all 0.3s ease;

        &:focus {
            outline: none;
            border-color: #0068FF;
        }
    }

    input:focus + label {
        color: #0068FF;
    }

    div.button-wrapper {
        margin-top: 20px;
        display: flex;
        justify-content: space-around;
    }
`
const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    flex-direction: column-reverse;
`
const Error = styled.p`
    color: #FF4A4A;
    margin-bottom: 10px;
`
const AccountInfo = styled.p`
    font-size: 18px;
    color: #0068FF;
    margin-bottom: 10px;
`
const ConfirmModal = styled.div`
    width: 340px;
    height: 120px;
    background: #FFFFFF;
    border-radius: 15px;
    padding: 20px;
    box-shadow: 2px 2px 18px rgba(0, 0, 0, 0.15);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    div {
        width: 250px;
        justify-content: space-between;
        margin: 15px auto;
    }
`

const ProfilView = ({ user, userStats, updateUserStats, deleteUser, updateUser, errorCode, deleteUserStats, logoutUser }) => {
    const [modalOpen, setModalOpen] = useState(false)
    const [confirmModalOpen, setConfirmModalOpen] = useState(false)
    const [passwordChangeMode, setpasswordChangeMode] = useState(false)
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
    const [passwordChanged, setPasswordChanged] = useState(false);
    const [error, setError] = useState({ is: false, content: '' });
    const [formSubmited, setFormSubmited] = useState(false);

    const avatars = { "girl1": girl1, "girl2": girl2, "girl3": girl3, "boy1": boy1, "boy2": boy2, "boy3": boy3 }

    const changeAvatar = (avatar) => {
        const newUserStats = userStats;
        newUserStats.avatarType = avatar;
        updateUserStats(newUserStats);
        setModalOpen(false);
    }

    const submitHandle = (e) => {
        e.preventDefault();
        setFormSubmited(true);
        if (password.length < 8) setError({ is: true, content: 'Aktualne hasło jest za krótkie!' })
        else if (newPassword.length < 8) setError({ is: true, content: 'Nowe hasło jest za krótkie!' })
        else if (newPassword !== newPasswordConfirm) setError({ is: true, content: 'Podane hasła nie są takie same!' })
        else if (newPassword === password) setError({ is: true, content: 'Nowe hasło musi być inne niż aktualne!' })
        else {
            setError({ is: false, content: '' })
            if (errorCode === 409) setError({ is: true, content: 'Aktualne hasło jest nieprawidłowe!' })
            updateUser({
                user,
                password,
                newPassword
            });
        }
    }

    const resetForm = () => {
        setPassword("");
        setNewPassword("");
        setNewPasswordConfirm("");
    }

    const passwordChangeHandle = () => {
        resetForm();
        setError({ is: false, content: '' });
        setPasswordChanged(true);
    }

    const deleteUserHandle = () => {
        deleteUser(user._id)
        deleteUserStats(userStats)
    }

    useEffect(() => {
        if (formSubmited) {
            if (errorCode === 201) passwordChangeHandle();
            else if (errorCode === 409) setError({ is: true, content: 'Aktualne hasło jest nieprawidłowe!' })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formSubmited, errorCode])

    return (
        <UserTemplate horizontalCenter={true} verticalCenter={true}>
            <Wrapper>
                {passwordChangeMode ?
                    <PasswordForm onSubmit={(e) => submitHandle(e)}>
                        <h3>Zmiana hasła</h3>
                        {passwordChanged && <AccountInfo>Hasło zostało zmienione!</AccountInfo>}
                        <FormGroup>
                            <input type="password" id="current-password" onChange={(e) => setPassword(e.target.value)} value={password} />
                            <label htmlFor="current-password" >Aktualne hasło:</label>
                        </FormGroup>
                        <FormGroup>
                            <input type="password" id="new-password" onChange={(e) => setNewPassword(e.target.value)} value={newPassword} />
                            <label htmlFor="new-password">Nowe hasło:</label>
                        </FormGroup>
                        <FormGroup>
                            <input type="password" id="new-password-confirm" onChange={(e) => setNewPasswordConfirm(e.target.value)} value={newPasswordConfirm} />
                            <label htmlFor="new-password-confirm">Potwierdź nowe hasło:</label>
                        </FormGroup>
                        {error.is && <Error>{error.content}</Error>}
                        <div className="button-wrapper">
                            <Button type="submit" width="115px">Zmień hasło</Button>
                            <Button type="button" width="115px" onClick={() => setpasswordChangeMode(false)} >Anuluj</Button>
                        </div>
                    </PasswordForm>
                    :
                    <>
                        <Avatar>
                            <img src={avatars[userStats.avatarType]} alt="" />
                        </Avatar>
                        <ProfilDetails>
                            <SimplyBtn onClick={() => setModalOpen(!modalOpen)}>Zmień avatar</SimplyBtn>
                        </ProfilDetails>
                        <Options>
                            <h4>Informacje:</h4>
                            <hr />
                            <p className="name">Imie: {user && user.name}</p>
                            <p>E-mail: {user && user.email}</p>
                            <br />
                            <h4>Ustawienia konta:</h4>
                            <hr />
                            <ButtonsWrapper>
                                <Button onClick={() => setpasswordChangeMode(true)}>Zmień hasło</Button>
                                <Button onClick={() => setConfirmModalOpen(true)}>Usuń konto</Button>
                                <Button className="mobile" alert onClick={() => logoutUser()}>Wyloguj się</Button>
                            </ButtonsWrapper>
                        </Options>
                        {confirmModalOpen && <ConfirmModal>
                            <p>Czy na pewno chcesz usunąć konto?</p>
                            <ButtonsWrapper>
                                <Button onClick={() => deleteUserHandle()}>Tak</Button>
                                <Button onClick={() => setConfirmModalOpen(false)}>Nie</Button>
                            </ButtonsWrapper>
                        </ConfirmModal>}
                        {modalOpen && <AvatarsModalBg onClick={() => { setModalOpen(false) }} />}
                        {modalOpen && <AvatarsModal>
                            <AvatarsWrapper>
                                {Object.keys(avatars).map((key, index) => <img key={key} src={avatars[key]} alt="" onClick={() => changeAvatar(key)} />)}
                            </AvatarsWrapper>
                        </AvatarsModal>}
                    </>}
            </Wrapper>
        </UserTemplate>
    )
}

const mapStateToProps = ({ userStats, user, errorCode }) => ({ userStats, user, errorCode })

const mapDispatchToProps = (dispatch) => ({
    updateUserStats: (userStats) => dispatch(updateUserStats(userStats)),
    deleteUser: (id) => dispatch(deleteUser(id)),
    updateUser: (newData) => dispatch(updateUser(newData)),
    logoutUser: () => dispatch(logoutUser()),
    deleteUserStats: (userStats) => dispatch(deleteUserStats(userStats))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfilView);