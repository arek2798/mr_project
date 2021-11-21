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
    
    @media (max-width: 875px) {
        justify-content: space-around;
    }
    
    @media (max-width: 510px) {
        padding: 0;
        margin: 20px auto 0;
    }
`
const Divider = styled.div`
    width: 100%;
    height: 3px;
    background-color: #CECECE;
`

const TestsList = ({ tests }) => {
    return (
        <LessonsWrapper>
            {tests && tests.map((test, index) => <Link key={index} to={`/testy/${test.slug}`}><TestField icon={test.icon} content={test.title} id={test._id} /></Link>)}
            <Divider />
            <Link to={`/testy/probny-egzamin`}><TestField icon="https://res.cloudinary.com/mrproject/image/upload/v1635715372/test_i0kxe7.png" content="Próbny egzamin" withProgress={false} /></Link>
        </LessonsWrapper>
    )
}

export default TestsList;