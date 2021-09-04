import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import useWindowDimensions from '../../../helpers/useWindowDimensions';
import ProgressCircle from '../../atoms/ProgressCircle/ProgressCircle';

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
        font-size: 2rem;
        width: 100%;
        display: block;
    }

    img {
        width: 60px;
    }

    @media (max-width: 960px) {
        width: 350px;
    }

    @media (max-width: 875px) {
        width: 400px;
    }

    @media (max-width: 590px) {
        width: 350px;
    }

    @media (max-width: 510px) {
        grid-template-columns: 60px auto 44px;
        
        img {
            width: 50px;
        }
    }

    @media (max-width: 410px) {
        width: 300px;
        padding: 0 14px;
    }

    @media (max-width: 360px) {
        width: 270px;
        
        img {
            width: 45px;
        }
    }
`

const TestField = ({ id, icon, content, userStats }) => {
    const [percent, setPercent] = useState(0);
    const { width } = useWindowDimensions();

    useEffect(() => {
        getTestStats();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getTestStats = () => {
        userStats.testsStats.forEach(stats => {
            if (stats.testId === id) setPercent(stats.maksScore);
        });
    }

    return (
        <Wrapper>
            <img src={icon} alt="" />
            <p>{content}</p>
            <ProgressCircle percent={percent} small={width < 510} />
        </Wrapper>
    )
}

const mapStateToProps = ({ userStats }) => ({ userStats })

export default connect(mapStateToProps)(TestField);