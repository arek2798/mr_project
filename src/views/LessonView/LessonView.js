import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import UserTemplate from '../../templates/UserTemplate';
import Button from '../../components/components/Button/Button';
import { connect } from 'react-redux';
import { getLesson, updateUserStats, addNotification, setNewLevelCardVisible } from '../../actions';
import { getLevelName } from '../../helpers/levelHelper';
import NewLevelCard from '../../components/molecules/NewLevelCard/NewLevelCard';

const Wrapper = styled.div`
    height: calc(100vh - 200px);
    width: 100%;
    position: relative;
    overflow-y: scroll;

    ::-webkit-scrollbar {
        width: 10px;
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
const LessonTitle = styled.h3`
    font-size: 24px;
    color: #0068FF;
`
const Content = styled.div`
    margin: 28px 0;
    padding: 0 15px;
    color: #252525;

    h3 {
        margin: 30px 0 20px;
        color: #0068FF;
    }
`
const ButtonWrapper = styled.div`
    width: 100%;
    text-align: center;
`
const ScoreWrapper = styled.div`
    height: 240px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
`
const ScoreInfo = styled.div`
    color: #252525;
    text-align: center;

    .message {
        font-size: 36px;
        color: ${({ correct }) => correct ? '#19BF55' : '#FF4A4A'}
    }
    .correct-answers {
        font-size: 28px;
        margin: 13px 0;
    }
    .points {
        font-size: 24px;

    }
`

const LessonView = ({ userID, isLoading, currentLesson, getLesson, userStats, updateUserStats, history, addNotification, setNewLevelCardVisible, newLevelCardVisible }) => {
    const [submited, setSubmited] = useState(false);
    const [canAdd, setCanAdd] = useState(false);
    const [loadStep, setLoadStep] = useState(0);

    let { lessonSlug } = useParams();

    const checkCanAdd = () => {
        let canAdd = true;
        userStats.lessonsStats.forEach(stats => {
            if (stats.lessonId === currentLesson._id) canAdd = false;
        })
        return canAdd;
    }

    useEffect(() => {
        if (userID) {
            getLesson(lessonSlug);
            setLoadStep(1);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (userID && loadStep) {
            setCanAdd(checkCanAdd());
            setLoadStep(2);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentLesson])

    const buttonHandle = () => {
        let newStats = userStats;
        if (canAdd) {
            const lessonsStats = newStats.lessonsStats;
            lessonsStats.push({ lessonId: currentLesson._id })
            let newPoints = userStats.points + 15;
            let levelName = userStats.level;
            if (userStats.level !== getLevelName(newPoints)) {
                levelName = getLevelName(newPoints)
                setNewLevelCardVisible(true);
                addNotification('level', 'level');
            }
            newStats = {
                ...newStats,
                level: levelName,
                points: newPoints,
                lessonsStats
            }
            addNotification('points', 15);
            updateUserStats(newStats);
            setSubmited(true);
        } else {
            history.push('/lekcje');
        }
    }

    return (
        <UserTemplate verticalCenter={true}>
            {!newLevelCardVisible ?
                <Wrapper>
                    {currentLesson && loadStep === 2 ?
                        !submited ?
                            <>
                                <LessonTitle>Temat: {currentLesson.title}</LessonTitle>
                                <Content dangerouslySetInnerHTML={{ __html: currentLesson.content }}></Content>
                                <Content dangerouslySetInnerHTML={{ __html: currentLesson.content }}></Content>
                                <Content dangerouslySetInnerHTML={{ __html: currentLesson.content }}></Content>
                                <ButtonWrapper>
                                    <Button type="button" width="130px" height="40px" fontSize="16px" onClick={buttonHandle}>{canAdd ? 'Już rozumiem!' : 'Powrót'}</Button>
                                </ButtonWrapper>
                            </>
                            :
                            <ScoreWrapper>
                                <ScoreInfo correct={true}>
                                    <p className="message">Brawo!! Umiesz już wszystko z tej lekcji!</p>
                                    <p className="points">Otrzymałeś 15 punktów</p>
                                </ScoreInfo>
                                <Link to="/lekcje"><Button type="button">Powrót</Button></Link>
                            </ScoreWrapper>
                        :
                        <p>Trwa ładowanie...</p>
                    }

                    {/* <Content>
                    <p>Sygnały świetlne nadawane przez urządzenia umieszczone na drodze oznaczają:

                        1 - Sygnał zielony - zezwolenie na wjazd lub wejście. Nie wolno wjechać za sygnalizator jeżeli:<br />
                    -> ruch pojazdu utrudniłby opuszczenie jezdni pieszym lub rowerzystom<br />
                    -> opuszczenie skrzyżowania nie będzie możliwe przed zakończeniem nadawania sygnału zielonego.<br />
                        2 - Sygnał żółty - zakaz wjazdu, chyba że w chwili zapalenia się tego sygnału pojazd znajduje się tak blisko sygnalizatora, że nie może być zatrzymany przed nim bez gwałtownego hamowania; sygnał ten oznacza jednocześnie, że za chwilę zapali się sygnał czerwony,<br />
                        3 - Sygnał czerwony - zakaz wjazdu lub wejścia za sygnalizator.<br />
                        4 - Sygnały czerwony i żółty nadawane jednocześnie - zakaz wjazdu za sygnalizator; sygnały te oznaczają także, że za chwilę zapali się sygnał zielony.</p>
                    <ContentHeader>Sygnalizator ogólny z sygnałami do kierowania ruchem - S-1</ContentHeader>
                    <p>Sygnały świetlne występują w określonej kolejności - zawsze tak samo:<br /><br />

                        W sygnalizatorach używanych poza skrzyżowaniem (np. przy zwężeniach dróg, spowodowanych robotami drogowymi), mogą być nadawane sygnały tylko o dwóch barwach - zielonej i czerwonej.<br /><br />

                        ZAPAMIĘTAJ! Wskazania sygnałów świetlnych do kierowania ruchem na skrzyżowaniach są ważniejsze od wskazań znaków drogowych, ale mniej ważne od sygnałów podawanych przez kierującego ruchem.<br />
                        Sygnał czerwony migający, lub dwa na przemian migające  sygnały czerwone (np. przed przejazdami kolejowymi), oznaczają zakaz wjazdu.<br />
                        Zatrzymanie pojazdu powinno nastąpić przed linią zatrzymania P-14, a w razie jej braku - przed sygnalizatorem. Jeżeli sygnalizator umieszczony jest nad jezdnią, to zatrzymanie powinno nastąpić przed linią zatrzymania, a w razie jej braku - przed jezdnią, nad którą sygnalizator został umieszczony.<br /><br />

                        Migający lub stały sygnał żółty umieszczony na przeszkodzie, albo migający sygnał żółty nadawany przez sygnalizator, ostrzegają o występującym niebezpieczeństwie lub utrudnieniu ruchu oraz nakazują zachowanie szczególnej ostrożności.</p>
                </Content> */}
                </Wrapper>
                :
                <NewLevelCard />}
        </UserTemplate>
    )
}

const mapStateToProps = ({ userID, isLoading, currentLesson, userStats, newLevelCardVisible }) => ({ userID, isLoading, currentLesson, userStats, newLevelCardVisible })

const mapDispatchToProps = (dispatch) => ({
    setNewLevelCardVisible: (value) => dispatch(setNewLevelCardVisible(value)),
    addNotification: (type, value) => dispatch(addNotification(type, value)),
    getLesson: (slug) => dispatch(getLesson(slug)),
    updateUserStats: (userStats) => dispatch(updateUserStats(userStats)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LessonView);