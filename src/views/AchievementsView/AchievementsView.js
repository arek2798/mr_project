import React from 'react';
import styled from 'styled-components';
import UserTemplate from '../../templates/UserTemplate';
import { connect } from 'react-redux';
import { getBadges } from '../../helpers/badgesHelper';
import { useState } from 'react';
import { useEffect } from 'react';

const Wrapper = styled.div`
    height: 100%;
    width: 100%;

    h3 {
        font-size: 2.4rem;
        color: #0068FF;
        margin-bottom: 23px;
    }
`
const StatsWrapper = styled.div`
    margin-bottom: 50px;
    font-size: 1.8rem;

    ul {
        margin-left: 50px;
        list-style-type: none;

        li {
            margin: 7px 0;
        }

        span {
            color: #0068FF;
        }
            
        @media (max-width: 450px) {
            margin-left: 20px;
        }
    }
`
const BadgesWrapper = styled.div`

`
const Badges = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    /* padding-left: 20px; */
`
const Badge = styled.div`
    position: relative;

    &:hover div {
        opacity: 1;
    }

    img {
        margin: 20px 35px;
        opacity: ${({ disable }) => disable ? '0.3' : '1'};
        width: 45px;
    }  
           
    @media (max-width: 450px) {
        img {
            margin: 20px 20px;
        }
    }
`
const DetailsField = styled.div`
    position: absolute;
    top: 70px;
    left: 0px;
    width: 200px;
    background-color: #FFFFFF;
    border-radius: 15px;
    text-align: center;
    padding: 5px 15px;
    box-shadow: 2px 2px 18px rgba(0, 0, 0, 0.15);
    opacity: 0;
    transition: opacity 0.2s ease-in-out;

    & > p {
        white-space: nowrap;
    }
`

const AchievementsView = ({ userStats, lessons, tests }) => {
    const [finishedTestsNum, setFinishedTestNum] = useState(0);

    const countFinishedTests = () => {
        let finishedTestNum = 0;
        userStats.testsStats.forEach(stats => stats.maksScore === 100 && finishedTestNum++);
        return finishedTestNum;
    }

    useEffect(() => {
        if (userStats) setFinishedTestNum(countFinishedTests());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userStats])

    return (
        <UserTemplate horizontalCenter={false} verticalCenter={true}>
            {userStats ?
                <Wrapper>
                    <StatsWrapper>
                        <h3>Statystyki</h3>
                        <ul>
                            <li>Twój aktualny poziom: <span>{userStats.level}</span></li>
                            <li>Uzyskane punkty: <span>{userStats.points}</span></li>
                            <li>Ukończone lekcje: <span>{userStats.lessonsStats.length}</span></li>
                            <li>Zaliczone testy: <span>{finishedTestsNum}</span></li>
                            <li>Opanowałeś już <span>{(userStats.lessonsStats.length + finishedTestsNum) / (lessons.length + tests.length) * 100}%</span> materiału</li>
                        </ul>
                    </StatsWrapper>
                    <BadgesWrapper>
                        <h3>Odznaki</h3>
                        <Badges>
                            {getBadges().map((badge, index) =>
                                <Badge disable={!userStats.badges.includes(index)} key={index}><img src={badge.icon} alt="" /><DetailsField>{badge.title}</DetailsField></Badge>
                            )}
                        </Badges>
                    </BadgesWrapper>
                </Wrapper>
                :
                <Wrapper>
                    Trwa wczytywanie...
                </Wrapper>}
        </UserTemplate>
    )
}

const mapStateToProps = ({ userStats, lessons, tests }) => ({ userStats, lessons, tests })

export default connect(mapStateToProps)(AchievementsView);