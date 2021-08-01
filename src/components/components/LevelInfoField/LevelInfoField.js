import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import DataField from '../../atoms/DataField/DataField';
import ProgressBar from '../../atoms/ProgressBar/ProgressBar';

const LevelInfo = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const LevelTitle = styled.p`
    color: #0068FF;
    font-size: 24px;
    line-height: 33px;
`
const LevelPoints = styled.p`
    font-size: 22px;
    line-height: 30px;

    span {
        color: #0068FF;
    }
`

const LevelInfoField = ({ userStats: { points = 0, level } }) => (
    <DataField>
        <LevelInfo>
            <LevelTitle>{level}</LevelTitle>
            <LevelPoints><span>{points}</span> / 165 pkt</LevelPoints>
        </LevelInfo>
        <ProgressBar percent={points / 165 * 100} />
    </DataField>
)

const mapStateToProps = ({ userID, userStats }) => ({ userID, userStats })

export default connect(mapStateToProps)(LevelInfoField);