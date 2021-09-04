import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import UserTemplate from '../../templates/UserTemplate';
import Button from '../../components/components/Button/Button';
import { getTest, getQuestions, updateUserStats, addNotification, setNewLevelCardVisible } from '../../actions';
import { connect } from 'react-redux';
import NewLevelCard from '../../components/molecules/NewLevelCard/NewLevelCard';
import { getLevelName } from '../../helpers/levelHelper';

const Wrapper = styled.div`
    height: 100%;
    width: 100%;
    position: relative;
`
const TestHeader = styled.div`
    h3 {
        color: #0068FF;
        font-size: 24px;
    }
    p {
        margin-top: 8px;
    }
`
const QuestionForm = styled.form`
    display: flex;
    flex-direction: column;
    padding-left: 40px;
    margin-top: 50px;
    width: 100%;
    box-sizing: border-box;
    min-height: 400px;
    display: grid;
    grid-template-rows: auto 40px;

    legend {
        font-size: 2.4rem;
        margin-bottom: 25px;
    }

    @media(max-width: 500px) {
        padding-left: 20px;
    }
`
const ButtonWrapper = styled.div`
    text-align: right;
    width: 100%;

    button {
        margin: 0 10px;
    }

    button:last-of-type {
        margin: 0 0 0 20px;
    }

    @media(max-width: 500px) {
        text-align: center;
    }
`
const Answer = styled.div`
    display: grid;
    grid-template-columns: 20px auto;
    align-items: center;
    font-size: 1.8rem;
    margin: 7px 0 7px 10px;
    cursor: pointer;

    label {
        cursor: pointer;
    }
`
const ScoreWrapper = styled.div`
    height: 240px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
`
const ScoreInfo = styled.div`
    color: #252525;
    text-align: center;

    .message {
        font-size: 36px;
        color: ${({ correct }) => correct ? '#19BF55' : '#FF4A4A'}
    }
    .correct-answers {
        font-size: 28px;
        margin: 13px 0;
    }
    .points {
        font-size: 24px;

    }
`

