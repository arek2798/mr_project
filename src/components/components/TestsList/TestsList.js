import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import TestField from '../TestField/TestField';

const LessonsWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    /* align-items: flex-start; */
    flex-wrap: wrap;
    max-width: 900px;
    max-height: 560px;
    padding: 0 20px;
    margin: 40px auto 0;
    overflow-y: scroll;

    div {
        margin: 12px 0px;
        cursor: pointer;
    }

    ::-webkit-scrollbar {
        width: 13px;
        height: 13px;
    }
    ::-webkit-scrollbar-thumb {
        background: #008AFF;
        border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb:hover{
        background: #0068FF;
    }
    ::-webkit-scrollbar-track{
        background: #ffffff;
        border-radius: 10px;
        box-shadow: inset 7px 10px 12px #f0f0f0;
    }
`

const TestsList = ({ tests }) => (
    <LessonsWrapper>
        {tests && tests.map((test, index) => <Link key={index} to={`/testy/${test._id}`}><TestField content={test.title} percent={0} /></Link>)}
    </LessonsWrapper>
)

export default TestsList;