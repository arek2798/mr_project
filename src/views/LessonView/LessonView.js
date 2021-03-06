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

    img {
        margin: auto;
        width: 100%;
        max-width: 480px;
    }

    .img-wrapper {
        text-align: center;
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
                                <ButtonWrapper>
                                    <Button type="button" width="130px" height="40px" fontSize="16px" onClick={buttonHandle}>{canAdd ? 'Ju?? rozumiem!' : 'Powr??t'}</Button>
                                </ButtonWrapper>
                            </>
                            :
                            <ScoreWrapper>
                                <ScoreInfo correct={true}>
                                    <p className="message">Brawo!! Umiesz ju?? wszystko z tej lekcji!</p>
                                    <p className="points">Otrzyma??e?? 15 punkt??w</p>
                                </ScoreInfo>
                                <Link to="/lekcje"><Button type="button">Powr??t</Button></Link>
                            </ScoreWrapper>
                        :
                        <p>Trwa ??adowanie...</p>
                    }

                    {/* <Content>
                    <p>Sygna??y ??wietlne nadawane przez urz??dzenia umieszczone na drodze oznaczaj??:

                        1 - Sygna?? zielony - zezwolenie na wjazd lub wej??cie. Nie wolno wjecha?? za sygnalizator je??eli:<br />
                    -> ruch pojazdu utrudni??by opuszczenie jezdni pieszym lub rowerzystom<br />
                    -> opuszczenie skrzy??owania nie b??dzie mo??liwe przed zako??czeniem nadawania sygna??u zielonego.<br />
                        2 - Sygna?? ??????ty - zakaz wjazdu, chyba ??e w chwili zapalenia si?? tego sygna??u pojazd znajduje si?? tak blisko sygnalizatora, ??e nie mo??e by?? zatrzymany przed nim bez gwa??townego hamowania; sygna?? ten oznacza jednocze??nie, ??e za chwil?? zapali si?? sygna?? czerwony,<br />
                        3 - Sygna?? czerwony - zakaz wjazdu lub wej??cia za sygnalizator.<br />
                        4 - Sygna??y czerwony i ??????ty nadawane jednocze??nie - zakaz wjazdu za sygnalizator; sygna??y te oznaczaj?? tak??e, ??e za chwil?? zapali si?? sygna?? zielony.</p>
                    <ContentHeader>Sygnalizator og??lny z sygna??ami do kierowania ruchem - S-1</ContentHeader>
                    <p>Sygna??y ??wietlne wyst??puj?? w okre??lonej kolejno??ci - zawsze tak samo:<br /><br />

                        W sygnalizatorach u??ywanych poza skrzy??owaniem (np. przy zw????eniach dr??g, spowodowanych robotami drogowymi), mog?? by?? nadawane sygna??y tylko o dw??ch barwach - zielonej i czerwonej.<br /><br />

                        ZAPAMI??TAJ! Wskazania sygna????w ??wietlnych do kierowania ruchem na skrzy??owaniach s?? wa??niejsze od wskaza?? znak??w drogowych, ale mniej wa??ne od sygna????w podawanych przez kieruj??cego ruchem.<br />
                        Sygna?? czerwony migaj??cy, lub dwa na przemian migaj??ce  sygna??y czerwone (np. przed przejazdami kolejowymi), oznaczaj?? zakaz wjazdu.<br />
                        Zatrzymanie pojazdu powinno nast??pi?? przed lini?? zatrzymania P-14, a w razie jej braku - przed sygnalizatorem. Je??eli sygnalizator umieszczony jest nad jezdni??, to zatrzymanie powinno nast??pi?? przed lini?? zatrzymania, a w razie jej braku - przed jezdni??, nad kt??r?? sygnalizator zosta?? umieszczony.<br /><br />

                        Migaj??cy lub sta??y sygna?? ??????ty umieszczony na przeszkodzie, albo migaj??cy sygna?? ??????ty nadawany przez sygnalizator, ostrzegaj?? o wyst??puj??cym niebezpiecze??stwie lub utrudnieniu ruchu oraz nakazuj?? zachowanie szczeg??lnej ostro??no??ci.</p>
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