const TestView = ({ userID, isLoading, getQuestions, getTest, currentTest, questions, userStats, updateUserStats, addNotification, setNewLevelCardVisible, newLevelCardVisible }) => {
    const [questNr, setQuestNr] = useState(1);
    const [dataLoadLevel, setDataLoadLevel] = useState(0);
    const [testLoadLevel, setTestLoadLevel] = useState(0);
    const [allSelected, setAllSelected] = useState(false);
    const [render, setRender] = useState(0);
    const [questionsStats, setQuestionsStats] = useState(new Array(15));
    const [submit, setSubmit] = useState(false);
    const [correctAnswer, setCorrectAnswer] = useState(0);
    const [newPoints, setNewPoints] = useState(0);
    const [questionsWithShuffleAnswers, setQuestionsWithShuffleAnswers] = useState([]);

    const { testSlug } = useParams();

    const shuffleAnswers = () => {
        const afterRand = [];
        questions.forEach((item, index) => {
            afterRand[index] = {
                ...item,
                answers: arrayShuffle(item.answers),
                correctAnswer: item.answers[0]
            }
        })
        return afterRand;
    }

    useEffect(() => {
        if (userID) {
            getTest(testSlug);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        setTestLoadLevel(testLoadLevel + 1);
        if (userID && currentTest && testLoadLevel) {
            getQuestions(currentTest._id);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentTest])

    useEffect(() => {
        setDataLoadLevel(dataLoadLevel + 1);
        if (questions.length && dataLoadLevel === 1) {
            setQuestionsWithShuffleAnswers(shuffleAnswers(questions));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [questions])

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

    const checkAllSelected = () => {
        let counter = 0;
        questionsStats.forEach(item => {
            counter++;
        })
        return counter === questions.length;
    }

    const handleAnswer = (answer) => {
        const question = {
            nr: questNr,
            answered: true,
            checkedAnswer: answer
        }
        const newStats = questionsStats;
        newStats[questNr - 1] = question;
        setQuestionsStats(newStats);
        setAllSelected(checkAllSelected());
        setRender(render + 1);
    }

    const getTestIndex = () => {
        let index = -1;
        userStats.testsStats.forEach((stats, i) => {
            if (stats.testId === currentTest._id) {
                index = i;
            }
        })
        return index;
    }

    const handleForm = (e) => {
        e.preventDefault();
        setSubmit(true);
        let countCorrectAnswer = 0;
        questionsStats.forEach((item, index) => {
            if (item.checkedAnswer === questionsWithShuffleAnswers[index].correctAnswer) countCorrectAnswer++;
        })
        setCorrectAnswer(countCorrectAnswer);
        const percent = (countCorrectAnswer / questionsWithShuffleAnswers.length * 100).toFixed(0);
        const index = getTestIndex();
        let newTestsInRow = userStats.testsInRow;
        if (index === -1 || percent > userStats.testsStats[index].maksScore) {
            if (countCorrectAnswer > (questionsWithShuffleAnswers.length * 0.5)) {
                newTestsInRow += 1;
            } else {
                newTestsInRow = 0;
            }
            let newUserStats = userStats;
            let newPoints = 0;
            if (index !== -1) {
                const oldPoints = Math.round(userStats.testsStats[index].maksScore / 100 * questionsWithShuffleAnswers.length * 2)
                newPoints = oldPoints > countCorrectAnswer * 2 ? 0 : countCorrectAnswer * 2 - oldPoints;
                setNewPoints(newPoints);
                const testsStats = userStats.testsStats;
                testsStats[index].maksScore = percent;
                let levelName = userStats.level;
                if (userStats.level !== getLevelName(userStats.points + newPoints)) {
                    levelName = getLevelName(userStats.points + newPoints)
                    setNewLevelCardVisible(true);
                    addNotification('level', 'level');
                }
                newUserStats = {
                    ...newUserStats,
                    level: levelName,
                    testsStats,
                    testsInRow: newTestsInRow,
                    points: userStats.points + newPoints
                }
            } else {
                const testsStats = newUserStats.testsStats;
                newPoints = countCorrectAnswer * 2;
                let levelName = userStats.level;
                if (userStats.level !== getLevelName(userStats.points + newPoints)) {
                    levelName = getLevelName(userStats.points + newPoints)
                    setNewLevelCardVisible(true);
                    addNotification('level', 'level');
                }
                testsStats.push({
                    testId: currentTest._id,
                    maksScore: percent,
                })
                newUserStats = {
                    ...newUserStats,
                    level: levelName,
                    testsStats,
                    testsInRow: newTestsInRow,
                    points: userStats.points + newPoints
                }
                setNewPoints(countCorrectAnswer * 2);
            }
            updateUserStats(newUserStats);
            addNotification('points', newPoints);
        }
    }


    return (
        <UserTemplate verticalCenter={true}>
            {!newLevelCardVisible ?
                (questionsWithShuffleAnswers.length) ?
                    <Wrapper>
                        {!submit ?
                            <>
                                <TestHeader>
                                    <h3>Test: {currentTest.title}</h3>
                                    <p>Pytanie: {questNr} / {questionsWithShuffleAnswers.length}</p>
                                </TestHeader>
                                <QuestionForm autoComplete="off" onSubmit={e => handleForm(e)}>
                                    <div>
                                        <legend>{questionsWithShuffleAnswers[questNr - 1].question}</legend>

                                        {questionsWithShuffleAnswers[questNr - 1].answers.map((answer, index) => (
                                            <Answer key={index}>
                                                <input type="radio" id={index} name="question" value={answer} checked={answer === (questionsStats[questNr - 1] === undefined ? '' : questionsStats[questNr - 1].checkedAnswer)} onChange={() => handleAnswer(answer)} />
                                                <label htmlFor={index}>{answer}</label>
                                            </Answer>
                                        ))}
                                    </div>
                                    {<ButtonWrapper>
                                        <Button type="button" disabled={questNr === 1} onClick={() => setQuestNr(questNr - 1)}>Poprzednie</Button>
                                        <Button type="button" disabled={questNr === questionsWithShuffleAnswers.length} onClick={() => setQuestNr(questNr + 1)}>Następne</Button>
                                        <Button type="submit" disabled={!allSelected} >Sprawdź</Button>
                                    </ButtonWrapper>}
                                </QuestionForm>
                            </>
                            :
                            <ScoreWrapper>
                                <ScoreInfo correct={correctAnswer > questionsWithShuffleAnswers.length * 0.5}>
                                    <p className="message">{correctAnswer > questionsWithShuffleAnswers.length * 0.5 ? 'Brawo!! Udało Ci się zaliczyć test!' : 'Niestety, nie udało Ci się zaliczyć testu'}</p>
                                    <p className="correct-answers">Poprawne odpowiedzi: {correctAnswer} / {questionsWithShuffleAnswers.length}</p>
                                    <p className="points">Otrzymałeś {newPoints} punkty/ów</p>
                                </ScoreInfo>
                                <Link to="/testy"><Button type="button">Powrót</Button></Link>
                            </ScoreWrapper>
                        }
                    </Wrapper>
                    :
                    <Wrapper>
                        {questions.length ? "Trwa ładowanie..." : "Test nie ma pytań"}
                    </Wrapper>
                :
                <NewLevelCard />}
        </UserTemplate>
    )
}

const mapStateToProps = ({ userID, isLoading, currentTest, questions, userStats, newLevelCardVisible }) => ({ userID, isLoading, currentTest, questions, userStats, newLevelCardVisible })

const mapDispatchToProps = (dispatch) => ({
    setNewLevelCardVisible: (value) => dispatch(setNewLevelCardVisible(value)),
    addNotification: (type, value) => dispatch(addNotification(type, value)),
    getQuestions: (testID) => dispatch(getQuestions(testID)),
    getTest: (slug) => dispatch(getTest(slug)),
    updateUserStats: (userStats) => dispatch(updateUserStats(userStats))
})

export default connect(mapStateToProps, mapDispatchToProps)(TestView);