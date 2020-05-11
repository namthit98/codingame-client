import React from 'react'
import styled from 'styled-components'
import menuBackgroundMp3 from './../../assets/mp3/ChocoboRacingCidsTestCourse-HoaTau-3316605.mp3'
import Audio from '../../components/Audio'

const StyledGameLevelContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: black;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 5rem;
  flex-direction: column;
`

const StyledLevelContainer = styled.div`
  width: 70%;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`

const StyledTitle = styled.h2`
  color: #7ccb34;
  font-size: 70px;
  padding-top: 100px;
`

const StyledLevel = styled.div`
  width: 200px;
  height: 200px;
  color: #fff;
  border: 1px solid #7ccb34;
  margin: 20px;
  font-size: 70px;
  transition: 0.4s;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #2a3a0b;
  }
`

const GameLevel = ({ onChooseLevel }) => {
  return (
    <StyledGameLevelContainer>
      <Audio src={menuBackgroundMp3} />
      <StyledTitle>Level</StyledTitle>
      <StyledLevelContainer>
        {[1, 2, 3, 4, 5, 6, 7, 8].map(el => {
          return <StyledLevel key={el} onClick={() => onChooseLevel(el)}>{el}</StyledLevel>
        })}
      </StyledLevelContainer>
    </StyledGameLevelContainer>
  )
}

export default GameLevel
