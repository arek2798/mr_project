import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Button from '../../components/components/Button/Button';
import logo from './logo.svg';
import { addNewUser, addUserStats, errorCodeReset } from '../../actions';
import Loader from '../../components/atoms/Loader/Loader';

const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #F3F6F9;
`
const FormWrapper = styled.div`
    position: relative;
    width: 450px;
    max-width: calc(100vw - 10px);
    height: 620px;
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

const SigninView = ({ userID, errorCode, addNewUser, addUserStats, history, isLoading, errorCodeReset }) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [error, setError] = useState({ is: false, content: '' });
    const [submited, setSubmited] = useState(false);

    const submitHandle = (e) => {
        e.preventDefault();
        setSubmited(true);
        if (email.length < 12) setError({ is: true, content: 'Podany adres email jest za kr??tki!' })
        else if (password.length < 8) setError({ is: true, content: 'Podane has??o jest za kr??tkie!' })
        else if (password !== passwordConfirm) setError({ is: true, content: 'Podane has??a nie s?? takie same!' })
        else {
            setError({ is: false, content: '' })
            addNewUser({ email, password, name });
        }
    }

    const resetForm = () => {
        setEmail("")
        setName("")
        setPassword("")
        setPasswordConfirm("")
    }

    const userCreatedHandle = () => {
        resetForm()
        addUserStats()
        history.push('/');
    }

    useEffect(() => {
        if (errorCode === 201) userCreatedHandle()
        else if (submited && errorCode === 409) setError({ is: true, content: 'U??ytkownik ju?? istnieje!' })
        else if (submited && errorCode === 501) setError({ is: true, content: 'Nie mo??na utworzy?? konta!' })
        else errorCodeReset();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [errorCode])

    if (userID) {
        return <Redirect to="/panel" />;
    }

    return (
        <Wrapper>
            <FormWrapper onSubmit={(e) => submitHandle(e)}>
                <img src={logo} alt="" />
                <StyledForm autoComplete="off">
                    <div>
                        <input type="email" id="email" onChange={(e) => setEmail(e.target.value)} value={email} required />
                        <label htmlFor="email">E-mail:</label>
                    </div>
                    <div>
                        <input type="text" id="name" onChange={(e) => setName(e.target.value)} value={name} required />
                        <label htmlFor="name">Imie:</label>
                    </div>
                    <div>
                        <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} value={password} required />
                        <label htmlFor="password">Has??o:</label>
                    </div>
                    <div>
                        <input type="password" id="passwordConfirm" onChange={(e) => setPasswordConfirm(e.target.value)} value={passwordConfirm} required />
                        <label htmlFor="passwordConfirm">Powt??rz has??o:</label>
                    </div>
                    {error.is && <Error>{error.content}</Error>}
                    <div className="button-wrapper">
                        <Button type="submit" width="115px">Utw??rz konto</Button>
                    </div>
                </StyledForm>
                <Info>Posiadasz ju?? konto? <Link to="/">Zaloguj si??</Link></Info>
                {isLoading && <Loader />}
            </FormWrapper>
        </Wrapper>
    )
}

const mapStateToProps = ({ userID, userStats, errorCode, isLoading }) => ({ userID, userStats, errorCode, isLoading })

const mapDispatchToProps = (dispatch) => ({
    addNewUser: (newUser) => dispatch(addNewUser(newUser)),
    addUserStats: () => dispatch(addUserStats()),
    errorCodeReset: () => dispatch(errorCodeReset())
})

export default connect(mapStateToProps, mapDispatchToProps)(SigninView)