import React from 'react'
import styled from 'styled-components'


const StyledWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: #000;
`

const StyledLoading = styled.div`
  position:absolute;
  width:600px;
  height:36px;
  left:50%;
  top:40%;
  margin-left:-300px;
  overflow:visible;
  user-select:none;
  cursor:default;

  div {
    position:absolute;
    width:20px;
    height:36px;
    opacity:0;
    font-family:Helvetica, Arial, sans-serif;
    animation:move 2s linear infinite;
    transform:rotate(180deg);
    color:#7ccb34;
    font-size: 2.5rem;
  }

  div:nth-child(2) {
    animation-delay:0.2s;
  }
  div:nth-child(3) {
    animation-delay:0.4s;
  }
  div:nth-child(4) {
    animation-delay:0.6s;
  }
  div:nth-child(5) {
    animation-delay:0.8s;
  }
  div:nth-child(6) {
    animation-delay:1s;
  }
  div:nth-child(7) {
    animation-delay:1.2s;
  }

  @keyframes move {
    0% {
      left:0;
      opacity:0;
    }
    35% {
      left: 41%;
      transform:rotate(0deg);
      opacity:1;
    }
    65% {
      left:59%;
      transform:rotate(0deg);
      opacity:1;
    }
    100% {
      left:100%;
      transform:rotate(-180deg);
      opacity:0;
    }
  }
`

const Loading = () => {
  return (
    <StyledWrapper>
      <StyledLoading id="loading">
        <div>G</div>
        <div>N</div>
        <div>I</div>
        <div>D</div>
        <div>A</div>
        <div>O</div>
        <div>L</div>
      </StyledLoading>
    </StyledWrapper>
  )
}

export default Loading
