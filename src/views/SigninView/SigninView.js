import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Button from '../../components/components/Button/Button';
import logo from './logo.svg';
import { loginUser, errorCodeReset } from '../../actions';
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

const SigninView = ({ userID, errorCode, loginUser, errorCodeReset, isLoading }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({ is: false, content: '' });
    const [created, setCreated] = useState(false);
    const [deleted, setDeleted] = useState(false);
    const [submited, setSubmited] = useState(false);

    const submitHandle = (e) => {
        e.preventDefault();
        setError({ is: false, content: '' })
        setSubmited(true)
        if (email.length < 8 || password.length < 8) setError({ is: true, content: 'Podany login lub has??o jest za kr??tkie!' })
        else {
            setError({ is: false, content: '' })
            loginUser({ email, password });
        }
    }

    const userCreatedHandle = () => {
        setCreated(true)
        errorCodeReset()
    }

    useEffect(() => {
        if (errorCode === 201) userCreatedHandle()
        else if (errorCode === 204) {
            setDeleted(true)
            errorCodeReset()
        }
        if (submited) {
            if (errorCode === 404) setError({ is: true, content: 'U??ytkownik nie istnieje!' })
            else if (errorCode === 405) setError({ is: true, content: 'Podano z??e has??o!' })
            errorCodeReset();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [errorCode, submited])


    if (userID) {
        return <Redirect to="/panel" />;
    }

    return (
        <Wrapper>
            <FormWrapper onSubmit={(e) => submitHandle(e)}>
                <img src={logo} alt="" />
                <StyledForm autoComplete="off">

                    {created && <AccountInfo>Konto zosta??o stworzone!</AccountInfo>}
                    {deleted && <AccountInfo>Konto zosta??o usuni??te!</AccountInfo>}
                    <div>
                        <input type="email" id="email" onChange={(e) => setEmail(e.target.value)} value={email} required />
                        <label htmlFor="email">E-mail:</label>
                    </div>
                    <div>
                        <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} value={password} required />
                        <label htmlFor="password">Has??o:</label>
                    </div>
                    {error.is && <Error>{error.content}</Error>}
                    <div className="button-wrapper">
                        <Button type="submit">Zaloguj si??</Button>
                    </div>
                </StyledForm>
                {isLoading && <Loader />}
                <Info>Nie posiadasz konta? <Link to="/rejestracja">Zarejerstruj si??</Link></Info>
            </FormWrapper>
        </Wrapper>
    )
}

const mapStateToProps = ({ userID, userStats, errorCode, isLoading }) => ({ userID, userStats, errorCode, isLoading })

const mapDispatchToProps = (dispatch) => ({
    loginUser: (user) => dispatch(loginUser(user)),
    errorCodeReset: () => dispatch(errorCodeReset())
})

export default connect(mapStateToProps, mapDispatchToProps)(SigninView)