import styled, { keyframes } from 'styled-components';
import loaderIcon from './loading.svg';

const rotateAnimation = keyframes`
    from {
        transform: translateX(-50%) rotate(0deg);
    }

    to {
        transform: translateX(-50%) rotate(360deg);
    }
`

const Wrapper = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 100px;
    backdrop-filter: blur(6px);

    img {
        width: 40px;
        position: relative;
        left: 50%;
        top: 100px;
        
        animation: ${rotateAnimation} 1s steps(8, end) infinite;
    }
`

const Loader = () => (
    <Wrapper><img src={loaderIcon} alt="" /></Wrapper>
)

export default Loader;