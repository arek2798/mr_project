import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import UserTemplate from '../../templates/UserTemplate';

const Wrapper = styled.div`
    height: 800px;
    max-width: 1000px;
`
const LessonTitle = styled.h3`
    font-size: 24px;
    color: #0068FF;
`
const Content = styled.div`
    margin: 28px 0;
    padding: 0 15px;
    overflow-y: scroll;
    color: #252525;
    
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
const ContentHeader = styled.p`
    font-size: 18px;
    color: #0068FF;
    margin: 20px 0 12px 5px;
`

const LessonView = () => {
    let { subject } = useParams();
    return (
        <UserTemplate verticalCenter={true}>
            <Wrapper>
                <LessonTitle>Temat: {subject}</LessonTitle>
                <Content>
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
                </Content>
            </Wrapper>
        </UserTemplate>
    )
}

export default LessonView;