import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    /* justify-content: center; */
    align-items: center;
    position: relative;

    svg circle {
        fill: transparent;
        stroke: rgba(0, 0, 0, 0.2);;
        stroke-width: 8px;
    }

    svg path {
        fill: none;
        stroke: #0068FF;
        stroke-width: 8px;
        stroke-dasharray: 163.3, 163.3;
        stroke-dashoffset: ${({ offset }) => offset};
        transition: stroke-dashoffset 2s ease-in-out 0s;
    }
`
const Progress = styled.div`
    position: absolute;
    text-align: center;
    width: 100%;
    font-size: 15px;
    color: #0068FF;
`

const ProgressCircle = ({ percent }) => {
    const offset = 2 * 26 * Math.PI * (100 - percent) / 100;

    return (
        <Wrapper offset={offset}>
            <svg width="60" height="60">
                <circle cx="30" cy="30" r="26" />
                <path d="M30 30 m 0,-26 a 26,26 0 1,1 0,52 a 26,26 0 1,1 0,-52" />
            </svg>
            <Progress>{percent}%</Progress>
        </Wrapper>
    )
}

export default ProgressCircle;