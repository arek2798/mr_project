import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    width: 100%;
    height: 8px;
    border-radius: 10px;
    background-color: rgba(115, 115, 115, 0.3);
`
const Progress = styled.div`
    width: ${({ width }) => width ? width + '%' : 0};
    height: 100%;
    border-radius: 10px;
    background-color: ${({ color }) => color ? color : '#0068FF'};
`

const ProgressBar = ({ percent = 0, color }) => {

    return (
        <Wrapper>
            <Progress width={percent} color={color} />
        </Wrapper>
    )
}

export default ProgressBar;