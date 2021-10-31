import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import DataField from '../../atoms/DataField/DataField';
import Button from '../Button/Button';
import { addNotification, updateUserStats, setNewLevelCardVisible } from '../../../actions';
import { useEffect } from 'react';
import { getLevelName } from '../../../helpers/levelHelper';
import Loader from '../../atoms/Loader/Loader';

const QuestionForm = styled.form`
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    margin-top: 10px;

    legend {
        font-size: 1.6rem;
        margin-bottom: 10px;
    }
`
const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: relative;
`
const ButtonWrapper = styled.div`
    text-align: right;
`
const Answer = styled.div`
    display: grid;
    grid-template-columns: 20px auto;
    align-items: center;
    font-size: 1.6rem;
    margin: 5px 0 5px 10px;
`
const Error = styled.p`
    color: #FF4A4A;
`
const Info = styled.p`
    text-align: center;
    font-size: 1.8rem;
    color: ${({ color }) => color};
    margin: 50px 0;
`

const DayQuestion = ({ userID, userStats, addNotification, updateUserStats, setNewLevelCardVisible, dayQuestion }) => {
    const [checkedAnswer, setAnswer] = useState();
    const [error, setError] = useState(false);
    const [submit, setSubmit] = useState(false);
    const [correct, setCorrect] = useState(false);
    const [alreadyAnswered, setAlreadyAnswered] = useState(true);
    const [shuffleAnswers, setShuffleAnswers] = useState([]);
    const [loadStep, setLoadStep] = useState(0);

    const arrayShuffle = (array) => {
        const answersShuffled = array.slice();
        for (let i = answersShuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = answersShuffled[i];
            answersShuffled[i] = answersShuffled[j];
            answersShuffled[j] = temp;
        }
        return answersShuffled;
    }

    const compareDate = (date1, data2) => {
        if (date1.getFullYear() === data2.getFullYear() && date1.getMonth() === data2.getMonth() && date1.getDate() === data2.getDate())
            return true
        else
            return false
    }

    useEffect(() => {
        if (userID) {
            // console.log(shuffleAnswers);
            // console.log("userID");
            // console.log(userStats);
            setLoadStep(loadStep + 1);
            if (loadStep) {
                // console.log("sprawdzanie");
                const lastDate = new Date(userStats.lastDayQuestion)
                const currentDate = new Date()
                // console.log(lastDate);
                if (!userStats.lastDayQuestion || new Date(lastDate.getFullYear(), lastDate.getMonth(), lastDate.getDate()).getTime() < new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()).getTime()) {
                    setAlreadyAnswered(false);
                    // console.log("setAlreadyAnswered");
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userID, userStats, dayQuestion.questionId])

    useEffect(() => {
        if (userID && userStats.dayQuestion && userStats.dayQuestion.date) {
            console.log(userStats.dayQuestion.date);
            if (dayQuestion && compareDate(new Date(userStats.dayQuestion.date), new Date())) {
                console.log('losowanie');
                setShuffleAnswers(arrayShuffle(dayQuestion.answers));
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userStats])

    const handleForm = (e) => {
        e.preventDefault();

        if (checkedAnswer === undefined) setError(true);
        else {
            // setNewLevelCardVisible(true)
            setError(false);
            setSubmit(true);
            if (checkedAnswer === dayQuestion.answers[0]) {
                setCorrect(true);
                addNotification('points', 5);
                let newPoints = userStats.points + 5;
                let levelName = userStats.level;
                if (userStats.level !== getLevelName(newPoints)) {
                    levelName = getLevelName(newPoints)
                    setNewLevelCardVisible(true);
                    addNotification('level', 'level');
                }
                let newStats = userStats;
                newStats = {
                    ...userStats,
                    level: levelName,
                    points: newPoints,
                    lastDayQuestion: new Date()
                }
                updateUserStats(newStats);
            }
        }
    }

    return (
        <DataField>
            <h4>Pytanie dnia</h4>
            {(shuffleAnswers.length && !alreadyAnswered && !submit) && <QuestionForm autoComplete="off" onSubmit={e => handleForm(e)}>
                <legend>{dayQuestion && dayQuestion.question}</legend>
                {dayQuestion && shuffleAnswers && shuffleAnswers.map((answer, index) => (
                    <Answer key={index}>
                        <input type="radio" id={index} name="question" value={answer} checked={answer === checkedAnswer} onChange={() => setAnswer(answer)} />
                        <label htmlFor={index}>{answer}</label>
                    </Answer>
                ))}
                {error && <Error>Uwaga! Musisz zaznaczyć odpowiedź</Error>}
                <ButtonWrapper><Button type="submit">sprawdź</Button></ButtonWrapper>
            </QuestionForm>}
            <Wrapper>
                {(!shuffleAnswers.length && !alreadyAnswered) && <Loader small />}
                {(!alreadyAnswered && submit) && (correct ? <Info color="#18A300">Brawo! Prawidłowa odpowiedź! <br /> Otrzymujesz 5 pktów</Info> : <Info color="#F7785A">Niestety, błędna odpowiedź :(</Info>)}
                {(alreadyAnswered) && <Info color="#737373">Odpowiedzialeś/aś już na pytanie dnia &#x1F60A;</Info>}
            </Wrapper>
        </DataField>
    )
}

const mapStateToProps = ({ userID, userStats, dayQuestion }) => ({ userID, userStats, dayQuestion })

const mapDispatchToProps = (dispatch) => ({
    setNewLevelCardVisible: (value) => dispatch(setNewLevelCardVisible(value)),
    addNotification: (type, value) => dispatch(addNotification(type, value)),
    updateUserStats: (userStats) => dispatch(updateUserStats(userStats)),
})

export default connect(mapStateToProps, mapDispatchToProps)(DayQuestion);