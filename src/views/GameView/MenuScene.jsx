import React, { useEffect } from 'react'
import anime from 'animejs/lib/anime.es.js'
import Logo from '../../components/Logo'
import styled from 'styled-components'
import Menu from '../../components/Menu'
import menuBackgroundMp3 from './../../assets/mp3/ChocoboRacingCidsTestCourse-HoaTau-3316605.mp3'
import Audio from '../../components/Audio'

const StyledMenuScene = styled.div`
  width: 100vw;
  height: 100vh;
  background: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 5rem;
`

const MenuScene = ({ animate, startGame }) => {
  useEffect(() => {
    if (!animate) {
      return
    }

    const timeline = anime.timeline()

    timeline.add({
      targets: '#logo path',
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeInOutSine',
      delay: function(el, i) {
        return i * 50
      },
      direction: 'normal',
    })

    timeline.add({
      duration: 500,
      targets: '#logo',
      translateY: '-4rem',
      scale: 1.3,
      easing: 'easeInOutQuint',
      begin: function(anim) {
        anime({
          targets: '#menu button',
          translateX: [-700, 0],
          opacity: [0, 1],
          // direction: 'reverse',
          delay: anime.stagger(100),
        })
      },
    })
  }, [])

  return (
    <StyledMenuScene>
      <Audio src={menuBackgroundMp3} />
      <Logo id="logo" />
      <Menu id="menu" animate={animate} startGame={startGame} />
    </StyledMenuScene>
  )
}

export default MenuScene
