import React, { useEffect, useCallback, useState, useMemo } from 'react'
import styled from 'styled-components'
import anime from 'animejs/lib/anime.es.js'
import Editor from './Editor'
import Button from './Button'
import Label from './Label'
import request from '../lib/request'
import Tab from './Tab'
import { get } from 'lodash'
import AceEditor from 'react-ace'
import { runCode } from '../api/coding.api'

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
  border-radius: 0.2rem;
  background-color: #2f4858;
`

const StyledHeader = styled.div`
  height: 10%;

  display: flex;
  align-items: center;
`

const StyledTitle = styled.h2`
  color: #00d4ff;
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
  width: 57%;
`

const EditorModal = ({ toggleEditorModalHandler, currentQuestion }) => {
  const [code, setCode] = useState('')
  const [results, setResults] = useState('')
  const [loading, setLoading] = useState(false)

  const panels = useMemo(() => {
    console.log(results)
    return [
      {
        menuItem: 'Instructions',
        render: () => (
          <div
            dangerouslySetInnerHTML={{ __html: currentQuestion ? currentQuestion.description : '' }}
          ></div>
        ),
      },
      {
        menuItem: 'Output',
        render: () => (
          <div style={{ fontSize: 18 }}>
            <span>Time: {get(results, 'stats.duration', 0)} ms</span> &nbsp;
            <span>Passed: {get(results, 'stats.passes', 0)}</span> &nbsp;
            <span>Failed: {get(results, 'stats.failures', 0)}</span>
            <div>
              {get(results, 'stats.passPercent', 0) === 100 ? (
                <>
                  <p>Congratulations! All tests passed!</p>
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Button onClick={() => {
                      closeModalHandler()
                  }}>Continue</Button>
                </>
              ) : (
                <div className="output-editor">
                  {get(results, 'results.0.suites.0.tests', [])
                    .map(test => {
                      if (test.fail) {
                        return test.err.message
                      }
                      return null
                    })
                    .filter(test => test)
                    .join('\n')}
                  <AceEditor
                    value={get(results, 'results.0.suites.0.tests', [])
                      .map(test => {
                        if (test.fail) {
                          return test.err.message
                        }
                        return null
                      })
                      .filter(test => test)
                      .join('\n')}
                    showGutter={false}
                    readOnly={true}
                    maxLines={10}
                    showLineNumbers={false}
                  />
                </div>
              )}
            </div>
          </div>
        ),
      },
    ]
  }, [results, currentQuestion])

  const closeModalHandler = useCallback(() => {
    openAnimationHandler('reverse', () => {
      toggleEditorModalHandler(false)
    })
  }, [])

  const changeCodeHandler = useCallback(newValue => {
    setCode(newValue)
  }, [])

  const runCodeHandler = useCallback(async () => {
    setLoading(true)
    const result = await runCode({
      code,
      question: currentQuestion._id,
    })

    if (result && result.success) {
      setResults(result.results.data)
      document.querySelector('#Output').click()
    }
    setLoading(false)
  }, [code])

  const openAnimationHandler = useCallback((direction, callback) => {
    const timeline = anime.timeline({
      direction,
      easing: 'linear',
      complete: function(anim) {
        if (callback) callback()
      },
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
    if (currentQuestion) {
      // setCode(currentQuestion.coding)
      // console.log(currentQuestion.coding)
    }
  }, [currentQuestion])

  useEffect(() => {
    // return
    openAnimationHandler('normal')
  }, [])

  console.log(currentQuestion)

  return (
    <StyledWrapper>
      <StyledBg id="modal-bg" />
      <StyledModal id="editor-modal">
        <StyledHeader>
          <StyledTitle style={{ marginRight: '1rem' }}>
            {currentQuestion ? currentQuestion.title : ''}
          </StyledTitle>
          {/* <Label color="#fff" bgColor={'#00BE55'}>
            Solved
          </Label> */}
          <Button bgColor={'#FF5B31'} style={{ marginLeft: 'auto' }} onClick={closeModalHandler}>
            Skip
          </Button>
        </StyledHeader>
        <StyledBody>
          <StyledBodyLeft style={{ overflowY: 'auto' }}>
            <Tab panels={panels} />
          </StyledBodyLeft>

          <StyledBodyRight>
            <Editor onChange={changeCodeHandler} value={code} />
          </StyledBodyRight>
        </StyledBody>
        <StyledFooter>
          <Button loading={loading} bgColor={'#00ACFF'} style={{ marginLeft: 'auto' }} onClick={runCodeHandler}>
            Run
          </Button>
        </StyledFooter>
      </StyledModal>
    </StyledWrapper>
  )
}

export default EditorModal
