import React from 'react';
import ViewHeader from '../../components/components/ViewHeader/ViewHeader';
import styled from 'styled-components';
import UserTemplate from '../../templates/UserTemplate';
import { useEffect } from 'react';
import { getAllTests } from '../../actions';
import { connect } from 'react-redux';
import TestsList from '../../components/components/TestsList/TestsList';

const Wrapper = styled.div`
    height: 100%;
    width: 100%;

    & > p {
        margin-top: 30px;

        a {
            color: #0068FF;
        }
    }
`

const TestsView = ({ userID, tests, getAllTests, userStats }) => {
    useEffect(() => {
        if (userID) {
            getAllTests();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userID])

    const countFinishedTests = () => {
        let finishedTestNum = 0;
        userStats.testsStats.forEach(stats => stats.maksScore === 100 && finishedTestNum++);
        return finishedTestNum;
    }

    return (
        <UserTemplate verticalCenter={true}>
            <Wrapper>
                <ViewHeader>
                    <h3>Sprawdź ile już potrafisz</h3>
                    <p>Ukończono: {userStats.testsStats && countFinishedTests()} / {tests.length} testy</p>
                </ViewHeader>
                <TestsList tests={tests} />
                <p>Pytania pochądzą ze strony: <a href="https://kartarowerowa.net.pl/" target="_blank" rel="noreferrer">https://kartarowerowa.net.pl/</a></p>
            </Wrapper>
        </UserTemplate>
    )
}

const mapStateToProps = ({ userID, tests, userStats }) => ({ userID, tests, userStats })

const mapDispatchToProps = (dispatch) => ({
    getAllTests: () => dispatch(getAllTests())
})

export default connect(mapStateToProps, mapDispatchToProps)(TestsView);