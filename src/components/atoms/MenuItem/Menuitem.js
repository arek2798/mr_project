import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const StyledNavLink = styled(NavLink)`
    display: grid;
    width: 200px;
    grid-template-columns: 39px auto;
    align-items: center;
    grid-column-gap: 17px;
    height: 39px;
    cursor: pointer;
    transition: color ease-in-out 0.3s;

    @media (max-width: 520px) {
        grid-template-columns: 39px;
        width: 39px;
    }

    &:hover {
        svg {
            ${({ active }) => !active && 'stroke: #0068FF'};
        }

        color: #0068FF;
    }

    
    &.active {
        p {
            color: #0068FF;
        }

        svg {
            stroke: #FFFFFF;
        }

        & > div {
            border-radius: 10px;
            background-color: #0068FF;
            color: #FFFFFF;
            box-shadow: 4px 4px 12px rgba(0, 104, 255, 0.25);
        }
    }

`
const Icon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 39px;
    height: 39px;
`
const Content = styled.p`
    font-weight: 600;
    size: 1.8rem;

    @media (max-width: 1135px) {
        display: none;
    }
`

const MenuItem = ({ link, active, content, children, mobile = false, exact = false }) => {
    return (
        <StyledNavLink to={link} activeClassName={mobile ? "" : "active"} exact={exact} className={mobile && "mobile"}>
            <Icon>
                {children}
            </Icon>
            < Content active={active}>
                {content}
            </Content>
        </StyledNavLink >
    )
}

export default MenuItem;