import React from 'react';
import styled from 'styled-components';
import DataField from '../../atoms/DataField/DataField';
import { connect } from 'react-redux';
import { getBadges } from '../../../helpers/badgesHelper';

const BadgesWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 20%);
    align-items: center;
    padding: 25px 0 10px;
`
const Info = styled.p`
    padding: 25px 0 10px;
`
const BadgesField = ({ userStats }) => {
    let badgesCount = 0;
    return (
        <DataField>
            <h4>Nowe odznaki</h4>
            {(userStats.badges.length) ?
                <BadgesWrapper>
                    {(userStats.badges && badgesCount < 5) && getBadges().map((badge, index) => {
                        if (userStats.badges.includes(index)) {
                            badgesCount++
                            return <img key={index} src={badge.icon} alt="" />
                        }
                        return null;
                    })}
                </BadgesWrapper>
                :
                <Info>Nie masz jeszcze żadnych odznak</Info>}
        </DataField>
    )
}

const mapStateToProps = ({ userStats }) => ({ userStats })

export default connect(mapStateToProps)(BadgesField);