import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
    width: ${({ width }) => width ? width : '85px'};
    height: 30px;
    background-color: #0068FF;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    font-size: 14px;
    color: #FFFFFF;
    border: none;
    transition: all 0.2s ease-in-out;

    &:hover {
        background-color: #0046DD;
    }

    &:disabled {
        background-color: #BDBDBD;
        cursor: default;
    }
`

const Button = ({ type, disabled, onClick, width, children }) => (
    <StyledButton type={type} disabled={disabled} onClick={onClick} width={width}>{children}</StyledButton>
)

export default Button;