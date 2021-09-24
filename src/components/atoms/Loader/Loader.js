import styled, { keyframes } from 'styled-components';
import loaderIcon from './loading.svg';

const rotateAnimation = keyframes`
    from {
        transform: translate(-50%, -50%) rotate(0deg);
    }

    to {
        transform: translate(-50%, -50%) rotate(360deg);
    }
`

const Wrapper = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 50%;
    transform: translateY(-50%);
    ${({ blur }) => blur ? `backdrop-filter: blur(6px)` : ''};

    img {
        width: ${({ small }) => small ? `20px` : '40px'};;
        position: relative;
        left: 50%;
        top: 50%;
        /* top: 100px; */
        
        animation: ${rotateAnimation} 1s steps(8, end) infinite;
    }
`

const Loader = ({ blur = true, small = false }) => (
    <Wrapper blur={blur} small={small}>
        <img src={loaderIcon} alt="" />
    </Wrapper>
)

export default Loader;