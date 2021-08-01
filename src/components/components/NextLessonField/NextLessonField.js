import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import DataField from '../../atoms/DataField/DataField';
import LessonField from '../LessonField/LessonField';
import HelpIcon from '../../../icons/lessons_icons/help.svg';
import TrafficLightIcon from '../../../icons/lessons_icons/traffic-light.svg';

const Wrapper = styled(DataField)`
    &>div:not(:first-child) {
        margin: 30px 0 10px;
    }
`
const FieldHeader = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    a {
        display: flex;
        align-items: center;
        font-size: 18px;
        transition: all 0.2s ease-in-out;

        svg path {
            transition: all 0.2s ease-in-out;
        }

        &:hover {
            color: #0068FF;

            svg path {
                stroke: #0068FF;
            }
        }
    }
`

const NextLessonField = () => (
    <Wrapper>
        <FieldHeader>
            <h4>Kontynuuj naukę</h4>
            <Link to="/lekcje">wszystkie lekcje <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.375 10.5H16.625" stroke="#737373" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M10.5 4.375L16.625 10.5L10.5 16.625" stroke="#737373" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            </Link>
        </FieldHeader>
        <LessonField to="/lekcje/pierwsza-pomoc" color="#F7785A" icon={HelpIcon} header="Pierwsza pomoc" desc="W tej lekcji nauczysz się jak radzić sobie podczas wypadku i udzielić pierwszej pomocy." type="info" />
        <LessonField to="/lekcje/sygnalizacja-swietlna" color="#5AB5F7" icon={TrafficLightIcon} header="Sygnalizacja świetlna" desc="W tej lekcji dowiesz się co oznaczają określone sygnały świetlne." type="info" />
    </Wrapper>
)

export default NextLessonField;