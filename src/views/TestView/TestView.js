import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import UserTemplate from '../../templates/UserTemplate';
import Button from '../../components/components/Button/Button';
import { getTest, getQuestions } from '../../actions';
import { connect } from 'react-redux';

const Wrapper = styled.div`
    height: 800px;
    width: 1000px;
    padding-left: 50px;
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
    margin-left: 40px;
    margin-top: 50px;
    width: 100%;
    min-height: 400px;
    display: grid;
    grid-template-rows: auto 40px;

    legend {
        font-size: 24px;
        margin-bottom: 25px;
    }
`
const ButtonWrapper = styled.div`
    text-align: right;
    width: 100%;

    button {
        margin: 0 10px;
    }

    button:last-of-type {
        margin: 0 0 0 20px ;
    }
`
const Answer = styled.div`
    display: grid;
    grid-template-columns: 20px auto;
    align-items: center;
    font-size: 18px;
    margin: 7px 0 7px 10px;
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

const TestView = ({ userID, isLoading, getQuestions, getTest, currentTest, questions }) => {
    const [questNr, setQuestNr] = useState(1);
    const [dataLoadLevel, setDataLoadLevel] = useState(0);
    const [allSelected, setAllSelected] = useState(false);
    const [render, setRender] = useState(0);
    const [questionsStats, setQuestionsStats] = useState(new Array(15));
    const [submit, setSubmit] = useState(false);
    const [correctAnswer, setCorrectAnswer] = useState(0);
    const [questionsWithShuffleAnswers, setQuestionsWithShuffleAnswers] = useState([]);

    const { testid } = useParams();

    const shuffleAnswers = () => {
        const afterRand = new Array(questions.length);
        questions.forEach((question, index) => {
            const questionWithShuffleAnswers = question;
            questionWithShuffleAnswers.correctAnswer = question.answers[0];
            questionWithShuffleAnswers.answers = arrayShuffle(question.answers);
            afterRand[index] = questionWithShuffleAnswers;
        })
        return afterRand;
    }

    useEffect(() => {
        if (userID) {
            getTest(testid);
            getQuestions(testid);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        setDataLoadLevel(dataLoadLevel + 1);
        if (questions.length && dataLoadLevel)
            setQuestionsWithShuffleAnswers(shuffleAnswers());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [questions])

    const arrayShuffle = (array) => {
        var currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
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

    const handleForm = (e) => {
        e.preventDefault();
        setSubmit(true);
        let correctAnswer = 0;
        questionsStats.forEach((item, index) => {
            if (item.checkedAnswer === questions[index].answers[0]) correctAnswer++;
        })
        setCorrectAnswer(correctAnswer);
    }


    return (
        <UserTemplate verticalCenter={true}>
            {(questionsWithShuffleAnswers.length) ?
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
                                <p className="points">Otrzymałeś {correctAnswer * 2} punkty/ów</p>
                            </ScoreInfo>
                            <Link to="/testy"><Button type="button">Powrót</Button></Link>
                        </ScoreWrapper>
                    }
                </Wrapper>
                :
                <Wrapper>
                    {questions.length ? "Trwa ładowanie..." : "Test nie ma pytań"}
                </Wrapper>}
        </UserTemplate>
    )
}

const mapStateToProps = ({ userID, isLoading, currentTest, questions }) => ({ userID, isLoading, currentTest, questions })

const mapDispatchToProps = (dispatch) => ({
    getQuestions: (testID) => dispatch(getQuestions(testID)),
    getTest: (testID) => dispatch(getTest(testID))
})

export default connect(mapStateToProps, mapDispatchToProps)(TestView);