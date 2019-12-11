import React from 'react'
import styled from 'styled-components'

const StyledMenu = styled.div`
  width: 35%;
  height: 25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  margin-top: 2rem;

  span {
    display: block;
    padding: 1rem 5rem;
  }

  span::before,
  span::after {
    content: '';
    width: 0.2rem;
    height: 0;
    position: absolute;
    transition: all 0.1s linear;
    background: #7ccb34;
  }

  button {
    display: inline-block;
    position: relative;
    font-size: 3rem;
    border: 1px solid transparent;
    outline: none;
    background: none;
    color: #fff;
    opacity: ${props => props.animate ? 0 : 1};
  }

  button::before,
  button::after {
    content: '';
    width: 0;
    height: 2px;
    position: absolute;
    transition: all 0.1s linear;
    background: #7ccb34;
  }

  button:hover::before,
  button:hover::after {
    width: 100%;
  }

  button:hover span::before,
  button:hover span::after {
    height: 100%;
  }

  button::before {
    left: 50%;
    top: 0;
    transition-duration: 0.4s;
  }
  button::after {
    left: 50%;
    bottom: 0;
    transition-duration: 0.4s;
  }
  button span::before {
    left: 0;
    top: 50%;
    transition-duration: 0.4s;
  }
  button span::after {
    right: 0;
    top: 50%;
    transition-duration: 0.4s;
  }
  button:hover::before,
  button:hover::after {
    left: 0;
  }
  button:hover span::before,
  button:hover span::after {
    top: 0;
  }
`

const Menu = ({ id, animate }) => {
  return (
    <StyledMenu id={id || 'menu'} animate={animate}>
      <button>
        <span>Start Game </span>
      </button>
      <button>
        <span>Ranking</span>
      </button>
      <button>
        <span>Score</span>
      </button>
    </StyledMenu>
  )
}

export default Menu
