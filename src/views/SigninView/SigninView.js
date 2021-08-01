import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Button from '../../components/components/Button/Button';
import logo from './logo.svg';
import { loginUser, errorCodeReset } from '../../actions';

const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #F3F6F9;
`
const FormWrapper = styled.div`
    width: 450px;
    height: 420px;
    background-color: #FFFFFF;
    border-radius: 30px;
    box-shadow: 4px 4px 16px rgba(115, 115, 115, 0.25);
    padding: 28px 54px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    img {
        margin-bottom: 10px;
    }
`
const StyledForm = styled.form`

    div {
        display: flex;
        flex-direction: column-reverse;

        label {
            margin-bottom: 8px;
            letter-spacing: 0.7px;
            transition: all 0.3s ease;
        }

        input {
            width: 350px;
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

        input:focus + label{
                color: #0068FF;
            }

        &.button-wrapper {
            align-items: center;
        }
    }

`
const Error = styled.p`
    color: #FF4A4A;
    margin-bottom: 10px;
`
const Info = styled.p`
    font-size: 14px;

    & > a {
        color: #0068FF;
    }
`
const AccountInfo = styled.p`
    font-size: 18px;
    color: #0068FF;
    margin-bottom: 10px;
`

const SigninView = ({ userID, errorCode, loginUser, errorCodeReset }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({ is: false, content: '' });
    const [created, setCreated] = useState(false);

    const submitHandle = (e) => {
        e.preventDefault();
        if (email.length < 8 || password.length < 8) setError({ is: true, content: 'Podany login lub hasło jest za krótkie!' })
        else {
            setError({ is: false, content: '' })
            loginUser({ email, password });
        }
    }

    const userCreatedHandle = () => {
        console.log("handle")
        setCreated(true)
        errorCodeReset()
    }

    useEffect(() => {
        if (errorCode === 201) userCreatedHandle()
    })


    if (userID) {
        return <Redirect to="/panel" />;
    }

    return (
        <Wrapper>
            <FormWrapper onSubmit={(e) => submitHandle(e)}>
                <img src={logo} alt="" />
                <StyledForm autoComplete="off">

                    {created && <AccountInfo>Konto zostało stworzone!</AccountInfo>}
                    <div>
                        <input type="text" id="email" onChange={(e) => setEmail(e.target.value)} value={email} required />
                        <label htmlFor="email">E-mail:</label>
                    </div>
                    <div>
                        <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} value={password} required />
                        <label htmlFor="password">Hasło:</label>
                    </div>
                    {error.is && <Error>{error.content}</Error>}
                    {errorCode === 404 && <Error>Użytkownik nie istnieje!</Error>}
                    {errorCode === 405 && <Error>Podano złe hasło!</Error>}
                    <div className="button-wrapper">
                        <Button type="submit">Zaloguj się</Button>
                    </div>
                </StyledForm>
                <Info>Nie posiadasz konta? <Link to="/rejestracja">Zarejerstruj się</Link></Info>
            </FormWrapper>
        </Wrapper>
    )
}

const mapStateToProps = ({ userID, userStats, errorCode }) => ({ userID, userStats, errorCode })

const mapDispatchToProps = (dispatch) => ({
    loginUser: (user) => dispatch(loginUser(user)),
    errorCodeReset: () => dispatch(errorCodeReset())
})

export default connect(mapStateToProps, mapDispatchToProps)(SigninView)