import styled from 'styled-components';

const DataField = styled.div`
    width: calc(50% - 20px);
    max-width: 500px;
    min-height: 100px;
    border-radius: 20px;
    background-color: #ffffff;
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
    padding: 22px 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    h4 {
        font-size: 2.2rem;
        line-height: 33px;
        color: #0068FF;
    }

    @media(max-width: 520px) {
        padding: 16px 18px;
    }
`

export default DataField;