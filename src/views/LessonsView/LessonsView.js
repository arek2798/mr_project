import React from 'react';
import LessonField from '../../components/components/LessonField/LessonField';
import ViewHeader from '../../components/components/ViewHeader/ViewHeader';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import UserTemplate from '../../templates/UserTemplate';
import HelmetIcon from '../../icons/lessons_icons/helmet.svg';
import HorizontalSignsIcon from '../../icons/lessons_icons/horizontalSigns.svg';
import FirstHelpIcon from '../../icons/lessons_icons/help.svg';
import VerticalSignsIcon from '../../icons/lessons_icons/verticalSigns.svg';
import TrafficLightsIcon from '../../icons/lessons_icons/traffic-light.svg';
import AccrossIcon from '../../icons/lessons_icons/accross.svg';

const Wrapper = styled.div`
    height: 800px;
`
const LessonsWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    flex-wrap: wrap;
    max-width: 1000px;
    max-height: 560px;
    margin: 40px auto 0;
    overflow-y: scroll;

    div {
        margin: 12px 0;
        cursor: pointer;
    }

    ::-webkit-scrollbar {
        width: 13px;
        height: 13px;
    }
    ::-webkit-scrollbar-thumb {
        background: #008AFF;
        border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb:hover{
        background: #0068FF;
    }
    ::-webkit-scrollbar-track{
        background: #ffffff;
        border-radius: 10px;
        box-shadow: inset 7px 10px 12px #f0f0f0;
    }
`

const LessonsView = () => (
    <UserTemplate verticalCenter={true}>
        <Wrapper>
            <ViewHeader>
                <h3>Wybierz czego chcesz się nauczyć</h3>
                <p>Ukończono: 2 / 10 lekcji</p>
            </ViewHeader>
            <LessonsWrapper>
                <Link to="/lekcje/wyposazenie-roweru"><LessonField color="#F1B512" icon={HelmetIcon} header="Wyposażenie roweru" desc="W tej lekcji nauczysz się jak poprawie wyposażyć rower." check={true} /></Link>
                <LessonField color="#5AB5F7" icon={HorizontalSignsIcon} header="Znaki poziome" desc="W tej lekcji poznasz wszystkie znaki poziome występujące na drogach." />
                <LessonField color="#F7785A" icon={FirstHelpIcon} header="Pierwsza pomoc" desc="W tej lekcji nauczysz się jak radzić sobie podczas wypadku i udzielić pierwszej pomocy." />
                <LessonField color="#F1B512" icon={VerticalSignsIcon} header="Znaki pionowe" desc="W tej lekcji dowiesz się co oznaczają znaki pionowe w ruchu drogowym." />
                <Link to="/lekcje/sygnalizacja-swietlna"><LessonField color="#5AB5F7" icon={TrafficLightsIcon} header="Sygnalizacja świetlna" desc="W tej lekcji dowiesz się co oznaczają określone sygnały świetlne." /></Link>
                <LessonField color="#F7785A" icon={AccrossIcon} header="Skrzyżowania równorzędne" desc="W tej lekcji nauczysz się jak zachowywać się na skrzyżowaniach równorzędnych." check={true} />
                <LessonField color="#5AB5F7" icon={TrafficLightsIcon} header="Sygnalizacja świetlna" desc="W tej lekcji dowiesz się co oznaczają określone sygnały świetlne." />
                <LessonField color="#F7785A" icon={AccrossIcon} header="Skrzyżowania równorzędne" desc="W tej lekcji nauczysz się jak zachowywać się na skrzyżowaniach równorzędnych." check={true} />
                <LessonField color="#5AB5F7" icon={TrafficLightsIcon} header="Sygnalizacja świetlna" desc="W tej lekcji dowiesz się co oznaczają określone sygnały świetlne." />
                <LessonField color="#F7785A" icon={AccrossIcon} header="Skrzyżowania równorzędne" desc="W tej lekcji nauczysz się jak zachowywać się na skrzyżowaniach równorzędnych." check={true} />
                <LessonField color="#5AB5F7" icon={TrafficLightsIcon} header="Sygnalizacja świetlna" desc="W tej lekcji dowiesz się co oznaczają określone sygnały świetlne." />
                <LessonField color="#F7785A" icon={AccrossIcon} header="Skrzyżowania równorzędne" desc="W tej lekcji nauczysz się jak zachowywać się na skrzyżowaniach równorzędnych." check={true} />
            </LessonsWrapper>
        </Wrapper>
    </UserTemplate >
)

export default LessonsView;