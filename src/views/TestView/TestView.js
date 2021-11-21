import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import UserTemplate from '../../templates/UserTemplate';
import Button from '../../components/components/Button/Button';
import { getTest, getQuestions, getAllQuestions, updateUserStats, addNotification, setNewLevelCardVisible } from '../../actions';
import { connect } from 'react-redux';
import NewLevelCard from '../../components/molecules/NewLevelCard/NewLevelCard';
import { getLevelName } from '../../helpers/levelHelper';

const Wrapper = styled.div`
    height: 100%;
    width: 100%;
    position: relative;
`
const TestHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    h3 {
        color: #0068FF;
        font-size: 24px;
    }
    p {
        margin-top: 8px;
    }
    
    @media (max-width: 700px) {
        flex-direction: column;
        align-items: start;
    }
`
const Timer = styled.div`
    width: 300px;
    font-size: 20px;

    span {
        color: #0068FF;
    }

    @media (max-width: 700px) {
        margin-top: 15px;
        font-size: 18px;
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

    @media(max-width: 700px) {
        padding-left: 20px;
    }

    @media(max-width: 520px) {
        padding-left: 0px;
    }
`
const QuestionImg = styled.div`
    text-align: center;

    img {
        max-width: 600px;
        max-height: 300px;
        margin-bottom: 20px;
    }

    @media (max-width: 700px) {
        img {
            max-width: 100%;
        }
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

const TestView = ({ userID, isLoading, getQuestions, getAllQuestions, getTest, currentTest, questions, allQuestions, userStats, updateUserStats, addNotification, setNewLevelCardVisible, newLevelCardVisible }) => {
    const [questNr, setQuestNr] = useState(1);
    const [dataLoadLevel, setDataLoadLevel] = useState(0);
    const [testLoadLevel, setTestLoadLevel] = useState(0);
    const [allSelected, setAllSelected] = useState(false);
    const [render, setRender] = useState(0);
    const [questionsStats, setQuestionsStats] = useState(new Array(25));
    const [submit, setSubmit] = useState(false);
    const [correctAnswer, setCorrectAnswer] = useState(0);
    const [remainingTime, setRemainingTime] = useState({ "mins": '40', "secs": '00' });

    const timer = useRef(0);
    const seconds = useRef(2400);
    const questionsWithShuffleAnswers = useRef([]);
    const newPoints = useRef(0);
    const mockExam = useRef(false);

    const { testSlug } = useParams();

    const shuffleAnswers = (questions) => {
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

    const secondsToTime = (secs) => {
        let minutes = Math.floor(secs / 60);
        let seconds = secs % 60

        return {
            "mins": minutes,
            "secs": seconds.toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false
            })
        }
    }

    const countDown = () => {
        // Remove one second
        let secs = seconds.current - 1;
        setRemainingTime(secondsToTime(secs))
        seconds.current = secs;

        // Check if we're at zero.
        if (seconds.current === 0) {
            clearInterval(timer.current);
            handleTestCompletion();
        }
    }

    useEffect(() => {
        if (userID) {
            if (testSlug === 'probny-egzamin') {
                mockExam.current = true;
                getAllQuestions();
                if (timer.current === 0) {
                    timer.current = setInterval(countDown, 1000);
                }
            } else {
                getTest(testSlug);
            }
        }

        return () => clearInterval(timer.current);
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
        if (testSlug === 'probny-egzamin' && allQuestions.length) {
            // Shuffle array
            const shuffled = allQuestions.sort(() => 0.5 - Math.random());
            // Get sub-array of first n elements after shuffled
            let examQuestions = shuffled.slice(0, 25);
            questionsWithShuffleAnswers.current = shuffleAnswers(examQuestions);
        }
        if (questions.length && dataLoadLevel === 1) {
            questionsWithShuffleAnswers.current = shuffleAnswers(questions);
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
        return counter === questionsWithShuffleAnswers.current.length;
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

    const handleTestCompletion = () => {
        setSubmit(true);
        let countCorrectAnswer = 0;
        questionsStats.forEach((item, index) => {
            if (item.checkedAnswer === questionsWithShuffleAnswers.current[index].correctAnswer) countCorrectAnswer++;
        })
        setCorrectAnswer(countCorrectAnswer);
        const percent = (countCorrectAnswer / questionsWithShuffleAnswers.current.length * 100).toFixed(0);
        const index = getTestIndex();
        let newTestsInRow = userStats.testsInRow;
        if (mockExam.current || index === -1 || percent > userStats.testsStats[index].maksScore) {
            if (mockExam.current && countCorrectAnswer > (questionsWithShuffleAnswers.current.length * 0.8)) {
                newTestsInRow += 1;
            } else {
                newTestsInRow = 0;
            }
            let newUserStats = userStats;
            let points = 0;
            if (mockExam.current) {
                points = countCorrectAnswer < (0.8 * questionsWithShuffleAnswers.current.length) ? countCorrectAnswer : (countCorrectAnswer + 10);
                let levelName = userStats.level;
                if (userStats.level !== getLevelName(userStats.points + points)) {
                    levelName = getLevelName(userStats.points + points)
                    setNewLevelCardVisible(true);
                    addNotification('level', 'level');
                }
                newUserStats = {
                    ...newUserStats,
                    level: levelName,
                    testsInRow: newTestsInRow,
                    points: userStats.points + points
                }
            } else if (index !== -1) {
                const oldPoints = Math.round(userStats.testsStats[index].maksScore / 100 * questionsWithShuffleAnswers.current.length * 2)
                points = oldPoints > countCorrectAnswer * 2 ? 0 : countCorrectAnswer * 2 - oldPoints;
                newPoints.current = points;
                const testsStats = userStats.testsStats;
                testsStats[index].maksScore = percent;
                let levelName = userStats.level;
                if (userStats.level !== getLevelName(userStats.points + points)) {
                    levelName = getLevelName(userStats.points + points)
                    setNewLevelCardVisible(true);
                    addNotification('level', 'level');
                }
                newUserStats = {
                    ...newUserStats,
                    level: levelName,
                    testsStats,
                    points: userStats.points + points
                }
            } else {
                const testsStats = newUserStats.testsStats;
                points = countCorrectAnswer * 2;
                let levelName = userStats.level;
                if (userStats.level !== getLevelName(userStats.points + points)) {
                    levelName = getLevelName(userStats.points + points)
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
                    points: userStats.points + points
                }
                newPoints.current = countCorrectAnswer * 2;
            }
            updateUserStats(newUserStats);
            addNotification('points', points);
        }
    }

    const handleForm = (e) => {
        e.preventDefault();
        clearInterval(timer.current);
        handleTestCompletion();
    }

    return (
        <UserTemplate verticalCenter={true}>
            {!newLevelCardVisible ?
                (questionsWithShuffleAnswers.current.length) ?
                    <Wrapper>
                        {!submit ?
                            <>
                                <TestHeader>
                                    <div>
                                        <h3>{mockExam.current ? 'Próbny egzamin' : 'Test: ' + currentTest.title}</h3>
                                        <p>Pytanie: {questNr} / {questionsWithShuffleAnswers.current.length}</p>
                                    </div>
                                    {mockExam.current ? <Timer>
                                        <h4>Czas do końca egzaminu: <span>{remainingTime.mins}:{remainingTime.secs}</span></h4>
                                    </Timer> : null}
                                </TestHeader>
                                <QuestionForm autoComplete="off" onSubmit={e => handleForm(e)}>
                                    <div>
                                        {questionsWithShuffleAnswers.current[questNr - 1].img ?
                                            <QuestionImg>
                                                <img src={questionsWithShuffleAnswers.current[questNr - 1].img} alt="" />
                                            </QuestionImg> : null}

                                        <legend>{questionsWithShuffleAnswers.current[questNr - 1].question}</legend>

                                        {questionsWithShuffleAnswers.current[questNr - 1].answers.map((answer, index) => (
                                            <Answer key={index}>
                                                <input type="radio" id={index} name="question" value={answer} checked={answer === (questionsStats[questNr - 1] === undefined ? '' : questionsStats[questNr - 1].checkedAnswer)} onChange={() => handleAnswer(answer)} />
                                                <label htmlFor={index}>{answer}</label>
                                            </Answer>
                                        ))}
                                    </div>
                                    {<ButtonWrapper>
                                        <Button type="button" disabled={questNr === 1} onClick={() => setQuestNr(questNr - 1)}>Poprzednie</Button>
                                        <Button type="button" disabled={questNr === questionsWithShuffleAnswers.current.length} onClick={() => setQuestNr(questNr + 1)}>Następne</Button>
                                        <Button type="submit" disabled={!allSelected} >Sprawdź</Button>
                                    </ButtonWrapper>}
                                </QuestionForm>
                            </>
                            :
                            <ScoreWrapper>
                                <ScoreInfo correct={!mockExam.current || correctAnswer > questionsWithShuffleAnswers.current.length * 0.8}>
                                    {mockExam.current ? <p className="message">{correctAnswer > questionsWithShuffleAnswers.current.length * 0.8 ? 'Brawo!! Udało Ci się zaliczyć egzamin!' : 'Niestety, nie udało Ci się zaliczyć egzaminu'}</p> : <p className="message">Udało Ci sie ukończyć test!</p>}
                                    <p className="correct-answers">Poprawne odpowiedzi: {correctAnswer} / {questionsWithShuffleAnswers.current.length}</p>
                                    <p className="points">Otrzymałeś {newPoints.current} punkty/ów</p>
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

const mapStateToProps = ({ userID, isLoading, currentTest, questions, allQuestions, userStats, newLevelCardVisible }) => ({ userID, isLoading, currentTest, questions, allQuestions, userStats, newLevelCardVisible })

const mapDispatchToProps = (dispatch) => ({
    setNewLevelCardVisible: (value) => dispatch(setNewLevelCardVisible(value)),
    addNotification: (type, value) => dispatch(addNotification(type, value)),
    getQuestions: (testID) => dispatch(getQuestions(testID)),
    getAllQuestions: () => dispatch(getAllQuestions()),
    getTest: (slug) => dispatch(getTest(slug)),
    updateUserStats: (userStats) => dispatch(updateUserStats(userStats))
})

export default connect(mapStateToProps, mapDispatchToProps)(TestView);