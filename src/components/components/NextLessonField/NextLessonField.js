import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import DataField from '../../atoms/DataField/DataField';
import LessonField from '../LessonField/LessonField';
// import HelpIcon from '../../../icons/lessons_icons/help.svg';
// import TrafficLightIcon from '../../../icons/lessons_icons/traffic-light.svg';
import { connect } from 'react-redux';
import { getAllLessons } from '../../../actions';
import { useState } from 'react';
import { useEffect } from 'react';

const Wrapper = styled(DataField)`
    &>div:not(:first-child) {
        margin: 30px 0 10px;

        @media(max-width: 520px) {
            margin: 10px 0 10px;
        }
    }
`
const FieldHeader = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    /* h4 {
        font-size: 2.4rem;
        line-height: 2rem;
    } */

    a {
        display: flex;
        align-items: center;
        font-size: 1.8rem;
        transition: all 0.2s ease-in-out;

        svg path {
            transition: all 0.2s ease-in-out;
        }

        &:hover {
            color: #0068FF;

            svg path {
                stroke: #0068FF;
            }
        }
    }
`

const NextLessonField = ({ lessons }) => {
    const [selectedLessons, setSelectedLessons] = useState([]);
    const [loadStep, setLoadStep] = useState(0);

    const randTwoLessons = () => {
        const selectedLessons = [];
        let lesson1 = Math.floor(Math.random() * (lessons.length));
        selectedLessons.push(lessons[lesson1]);
        let lesson2 = lesson1;
        while (lesson2 === lesson1) {
            lesson2 = Math.floor(Math.random() * (lessons.length));
        }
        selectedLessons.push(lessons[lesson2]);
        return selectedLessons;
    }

    useEffect(() => {
        if (!loadStep) {
            getAllLessons();
            setLoadStep(1);
        } else if (loadStep === 1) {
            setSelectedLessons(randTwoLessons());
            setLoadStep(2);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lessons])

    return (
        <Wrapper>
            <FieldHeader>
                <h4>Kontynuuj naukę</h4>
                <Link to="/lekcje">wszystkie lekcje <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.375 10.5H16.625" stroke="#737373" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M10.5 4.375L16.625 10.5L10.5 16.625" stroke="#737373" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                </Link>
            </FieldHeader>
            {loadStep === 2 ?
                selectedLessons.map(lesson => <LessonField key={lesson._id} to={`/lekcje/${lesson.slug}`} color={lesson.color} icon={lesson.icon} header={lesson.title} desc={lesson.desc} type="info" />)
                :
                <>
                    <LessonField to="/lekcje" color="#F1B512" type="info" />
                    <LessonField to="/lekcje" color="#F1B512" type="info" />
                </>
            }
        </Wrapper>
    )
}

const mapStateToProps = ({ lessons }) => ({ lessons })

const mapDispatchToProps = (dispatch) => ({
    getAllLessons: () => dispatch(getAllLessons())
})

export default connect(mapStateToProps, mapDispatchToProps)(NextLessonField);