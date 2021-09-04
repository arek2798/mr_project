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

    hr {
        height: 1px;
        background: #0068FF;
        border: none;
    }

    .app {
        background-color: #F3F6F9;
        width: 100vw;
        height: 100vh;
        overflow-x: hidden;
        display: flex;
        flex-wrap: nowrap;
    }

    .mobile {
        display: none !important;
    }

    .desktop {
        display: block !important;
    }

    @media (max-width: 520px) {
        .mobile {
            display: block !important;
        }
        
        .desktop {
            display: none !important;
        }
    }

    @media (max-width: 900px) {
        html {
            font-size: 9px;
        }
    }
    @media (max-width: 520px) {
        html {
            font-size: 8.5px;
        }
    }
`

export default GlobalStyle;