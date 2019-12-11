import React, { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@material-ui/core'
import GameScene from './GameScene'
import MenuScene from './MenuScene'

const GameView = () => {
  const [questions, setQuestions] = useState([
    { id: Math.random() * 1000, title: 'Test 1', difficult: 'easy' },
    { id: Math.random() * 1000, title: 'Test 2', difficult: 'medium' },
    { id: Math.random() * 1000, title: 'Test 3', difficult: 'hard' },
  ])
  const [cellsHorizontal, setCellsHorizontal] = useState(6)
  const [cellsVertical, setCellsVertical] = useState(4)
  const [isWin, setIsWin] = useState(false)
  const [open, setOpen] = useState(false)
  const [isPause, setIsPause] = useState(false)

  // const handleClickOpen = () => {
  //   setIsWind(true)
  // }

  // const handleClose = () => {
  //   setIsWin(false)
  // }

  return (
    <>
      <MenuScene animate={true} />
      {/* {isWin && (
        <div className="winner">
          <h1>You Win!</h1>
        </div>
      )}
      <GameScene
        questions={questions}
        cellsHorizontal={cellsHorizontal}
        cellsVertical={cellsVertical}
        isWin={isWin}
        setIsWin={setIsWin}
        // handleClickOpen={handleClickOpen}
        // isPause={isPause}
      /> */}
    </>
  )
}

export default GameView
