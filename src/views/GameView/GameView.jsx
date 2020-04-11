import React, { useState, useCallback } from 'react'
import GameScene from './GameScene'
import MenuScene from './MenuScene'
import EditorModal from '../../components/EditorModal'

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

  const startGameHandler = useCallback(() => {
    //TODO // toggleEditorModalHandler(true)
    setGameView('game')
  }, [])

  const goToMenuHandler = useCallback(() => {
    setGameView('menu')
  }, [])

  const toggleEditorModalHandler = useCallback((state) => {
    setOpen(state)
  }, [])

  return (
    <>
      {gameView === 'menu' && <MenuScene animate={true} startGame={startGameHandler} />}

      {gameView === 'game' && (
        <>
          {open && <EditorModal toggleEditorModalHandler={toggleEditorModalHandler} />}
          <GameScene
            questions={questions}
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
