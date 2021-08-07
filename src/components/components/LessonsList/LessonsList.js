import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import LessonField from '../LessonField/LessonField.js';

const LessonsWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    /* align-items: flex-start; */
    flex-wrap: wrap;
    max-width: 1000px;
    max-height: 560px;
    margin: 40px auto 0;
    overflow-y: scroll;

    div {
        margin: 12px 0;
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

// const colors = ["#F1B512", "#F7785A", "#5AB5F7"]

const LessonsList = ({ lessons }) => (
    <LessonsWrapper>
        {lessons && lessons.map((lesson, index) => <Link key={index} to={`/lekcje/${lesson.slug}`}><LessonField color={lesson.color} icon={lesson.icon} header={lesson.title} desc={lesson.desc} check={true} /></Link>)}
    </LessonsWrapper>
)

export default LessonsList;