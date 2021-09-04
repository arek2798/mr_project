import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import DataField from '../../atoms/DataField/DataField';
import ProgressBar from '../../atoms/ProgressBar/ProgressBar';
import TestIcon from './test.svg';
import { connect } from 'react-redux';
import { useEffect } from 'react';

const FieldHeader = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

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
const TestsSummary = styled.div`
    max-width: 440px;
    height: 127px;
    background: #F1B512;
    border-radius: 20px;
    color: #FFFFFF;
    padding: 21px 23px 26px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 30px;
    
    @media (max-width: 520px) {
        padding: 21px 15px 26px;
        margin-top: 10px;
    }
`
const ContentWrapper = styled.div`
    display: grid;
    grid-template-columns: 100px auto 70px;
    align-items: center;

    img {
        margin: auto;
    }

    & > div {
        padding-left: 5px;
    }

    a {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        transition: all 0.2s ease-in-out;
        
        path {
            transition: all 0.2s ease-in-out;
        }

        &:hover {
            color: #0068FF;

            path {
                stroke: #0068FF;
            }
        }
    }

    @media (max-width: 1300px) {
        grid-template-columns: 80px auto 70px;
    }

    @media (max-width: 1245px) {
        grid-template-columns: 60px auto 70px;
    }

    @media (max-width: 520px) {
        grid-template-columns: 60px auto 70px;
    }
`
const Header = styled.p`
    font-size: 1.8rem;
`
const Content = styled.p`
    font-size: 1.4rem;
    margin-top: 3px;
`

const NextTestField = ({ userID, userStats, tests }) => {
    const [finishedTestsNum, setFinishedTestsNum] = useState(0);

    const countFinishedTests = () => {
        let finishedTestNum = 0;
        userStats.testsStats.forEach(stats => stats.maksScore === 100 && finishedTestNum++);
        return finishedTestNum;
    }

    useEffect(() => {
        if (userID) {
            setFinishedTestsNum(countFinishedTests())
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <DataField>
            <FieldHeader>
                <h4>Sprawdź się</h4>
                <Link to="/testy">wszystkie testy <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.375 10.5H16.625" stroke="#737373" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M10.5 4.375L16.625 10.5L10.5 16.625" stroke="#737373" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                </Link>
            </FieldHeader>
            <TestsSummary>
                <ContentWrapper>
                    <img src={TestIcon} alt="" />
                    <div>
                        <Header>Rozwiąż kolejny test</Header>
                        <Content>Sprawdź, ile już potrafisz</Content>
                    </div>
                    <Link to="/testy">zobacz <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.375 10.5H16.625" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M10.5 4.375L16.625 10.5L10.5 16.625" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    </Link>
                </ContentWrapper>
                <ProgressBar color='#FFFFFF' percent={finishedTestsNum === 0 ? 0 : (finishedTestsNum / tests.length) * 100} />
            </TestsSummary>
        </DataField>
    )
}

const mapStateToProps = ({ userID, userStats, tests }) => ({ userID, userStats, tests })

export default connect(mapStateToProps)(NextTestField);