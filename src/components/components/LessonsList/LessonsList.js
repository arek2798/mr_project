import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import LessonField from '../LessonField/LessonField.js';
import { connect } from 'react-redux';
import { useEffect } from 'react';

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

    @media (max-width: 1250px) {
        & > a > div {
            max-width: 390px;
            /* grid-template-columns: 72px 70px 75px; */
        }
    }

    @media (max-width: 930px) {
        & > a > div {
            max-width: 450px;
            /* grid-template-columns: 72px 70px 75px; */
        }
    }

    @media (max-width: 510px) {
        margin: 20px auto 0;
    }
`

// const colors = ["#F1B512", "#F7785A", "#5AB5F7"]

const LessonsList = ({ lessons, userStats }) => {
    const [lessonsStatus, setLessonsStatus] = useState([]);

    const checkStatus = id => {
        let status = false;
        userStats.lessonsStats.forEach(stats => {
            if (stats.lessonId === id) status = true;
        })
        return status;
    }

    useEffect(() => {
        const status = [];
        lessons.forEach((lesson, i) => {
            status[i] = checkStatus(lesson._id);
        });
        setLessonsStatus(status);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userStats])

    return (
        <LessonsWrapper>
            {lessons && lessons.map((lesson, index) => <Link key={lesson._id} to={`/lekcje/${lesson.slug}`}><LessonField color={lesson.color} icon={lesson.icon} header={lesson.title} desc={lesson.desc} check={lessonsStatus[index]} /></Link>)}
        </LessonsWrapper>
    )
}

const mapStateToProps = ({ lessons, userStats }) => ({ lessons, userStats })

export default connect(mapStateToProps)(LessonsList);