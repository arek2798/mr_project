import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getLevelName, getLevelNumber } from '../../../helpers/levelHelper';
import Button from '../../components/Button/Button';
import NewLevelStars from './NewLevelStars.svg';
import { setNewLevelCardVisible } from '../../../actions';

const Wrapper = styled.div`
    width: 100%;
    text-align: center;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    background: #F3F6F9;
    overflow: hidden;
    padding: 0 10px;
`
const Laurels = styled.div`
    width: 425px;
    margin: 0 auto 40px;
    position: relative;
    padding-left: 23px;

    @media (max-width: 520px) {
        padding-left: 0px;

        & > img {
            width: 80%;
        }
    }
`
const LevelNumber = styled.p`
    position: relative;
    font-size: 64px;
    font-weight: 600;
    color: #F1B512;
    position: absolute;
    top: 60px;
    left: 49%;
    transform: translateX(-50%);

    @media (max-width: 520px) {
        left: 47%;
        top: 45px
    }
`
const NewLevelText = styled.p`
    font-size: 3.6rem;
    font-weight: 600;
    color: #F1B512;
`
const NewLevelName = styled.p`
    font-size: 3.6rem;
    font-weight: 600;
    color: #0068FF;
    margin-top: 30px;
    margin-bottom: 30px;
`

const NewLevelCard = ({ userStats, newLevelCardVisible, setNewLevelCardVisible }) => {

    useEffect(() => {
        return function cleanup() {
            if (newLevelCardVisible) {
                setNewLevelCardVisible(false);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleButton = () => {
        if (newLevelCardVisible) {
            setNewLevelCardVisible(false);
        }
    }

    return (
        <Wrapper>
            <Laurels>
                <img src={NewLevelStars} alt="" />
                <LevelNumber>{getLevelNumber(userStats.points, true)}</LevelNumber>
            </Laurels>
            <NewLevelText>Brawo!!<br /> Osiągnąłeś kolejny poziom!</NewLevelText>
            <NewLevelName>{getLevelName(userStats.points, true)}</NewLevelName>
            <Button onClick={handleButton}>Dalej</Button>
        </Wrapper>
    )
}

const mapStateToProps = ({ userStats, newLevelCardVisible }) => ({ userStats, newLevelCardVisible })

const mapDispatchToProps = (dispatch) => ({
    setNewLevelCardVisible: (value) => dispatch(setNewLevelCardVisible(value))
})

export default connect(mapStateToProps, mapDispatchToProps)(NewLevelCard);