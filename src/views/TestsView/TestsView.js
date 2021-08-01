import React from 'react';
import ViewHeader from '../../components/components/ViewHeader/ViewHeader';
import styled from 'styled-components';
import UserTemplate from '../../templates/UserTemplate';
import { useEffect } from 'react';
import { getAllTests } from '../../actions';
import { connect } from 'react-redux';
import TestsList from '../../components/components/TestsList/TestsList';

const Wrapper = styled.div`
    height: 800px;
    width: 100%;
`

const TestsView = ({ userID, tests, getAllTests }) => {
    useEffect(() => {
        if (userID) {
            getAllTests();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userID])

    return (
        <UserTemplate verticalCenter={true}>
            <Wrapper>
                <ViewHeader>
                    <h3>Sprawdź ile już potrafisz</h3>
                    <p>Ukończono: 0 / {tests.length} testy</p>
                </ViewHeader>
                <TestsList tests={tests} />
            </Wrapper>
        </UserTemplate>
    )
}

const mapStateToProps = ({ userID, tests }) => ({ userID, tests })

const mapDispatchToProps = (dispatch) => ({
    getAllTests: () => dispatch(getAllTests())
})

export default connect(mapStateToProps, mapDispatchToProps)(TestsView);