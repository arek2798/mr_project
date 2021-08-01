import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import DataField from '../../atoms/DataField/DataField';
import Button from '../Button/Button';
import { addNotification, addPoints, setDayquestAnswered } from '../../../actions';

const QuestionForm = styled.form`
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    margin-top: 10px;

    legend {
        font-size: 18px;
        margin-bottom: 10px;
    }
`
const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
`
const ButtonWrapper = styled.div`
    text-align: right;
`
const Answer = styled.div`
    display: grid;
    grid-template-columns: 20px auto;
    align-items: center;
    font-size: 15px;
    margin: 5px 0 5px 10px;
`
const Error = styled.p`
    color: #FF4A4A;
`
const Info = styled.p`
    text-align: center;
    font-size: 18px;
    color: ${({ color }) => color};
    margin: 50px 0;
`

const questionContent = {
    question: 'Wyprzedzanie jest dozwolone:',
    answers: [
        'na skrzyżowaniu w ruchu okrężnym',
        'na każdym skrzyżowaniu',
        'na przejściu dla pieszych'
    ],
    correctAnswer: 'na skrzyżowaniu w ruchu okrężnym'
}

const DayQuestion = ({ userStats, addNotification, addPoints, setDayquestAnswered }) => {
    const [checkedAnswer, setAnswer] = useState();
    const [error, setError] = useState(false);
    const [submit, setSubmit] = useState(false);
    const [correct, setCorrect] = useState(false);

    const handleForm = (e) => {
        e.preventDefault();

        if (checkedAnswer === undefined) setError(true);
        else {
            setError(false);
            setSubmit(true);
            if (checkedAnswer === questionContent.correctAnswer) {
                setCorrect(true);
                addNotification('points', 5);
                addPoints(5);
                setDayquestAnswered();
            }
        }
    }


    return (
        <DataField>
            <h4>Pytanie dnia</h4>
            {(!userStats.dayQuestion && !submit) && <QuestionForm autoComplete="off" onSubmit={e => handleForm(e)}>
                <legend>{questionContent.question}</legend>

                {questionContent.answers.map((answer, index) => (
                    <Answer key={index}>
                        <input type="radio" id={index} name="question" value={answer} checked={answer === checkedAnswer} onChange={() => setAnswer(answer)} />
                        <label htmlFor={index}>{answer}</label>
                    </Answer>
                ))}
                {error && <Error>Uwaga! Musisz zaznaczyć odpowiedź</Error>}
                <ButtonWrapper><Button type="submit">sprawdź</Button></ButtonWrapper>
            </QuestionForm>}
            <Wrapper>
                {(userStats.dayQuestion && submit) && (correct ? <Info color="#18A300">Brawo! Prawidłowa odpowiedź! <br /> Otrzymujesz 5 pktów</Info> : <Info color="#F7785A">Niestety, błędna odpowiedź :(</Info>)}
                {(userStats.dayQuestion && !submit) && <Info color="#737373">Odpowiedzialeś/aś już na pytanie dnia ;)</Info>}
            </Wrapper>
        </DataField>
    )
}

const mapStateToProps = ({ userStats }) => ({ userStats })

const mapDispatchToProps = (dispatch) => ({
    addNotification: (type, value) => dispatch(addNotification(type, value)),
    addPoints: (points) => dispatch(addPoints(points)),
    setDayquestAnswered: () => dispatch(setDayquestAnswered()),
})

export default connect(mapStateToProps, mapDispatchToProps)(DayQuestion);