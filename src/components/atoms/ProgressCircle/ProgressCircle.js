import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    position: relative;

    svg circle {
        fill: transparent;
        stroke: rgba(0, 0, 0, 0.2);;
        stroke-width: ${({ small }) => small ? "6px" : "8px"};
    }

    svg path {
        fill: none;
        stroke: #0068FF;
        stroke-width: ${({ small }) => small ? "6px" : "8px"};
        stroke-dasharray: ${({ small }) => small ? "119.4, 119.4" : "163.3, 163.3"};;
        stroke-dashoffset: ${({ offset }) => offset};
        transition: stroke-dashoffset 2s ease-in-out 0s;
    }
`
const Progress = styled.div`
    position: absolute;
    text-align: center;
    width: 100%;
    font-size: ${({ small }) => small ? "12px" : "15px"};
    color: #0068FF;
`

const ProgressCircle = ({ percent, small = false }) => {
    const offset = small ? (2 * 19 * Math.PI * (100 - percent) / 100) : (2 * 26 * Math.PI * (100 - percent) / 100);

    return (
        <Wrapper offset={offset} small={small}>
            {small ?
                <>
                    <svg width="45" height="45">
                        <circle cx="22" cy="22" r="19" />
                        <path d="M22 22 m 0,-19 a 19,19 0 1,1 0,38 a 19,19 0 1,1 0,-38" />
                    </svg>
                    <Progress small={small}>{percent}%</Progress>
                </>
                :
                <>
                    <svg width="60" height="60">
                        <circle cx="30" cy="30" r="26" />
                        <path d="M30 30 m 0,-26 a 26,26 0 1,1 0,52 a 26,26 0 1,1 0,-52" />
                    </svg>
                    <Progress small={small}>{percent}%</Progress>
                </>}
        </Wrapper>
    )
}

export default ProgressCircle;