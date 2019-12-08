import React, { useState } from 'react'
import GameScene from './GameScene'

const GameView = () => {
  const [questions, setQuestions] = useState([
    { id: Math.random() * 1000, title: 'Test 1', difficult: 'easy' },
    { id: Math.random() * 1000, title: 'Test 2', difficult: 'medium' },
    { id: Math.random() * 1000, title: 'Test 3', difficult: 'hard' },
  ])
  const [cellsHorizontal, setCellsHorizontal] = useState(6)
  const [cellsVertical, setCellsVertical] = useState(5)
  const [isWin, setIsWin] = useState(false)

  return (
    <>
      {isWin && <div className="winner">
        <h1>You Win!</h1>
      </div>}
      <GameScene
        questions={questions}
        cellsHorizontal={cellsHorizontal}
        cellsVertical={cellsVertical}
        isWin={isWin}
        setIsWin={setIsWin}
      />
    </>
  )
}

export default GameView
