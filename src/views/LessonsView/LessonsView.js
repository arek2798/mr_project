import React, { useEffect } from 'react';
import ViewHeader from '../../components/components/ViewHeader/ViewHeader';
import styled from 'styled-components';
import UserTemplate from '../../templates/UserTemplate';
// import HelmetIcon from '../../icons/lessons_icons/helmet.svg';
// import HorizontalSignsIcon from '../../icons/lessons_icons/horizontalSigns.svg';
// import FirstHelpIcon from '../../icons/lessons_icons/help.svg';
// import VerticalSignsIcon from '../../icons/lessons_icons/verticalSigns.svg';
// import TrafficLightsIcon from '../../icons/lessons_icons/traffic-light.svg';
// import AccrossIcon from '../../icons/lessons_icons/accross.svg';
import { connect } from 'react-redux';
import { getAllLessons } from '../../actions';
import LessonsList from '../../components/components/LessonsList/LessonsList';

const Wrapper = styled.div`
    height: 100%;
    width: 100%;

    /* @media (max-width: 1135px) {
        height: 700px;
    } */
`

const LessonsView = ({ userID, lessons, getAllLessons, userStats }) => {
    useEffect(() => {
        if (userID) {
            getAllLessons();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userID])

    return (
        <UserTemplate verticalCenter={true}>
            <Wrapper>
                <ViewHeader>
                    <h3>Wybierz czego chcesz się nauczyć</h3>
                    <p>Ukończono: {userStats.lessonsStats ? userStats.lessonsStats.length : 0} / {lessons.length} lekcji</p>
                </ViewHeader>
                <LessonsList />
                <div>Icons made by <a href="https://www.flaticon.com" title="FlatIcon">www.flaticon.com</a></div>
            </Wrapper>
        </UserTemplate >
    )
}

const mapStateToProps = ({ userID, lessons, userStats }) => ({ userID, lessons, userStats })

const mapDispatchToProps = (dispatch) => ({
    getAllLessons: () => dispatch(getAllLessons())
})

export default connect(mapStateToProps, mapDispatchToProps)(LessonsView);