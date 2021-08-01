import React from 'react';
import styled from 'styled-components';
import ProgressCircle from '../../atoms/ProgressCircle/ProgressCircle';
import TestIcon from './test.svg';

const Wrapper = styled.div`
    width: 390px;
    height: 86px;
    background: #F1B512;
    border-radius: 20px;
    display: grid;
    grid-template-columns: 77px auto 60px;
    align-items: center;
    padding: 0 24px;

    p {
        color: #FFFFFF;
        font-size: 24px;
    }
`

const TestField = ({ content, percent }) => (
    <Wrapper>
        <img src={TestIcon} alt="" />
        <p>{content}</p>
        <ProgressCircle percent={percent} />
    </Wrapper>
)

export default TestField;