import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    *, *::before, *::after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    
    html {
        font-size: 62.5%;
    }
    
    body {
        font-size: 1.6rem;
        font-weight: 600;
        font-family: 'Nunito', sans-serif;
        color: #737373;
        background: #F3F6F9;
    }

    a {
        text-decoration: none;
        color: inherit;
    }

    button, input {
        font-family: 'Nunito', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-weight: 600;
        color: #737373;
        font-size: 1.6rem;
        cursor: pointer;
    }

    .app {
        background-color: #F3F6F9;
        width: 100vw;
        height: 100vh;
        overflow-x: hidden;
        display: flex;
        flex-wrap: nowrap;
    }
`;

export default GlobalStyle;