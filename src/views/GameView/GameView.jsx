import React, { useState, useCallback, useEffect } from 'react'
import GameScene from './GameScene'
import MenuScene from './MenuScene'
import EditorModal from '../../components/EditorModal'
import GameLevel from './GameLevel'
import { listQuestions } from '../../api/question.api'
import { shuffle } from 'lodash'

const GameView = () => {
  const [questions, setQuestions] = useState([
    { id: Math.random() * 1000, title: 'Test 1', difficult: 'easy' },
    { id: Math.random() * 1000, title: 'Test 2', difficult: 'medium' },
    { id: Math.random() * 1000, title: 'Test 3', difficult: 'hard' },
  ])
  const [gameView, setGameView] = useState('menu')
  const [isLoading, setIsLoading] = useState(true)
  const [cellsHorizontal, setCellsHorizontal] = useState(8)
  const [cellsVertical, setCellsVertical] = useState(6)
  const [isWin, setIsWin] = useState(false)
  const [open, setOpen] = useState(false)
  const [isPause, setIsPause] = useState(false)
  const [currentLevel, setCurrentLevel] = useState(null)
  const [currentQuestion, setCurrentQuestion] = useState(null)

  const handleChooseLevel = level => {
    setGameView('game')
    if (level > 3) {
      setCellsHorizontal(11)
      setCellsVertical(8)
    }

    if (level > 6) {
      setCellsHorizontal(15)
      setCellsVertical(12)
    }

    setCurrentLevel(level)
  }

  const startGameHandler = useCallback(() => {
    //TODO // toggleEditorModalHandler(true)
    setGameView('level')
  }, [])

  const goToMenuHandler = useCallback(() => {
    setGameView('menu')
  }, [])

  const toggleEditorModalHandler = useCallback(state => {
    setOpen(state)
  }, [])

  const fetchQuestions = async () => {
    const result = await listQuestions({
      status: 1,
    })

    if (result && result.success) {
      setQuestions(result.data.map(el => ({
        ...el,
        iid: Math.floor(Math.random() * 10000)
      })))
    }
  }

  useEffect(() => {
    fetchQuestions()
  }, [])

  return (
    <>
      {gameView === 'level' && <GameLevel onChooseLevel={handleChooseLevel} />}

      {gameView === 'menu' && <MenuScene animate={true} startGame={startGameHandler} />}

      {gameView === 'game' && (
        <>
          {open && (
            <EditorModal
              currentQuestion={questions.find(el => el.iid === currentQuestion)}
              toggleEditorModalHandler={toggleEditorModalHandler}
            />
          )}
          <GameScene
            currentLevel={currentLevel}
            handleChooseQuestion={id => setCurrentQuestion(id)}
            questions={shuffle(questions).slice(0, currentLevel + 3)}
            cellsHorizontal={cellsHorizontal}
            cellsVertical={cellsVertical}
            goToMenu={goToMenuHandler}
            isWin={isWin}
            setIsWin={setIsWin}
            open={open}
            toggleEditorModalHandler={toggleEditorModalHandler}
          />
        </>
      )}

      {/* {isWin && (
        <div className="winner">
          <h1>You Win!</h1>
        </div>
      )} */}
    </>
  )
}

export default GameView
