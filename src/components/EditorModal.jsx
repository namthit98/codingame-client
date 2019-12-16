import React, { useEffect, useCallback } from 'react'
import styled from 'styled-components'
import anime from 'animejs/lib/anime.es.js'
import Editor from './Editor'
import Button from './Button'
import Label from './Label'

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
  height: 100%;
  z-index: -1;
  background: rgba(0, 0, 0, 0.8);
`

const StyledModal = styled.div`
  width: 70%;
  height: 80%;
  dislay: flex;
  flex-direction: column;
  padding: 0 2rem 2rem 2rem;
  border-radius: .2rem;
  background-color: #2F4858;
`

const StyledHeader = styled.div`
  height: 10%;

  display: flex;
  align-items: center;
`

const StyledTitle = styled.h2`
  color: #00D4FF;
  // color: #FF5B31;
  font-size: 2.5rem;
`

const StyledBody = styled.div`
  height: 80%;
  display: flex;
  justify-content: space-between;
`

const StyledFooter = styled.div`
  height: 10%;

  display: flex;
  align-items: center;
`

const StyledBodyLeft = styled.div`
color: #fff;
  width: 40%;
`

const StyledBodyRight = styled.div`
  width: 57%
`

const EditorModal = ({toggleEditorModalHandler}) => {
  const closeModalHandler = useCallback(() => {
    openAnimationHandler('reverse', () => {
      toggleEditorModalHandler(false)
    })
  }, [])

  const runCodeHandler = useCallback(() => {
    console.log('hello');
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
      <StyledModal id="editor-modal">
        <StyledHeader>
          <StyledTitle style={{ marginRight: '1rem' }}>Calculate sum of two number</StyledTitle>
          <Label color="#fff" bgColor={'#00BE55'}>Solved</Label>
          <Button bgColor={'#FF5B31'} style={{ marginLeft: 'auto' }} onClick={closeModalHandler}>Skip</Button>
        </StyledHeader>
        <StyledBody>
          <StyledBodyLeft>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore doloremque velit laboriosam incidunt tenetur soluta magnam mollitia rerum. Ducimus veniam minus asperiores voluptatibus voluptatem tempore perferendis modi fugit reprehenderit earum.
          </StyledBodyLeft>

          <StyledBodyRight>
            <Editor />
          </StyledBodyRight>
        </StyledBody>
        <StyledFooter>
          <Button bgColor={'#00ACFF'} style={{marginLeft: 'auto'}} onClick={runCodeHandler}>Run</Button>
        </StyledFooter>
      </StyledModal>
    </StyledWrapper>
  )
}

export default EditorModal
