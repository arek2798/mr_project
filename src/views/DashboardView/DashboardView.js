import React from 'react';
import styled from 'styled-components';
import UserTemplate from '../../templates/UserTemplate';
import DataField from '../../components/atoms/DataField/DataField';
import LevelInfoField from '../../components/components/LevelInfoField/LevelInfoField';
import BadgesField from '../../components/components/BadgesField/BadgesField';
import DayQuestion from '../../components/components/DayQuestion/DayQuestion';
import NextLessonField from '../../components/components/NextLessonField/NextLessonField';
import NextTestField from '../../components/components/NextTestField/NextTestField';
import { getUserStats } from '../../actions';
import { connect } from 'react-redux';

const DataFieldsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 100%;
    max-height: 700px;
    overflow-y: hidden;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
`


const DashboardView = () => {
    return (
        <UserTemplate>
            <DataFieldsWrapper>
                <LevelInfoField />
                <BadgesField />
                <DayQuestion />
                <DataField>
                    <h4>Jak się uczyć?</h4>
                    <p>Zobacz tajniki skutecznej nauki.</p>
                </DataField>
                <NextLessonField />
                <NextTestField />
            </DataFieldsWrapper>
        </UserTemplate>
    )
}

const mapStateToProps = ({ userID, userStats }) => ({ userID, userStats })
const mapDispatchToProps = (dispatch) => ({
    getUserStats: (userID) => dispatch(getUserStats(userID))
})

export default connect(mapStateToProps, mapDispatchToProps)(DashboardView);