import React from 'react';
import styled from 'styled-components';
import UserTemplate from '../../templates/UserTemplate';
import DataField from '../../components/atoms/DataField/DataField';
import LevelInfoField from '../../components/components/LevelInfoField/LevelInfoField';
import BadgesField from '../../components/components/BadgesField/BadgesField';
import DayQuestion from '../../components/components/DayQuestion/DayQuestion';
import NextLessonField from '../../components/components/NextLessonField/NextLessonField';
import NextTestField from '../../components/components/NextTestField/NextTestField';
import { connect } from 'react-redux';
import NewLevelCard from '../../components/molecules/NewLevelCard/NewLevelCard';

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

    @media (max-width: 1040px) {
        flex-wrap: nowrap;
        max-height: unset;
        overflow-y: scroll;
        top: 0;
        transform: translateY(0%);

        & > div {
            width: 100%;
            min-height: unset;
            margin-bottom: 25px;
        }
    }

    @media (max-width: 520px) {
        & > div {
            width: 100%;
            min-height: unset;
            margin-bottom: 15px;
        }
    }
`


const DashboardView = ({ newLevelCardVisible }) => {
    return (
        <UserTemplate>
            {!newLevelCardVisible ?
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
                :
                <NewLevelCard />}
        </UserTemplate>
    )
}

const mapStateToProps = ({ newLevelCardVisible }) => ({ newLevelCardVisible })

export default connect(mapStateToProps)(DashboardView);