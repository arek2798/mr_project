import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Loader from '../../atoms/Loader/Loader';

const Wrapper = styled.div`
    position: relative;
    max-width: 440px;
    height: 113px;
    padding: 0 15px;
    border-radius: 20px;
    display: grid;
    grid-template-columns: 72px auto 75px;
    align-items: center;
    background-color: ${({ color }) => color};
    color: #FFFFFF;

    @media(max-width: 510px) {
        grid-template-columns: 62px auto 55px;
        min-height: 100px;
        height: unset;

        & > img {
            width: 50px;
        }
    }
`
const Icon = styled.img`
    width: 60px;
`
const Header = styled.p`
    font-size: 1.8rem;
    margin-bottom: 5px;
`
const Desc = styled.p`
    font-size: 1.3rem;
`
const More = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: ${({ type }) => type === "info" ? "flex-end" : "center"};
    height: 100%;
    padding: 15px 0;

    a {
        display: flex;
        align-items: center;
        transition: all 0.2s ease-in-out;
        
        path {
            transition: all 0.2s ease-in-out;
        }

        &:hover {
            color: #0068FF;

            path {
                stroke: #0068FF;
            }
        }
    }
`

const CheckIcon = styled.svg`
    width: 41px;
    height: 41px;

    @media (max-width: 510px) {
        width: 31px;
        height: 31px;
    }
`
const LoaderWrapper = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
`

const LessonField = ({ to, color, icon, header, desc, type = "check", check = false, loading = false }) => (
    <Wrapper color={color}>
        {loading ?
            <LoaderWrapper>
                <Loader blur={false} small />
            </LoaderWrapper>
            :
            <>
                <Icon src={icon} />
                <div>
                    <Header>{header}</Header>
                    <Desc>{desc}</Desc>
                </div>
                <More type={type}>
                    {type === "info" ?
                        <Link to={to}>zobacz <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.375 10.5H16.625" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M10.5 4.375L16.625 10.5L10.5 16.625" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        </Link>
                        :
                        check && <CheckIcon viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0)">
                                <path d="M15.6996 35.8163C15.3083 36.21 14.7743 36.4296 14.2196 36.4296C13.665 36.4296 13.131 36.21 12.7396 35.8163L0.919968 23.9947C-0.306656 22.7681 -0.306656 20.7791 0.919968 19.5547L2.39997 18.0744C3.62698 16.8477 5.61372 16.8477 6.84035 18.0744L14.2196 25.454L34.1596 5.51372C35.3866 4.28709 37.3752 4.28709 38.6 5.51372L40.08 6.9941C41.3066 8.22072 41.3066 10.2094 40.08 11.4341L15.6996 35.8163Z" fill="#0068FF" />
                            </g>
                            <defs>
                                <clipPath id="clip0">
                                    <rect width="41" height="41" fill="white" />
                                </clipPath>
                            </defs>
                        </CheckIcon>

                    }
                </More>
            </>}
    </Wrapper>
)

export default LessonField;