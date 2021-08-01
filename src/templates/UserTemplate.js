import React, { useEffect } from 'react';
import styled from 'styled-components';
import Sidebar from '../components/molecules/Sidebar/Sidebar';
import Header from '../components/molecules/Header/Header';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { getUserStats } from '../actions';

const Wrapper = styled.div`
    position: relative;
    display: grid;
    grid-template-columns: 280px auto;
    max-width: 1500px;
    width: 100vw;
    height: 100vh;
    margin: auto;
`
const Main = styled.main`
    margin: auto;
    width: calc(100vw - 300px);
    max-width: 1200px;
    height: 100vh;
    padding: 110px 35px 35px 5px;
    display: flex;
    justify-content: ${({ horizontalCenter }) => horizontalCenter && "space-around"};
    align-items: ${({ verticalCenter }) => verticalCenter && "center"};
`

const UserTemplate = ({ userID, children, verticalCenter, horizontalCenter, userStats, isLoading, getUserStats }) => {
    useEffect(() => {
        if (userID && userStats === '') getUserStats();
    }, [userID, getUserStats, userStats])

    return (
        <Wrapper>
            {!userID && <Redirect to="/" />}
            {userStats &&
                <>
                    <Sidebar />
                    <Header />
                    <Main verticalCenter={verticalCenter} horizontalCenter={horizontalCenter}>
                        {children}
                    </Main>
                </>}
        </Wrapper>
    )
}

const mapStateToProps = ({ userID, userStats, isLoading }) => ({ userID, userStats, isLoading })
const mapDispatchToProps = (dispatch) => ({
    getUserStats: () => dispatch(getUserStats())
})

export default connect(mapStateToProps, mapDispatchToProps)(UserTemplate);