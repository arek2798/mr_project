import React, { useEffect } from 'react';
import styled from 'styled-components';
import Sidebar from '../components/molecules/Sidebar/Sidebar';
import Header from '../components/molecules/Header/Header';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { getUserStats, updateUserStats, getAllTests, getAllLessons, addNotification, getDayQuestions, getQuestion, logoutUser } from '../actions';
import { checkMyBadges } from '../helpers/badgesHelper';
import { useState } from 'react';

const Wrapper = styled.div`
    position: relative;
    display: grid;
    grid-template-columns: 280px auto;
    max-width: 1500px;
    width: 100vw;
    min-height: 100vh;
    margin: auto;

    @media (max-width: 1220px) {
        grid-template-columns: 220px auto;
    }
    
    @media (max-width: 1135px) {
        grid-template-columns: 80px auto;
    }
`
const Main = styled.main`
    margin: 0 auto;
    width: 100vw;
    max-width: 1280px;
    min-height: 100vh;
    padding: 110px 35px 35px 285px;
    display: flex;
    justify-content: ${({ horizontalCenter }) => horizontalCenter && "space-around"};
    align-items: ${({ verticalCenter }) => verticalCenter && "center"};

    @media (max-width: 1220px) {
        padding: 110px 15px 35px 245px;
    }
    
    @media (max-width: 1135px) {
        padding: 110px 15px 35px 85px;
    }
        
    @media (max-width: 520px) {
        padding: 90px 15px 75px 15px;
    }
`

const UserTemplate = ({ userID, children, verticalCenter, horizontalCenter, userStats, isLoading, getUserStats, lessons, tests, updateUserStats, getAllLessons, getAllTests, addNotification, getDayQuestions, dayQuestions, dayQuestion, getQuestion, logoutUser }) => {
    const [dateChecked, setDateChecked] = useState(false);
    const [loadedStep, setLoadedStep] = useState(0);
    const [dayQuestionLoadedStep, setdayQuestionLoadedStep] = useState(0);
    const [newDayQuestionPrepared, setNewDayQuestionPrepared] = useState(false);

    const compareDate = (date1, data2) => {
        if (date1.getFullYear() === data2.getFullYear() && date1.getMonth() === data2.getMonth() && date1.getDate() === data2.getDate())
            return true
        else
            return false
    }

    const checkLoginRegister = () => {
        if (Object.keys(userStats).length !== 0 && userStats.loginStats.length) {
            const last = new Date(userStats.loginStats[userStats.loginStats.length - 1].loginDate);
            const current = new Date();
            if (compareDate(last, current))
                return true;
            else
                return false;
        } else
            return false
    }

    const compareBadges = (currentBadges) => {
        const newBadges = [];
        currentBadges.forEach(badge => {
            if (!userStats.badges.includes(badge)) newBadges.push(badge);
        });
        return newBadges;
    }

    useEffect(() => {
        // logoutUser();
        if (userID && userStats) {
            setdayQuestionLoadedStep(dayQuestionLoadedStep + 1);
            if (tests.length && dayQuestionLoadedStep && !newDayQuestionPrepared && (!userStats.dayQuestion || !compareDate(new Date(userStats.dayQuestion.date), new Date()))) {
                // const testNum = Math.floor(Math.random() * tests.length);
                const testNum = 0;
                getDayQuestions(tests[testNum]._id);
                setNewDayQuestionPrepared(true)
            }
            if (userStats.dayQuestion !== undefined && userStats.dayQuestion !== null && dayQuestionLoadedStep === 1 && compareDate(new Date(userStats.dayQuestion.date), new Date())) {
                getQuestion(userStats.dayQuestion.questionId);
            }
            if (dayQuestions !== undefined && dayQuestions.length && dayQuestionLoadedStep === 2 && newDayQuestionPrepared) {
                const questionNum = Math.floor(Math.random() * dayQuestions.length);
                const newDayQuestion = dayQuestions[questionNum];
                const newUserStats = {
                    ...userStats,
                    dayQuestion:
                    {
                        questionId: newDayQuestion._id,
                        date: new Date()
                    }
                }
                console.log("update");
                updateUserStats(newUserStats);
                getQuestion(newDayQuestion._id);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userID, userStats, tests, dayQuestions, newDayQuestionPrepared])

    useEffect(() => {
        if (userID) {
            if (!loadedStep) {
                getUserStats();
                getAllTests();
                getAllLessons();
                setLoadedStep(1);
            }
            if ((loadedStep === 1 || loadedStep === 2) && !checkLoginRegister()) {
                console.log('loginSstats');
                let newLoginStats = []
                if (userStats.loginStats.length) {
                    newLoginStats = [
                        ...userStats.loginStats,
                        {
                            loginDate: new Date()
                        }
                    ]
                } else {
                    newLoginStats = [
                        {
                            loginDate: new Date()
                        }
                    ]
                }
                const newUserStats = {
                    ...userStats,
                    loginStats: newLoginStats
                }
                updateUserStats(newUserStats);
                setDateChecked(true);
            }
            if (loadedStep === 1 && Object.keys(userStats).length !== 0 && Object.keys(tests).length !== 0 && Object.keys(lessons).length !== 0) {
                const myCurrentBadges = checkMyBadges(userStats, tests, lessons);
                const newBadges = compareBadges(myCurrentBadges);
                if (newBadges.length) {
                    addNotification("badge", 'badge');
                }
                const newUserStats = {
                    ...userStats,
                    badges: [
                        ...userStats.badges,
                        ...newBadges
                    ]
                }
                updateUserStats(newUserStats);
                setLoadedStep(2);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userID, userStats, dateChecked])

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

const mapStateToProps = ({ userID, userStats, isLoading, lessons, tests, dayQuestions, dayQuestion }) => ({ userID, userStats, isLoading, lessons, tests, dayQuestions, dayQuestion })
const mapDispatchToProps = (dispatch) => ({
    getUserStats: () => dispatch(getUserStats()),
    getAllTests: () => dispatch(getAllTests()),
    getAllLessons: () => dispatch(getAllLessons()),
    getQuestion: (id) => dispatch(getQuestion(id)),
    getDayQuestions: (testID) => dispatch(getDayQuestions(testID)),
    updateUserStats: (userStats) => dispatch(updateUserStats(userStats)),
    addNotification: (type, value) => dispatch(addNotification(type, value)),
    logoutUser: () => dispatch(logoutUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(UserTemplate);