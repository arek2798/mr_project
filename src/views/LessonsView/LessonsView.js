import React, { useEffect } from 'react';
import ViewHeader from '../../components/components/ViewHeader/ViewHeader';
import styled from 'styled-components';
import UserTemplate from '../../templates/UserTemplate';
// import HelmetIcon from '../../icons/lessons_icons/helmet.svg';
// import HorizontalSignsIcon from '../../icons/lessons_icons/horizontalSigns.svg';
// import FirstHelpIcon from '../../icons/lessons_icons/help.svg';
// import VerticalSignsIcon from '../../icons/lessons_icons/verticalSigns.svg';
// import TrafficLightsIcon from '../../icons/lessons_icons/traffic-light.svg';
// import AccrossIcon from '../../icons/lessons_icons/accross.svg';
import { connect } from 'react-redux';
import { getAllLessons } from '../../actions';
import LessonsList from '../../components/components/LessonsList/LessonsList';

const Wrapper = styled.div`
    height: 100%;
    width: 100%;

    /* @media (max-width: 1135px) {
        height: 700px;
    } */
`

const LessonsView = ({ userID, lessons, getAllLessons, userStats }) => {
    useEffect(() => {
        if (userID) {
            getAllLessons();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userID])

    return (
        <UserTemplate verticalCenter={true}>
            <Wrapper>
                <ViewHeader>
                    <h3>Wybierz czego chcesz się nauczyć</h3>
                    <p>Ukończono: {userStats.lessonsStats ? userStats.lessonsStats.length : 0} / {lessons.length} lekcji</p>
                </ViewHeader>
                <LessonsList />

                {/* <Link to="/lekcje/wyposazenie-roweru"><LessonField color="#F1B512" icon={HelmetIcon} header="Wyposażenie roweru" desc="W tej lekcji nauczysz się jak poprawie wyposażyć rower." check={true} /></Link>
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
                <LessonField color="#F7785A" icon={AccrossIcon} header="Skrzyżowania równorzędne" desc="W tej lekcji nauczysz się jak zachowywać się na skrzyżowaniach równorzędnych." check={true} /> */}
                {/* </LessonsWrapper> */}
            </Wrapper>
        </UserTemplate >
    )
}

const mapStateToProps = ({ userID, lessons, userStats }) => ({ userID, lessons, userStats })

const mapDispatchToProps = (dispatch) => ({
    getAllLessons: () => dispatch(getAllLessons())
})

export default connect(mapStateToProps, mapDispatchToProps)(LessonsView);