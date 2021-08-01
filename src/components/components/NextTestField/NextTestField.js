import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import DataField from '../../atoms/DataField/DataField';
import ProgressBar from '../../atoms/ProgressBar/ProgressBar';
import TestIcon from './test.svg';

const FieldHeader = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;

    a {
        display: flex;
        align-items: center;
        font-size: 18px;
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
    width: 440px;
    height: 127px;
    background: #F1B512;
    border-radius: 20px;
    color: #FFFFFF;
    padding: 21px 23px 26px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`
const ContentWrapper = styled.div`
    display: grid;
    grid-template-columns: 100px auto 70px;
    align-items: center;

    img {
        margin: auto;
    }

    a {
        display: flex;
        align-items: center;
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
`
const Header = styled.p`
    font-size: 18px;
`
const Content = styled.p`
    font-size: 14px;
    margin-top: 3px;
`

const NextTestField = () => (
    <DataField>
        <FieldHeader>
            <h4>Sprawdż się</h4>
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
            <ProgressBar color='#FFFFFF' percent={40} />
        </TestsSummary>
    </DataField>
)

export default NextTestField;