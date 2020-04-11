import React, { useRef, useEffect, useCallback } from 'react'
import { shuffle, random } from 'lodash'
import { Engine, Render, Runner, World, Bodies, Body, Events } from 'matter-js'
import styled from 'styled-components'
import soccerBall from './../../assets/SoccerBall.png'

const StyledGameScene = styled.div`
  height: 100vh;
  width: 100vw;
`

let engine
let world
let render
let isControl

const GameScene = ({ questions, cellsHorizontal, cellsVertical, isWin, setIsWin, open, toggleEditorModalHandler }) => {
  const sceneRef = useRef()

  const width = window.innerWidth
  const height = window.innerHeight

  const unitLengthX = width / cellsHorizontal
  const unitLengthY = height / cellsVertical

  isControl = !open

  const renderWalls = () => {
    // Walls
    const walls = [
      Bodies.rectangle(width / 2, 0, width, 2, { isStatic: true }),
      Bodies.rectangle(width / 2, height, width, 2, { isStatic: true }),
      Bodies.rectangle(0, height / 2, 2, height, { isStatic: true }),
      Bodies.rectangle(width, height / 2, 2, height, { isStatic: true }),
    ]
    World.add(world, walls)
  }

  const renderGoal = () => {
    const goal = Bodies.rectangle(
      width - unitLengthX / 2,
      height - unitLengthY / 2,
      unitLengthX * 0.7,
      unitLengthY * 0.7,
      {
        label: 'goal',
        isStatic: true,
        render: {
          fillStyle: 'green',
        },
      },
    )
    World.add(world, goal)
  }

  const renderBallAndSetupEvent = useCallback(() => {
    const ballRadius = Math.min(unitLengthX, unitLengthY) / 4
    const ball = Bodies.circle(unitLengthX / 2, unitLengthY / 2, ballRadius, {
      label: 'ball',
      render: {
        sprite: {
          texture: soccerBall,
          xScale: ballRadius / 55,
          yScale: ballRadius / 55,
        },
      },
    })
    World.add(world, ball)

    document.addEventListener('keydown', event => {
      if(!isControl) return

      const { x, y } = ball.velocity

      if (event.keyCode === 87) {
        // Body.applyForce( ball, {x, y}, {x: 0, y: -.07});
        Body.setVelocity(ball, { x, y: y - 10 })
      }

      if (event.keyCode === 68) {
        Body.setVelocity(ball, { x: x + 5, y })
        // Body.applyForce( ball, {x, y}, {x: .07, y: 0});
      }

      if (event.keyCode === 83) {
        // Body.applyForce( ball, {x, y}, {x: 0, y: .07});
        Body.setVelocity(ball, { x, y: y + 10 })
      }

      if (event.keyCode === 65) {
        Body.setVelocity(ball, { x: x - 5, y })
        // Body.applyForce( ball, {x: ball.position.x, y: ball.position.y}, {x: -.07, y: 0});
      }
    })
  }, [open])

  const renderLine = () => {
    const grid = Array(cellsVertical)
      .fill(null)
      .map(() => Array(cellsHorizontal).fill(false))

    const verticals = Array(cellsVertical)
      .fill(null)
      .map(() => Array(cellsHorizontal - 1).fill(false))

    const horizontals = Array(cellsVertical - 1)
      .fill(null)
      .map(() => Array(cellsHorizontal).fill(false))

    const startRow = random(0, cellsVertical - 1)
    const startColumn = random(0, cellsHorizontal - 1)

    const stepThroughCell = (row, column) => {
      // If I have visited the cell at [row, column], then return
      if (grid[row][column] == true) return

      // Mark this cell as being visited
      grid[row][column] = true

      // Assemble randomly-ordered list of neighbors
      const neighbors = shuffle([
        [row - 1, column, 'up'],
        [row, column + 1, 'right'],
        [row + 1, column, 'down'],
        [row, column - 1, 'left'],
      ])

      // For each neighbors ...
      for (let neighbor of neighbors) {
        const [nextRow, nextColumn, direction] = neighbor

        // See if neighbors is out of bound
        if (
          nextRow < 0 ||
          nextRow >= cellsVertical ||
          nextColumn < 0 ||
          nextColumn >= cellsHorizontal
        ) {
          continue
        }

        // If we have visited that neighbor, continue to next neighbor
        if (grid[nextRow][nextColumn]) {
          continue
        }

        // Remove a wall from either horizontals or verticals
        if (direction === 'left') {
          verticals[row][column - 1] = true
        } else if (direction === 'right') {
          verticals[row][column] = true
        } else if (direction === 'up') {
          horizontals[row - 1][column] = true
        } else if (direction === 'down') {
          horizontals[row][column] = true
        }

        // Visit that next cell
        stepThroughCell(nextRow, nextColumn)
      }
    }

    stepThroughCell(startRow, startColumn)

    horizontals.forEach((row, rowIndex) => {
      row.forEach((open, columnIndex) => {
        if (open === true) {
          return
        }

        const wall = Bodies.rectangle(
          columnIndex * unitLengthX + unitLengthX / 2,
          rowIndex * unitLengthY + unitLengthY,
          unitLengthX,
          5,
          {
            label: 'wall',
            isStatic: true,
            render: {
              fillStyle: 'red',
            },
          },
        )

        World.add(world, wall)
      })
    })

    verticals.forEach((row, rowIndex) => {
      row.forEach((open, columnIndex) => {
        if (open) {
          return
        }

        const wall = Bodies.rectangle(
          columnIndex * unitLengthX + unitLengthX,
          rowIndex * unitLengthY + unitLengthY / 2,
          5,
          unitLengthY,
          {
            label: 'wall',
            isStatic: true,
            render: {
              fillStyle: 'red',
            },
          },
        )

        World.add(world, wall)
      })
    })
  }

  const renderCheckpoint = () => {
    const ballRadius = Math.min(unitLengthX, unitLengthY) / 3

    questions.forEach(question => {
      let x = random(1, cellsHorizontal - 1)
      let y = random(1, cellsVertical - 1)
      const colorArr = {
        easy: 'green',
        medium: 'yellow',
        hard: 'red',
      }

      while (x === 0 || (y === cellsVertical - 1 && x === cellsHorizontal - 1)) {
        x = random(1, cellsHorizontal - 1)
        y = random(1, cellsVertical - 1)
      }

      const checkpoint = Bodies.circle(
        x * unitLengthX + unitLengthX / 2,
        y * unitLengthY + unitLengthY / 2,
        ballRadius,
        {
          id: question.id,
          label: 'checkpoint',
          render: {
            isStatic: true,
            fillStyle: colorArr[question.difficult],
          },
        },
      )

      Events.on(engine, 'beforeUpdate', function() {
        var gravity = engine.world.gravity

        if (true) {
          Body.applyForce(checkpoint, checkpoint.position, {
            x: -gravity.x * gravity.scale * checkpoint.mass,
            y: -gravity.y * gravity.scale * checkpoint.mass,
          })
        }
      })

      World.add(world, checkpoint)
    })
  }

  const checkDoExercise = collision => {
    const labels = ['ball', 'checkpoint']

    if (
      labels.includes(collision.bodyA.label) &&
      labels.includes(collision.bodyB.label) &&
      collision.bodyA.label !== collision.bodyB.label
    ) {
      const questionId = collision.bodyB.id
      toggleEditorModalHandler(true)
      alert(questionId)

      World.remove(world, collision.bodyB)
    }
  }

  const checkWin = collision => {
    const labels = ['ball', 'goal']

    if (labels.includes(collision.bodyA.label) && labels.includes(collision.bodyB.label)) {
      // Remove all question
      const deletedObj = []

      world.bodies.forEach(body => {
        if (body.label === 'checkpoint') {
          deletedObj.push(body)
        }
      })

      deletedObj.forEach(obj => World.remove(world, obj))

      world.bodies.forEach(body => {
        if (body.label === 'wall') {
          Body.setStatic(body, false)
        }
      })

      Events.off(engine, 'collisionStart')
      setIsWin(true)
    }
  }

  const checkCodition = () => {
    // Win condition
    Events.on(engine, 'collisionStart', event => {
      console.log('okiiii')
      event.pairs.forEach(collision => {
        checkWin(collision)
        checkDoExercise(collision)
      })
    })
  }

  const startGame = () => {
    engine = Engine.create()
    world = engine.world

    render = Render.create({
      element: sceneRef.current,
      engine,
      options: {
        wireframes: false,
        width,
        height,
      },
    })
    Render.run(render)
    Runner.run(Runner.create(), engine)

    renderWalls()

    renderLine()

    renderGoal()

    renderCheckpoint()

    renderBallAndSetupEvent()

    checkCodition()
  }

  const resetGame = () => {
    World.clear(engine.world)
    Engine.clear(engine)
    Runner.stop(render)
    render.canvas.remove()
  }

  useEffect(() => {
    if (sceneRef === null) return

    startGame()
  }, [])

  return (
    <>
      <StyledGameScene id="game-view" ref={sceneRef}></StyledGameScene>
    </>
  )
}

export default GameScene
