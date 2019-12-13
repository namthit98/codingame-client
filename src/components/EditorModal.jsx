import React, { useEffect, useCallback } from 'react'
import styled from 'styled-components'
import anime from 'animejs/lib/anime.es.js'

const StyledWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 100;
  background: transparent;

  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledBg = styled.div`
  position: absolute;
  transform-origin: 50% 50%;
  width: 100%;
  z-index: -1;
  background: rgba(0, 0, 0, 0.5);
`

const StyledModal = styled.div`
  width: 70%;
  height: 80%;
  background: #fff;
`

const EditorModal = ({toggleEditorModalHandler}) => {
  const closeModalHandler = useCallback(() => {
    openAnimationHandler('reverse', () => {
      toggleEditorModalHandler(false)
    })
  }, [])

  const openAnimationHandler = useCallback((direction, callback) => {
    const timeline = anime.timeline({
      direction,
      easing: 'linear',
      complete: function(anim) {
        if(callback) callback()
      }
    })

    timeline.add({
      targets: '#modal-bg',
      scaleX: [0, 1],
      duration: 600,
    })

    timeline.add({
      targets: '#modal-bg',
      height: ['.5%', '100%'],
      duration: 600,
      easing: 'easeInOutExpo',
    })

    timeline.add({
      targets: '#editor-modal',
      scale: [0, 1],
      opacity: [0, 1],
      duration: 400,
      easing: 'linear',
    })
  }, [])

  useEffect(() => {
    openAnimationHandler('normal')
  }, [])

  return (
    <StyledWrapper>
      <StyledBg id="modal-bg" />
      <StyledModal id="editor-modal" onClick={closeModalHandler}>
        Hello
      </StyledModal>
    </StyledWrapper>
  )
}

export default EditorModal
