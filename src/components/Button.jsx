import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
  outline: none;
  border: 1px solid ${props => props.bgColor || '#7ccb34'};
  background: none;
  padding: 1rem 1.5rem;
  font-size: 1.5rem;
  border-radius: 1.8rem;
  color: ${props => props.color || '#fff'};
  background-color: ${props => props.bgColor || 'transparent'};
  text-transform: uppercase;
  letter-spacing: 2px;
  position: relative;
  cursor: pointer;

  &::after {
    content: ' ';
    position: absolute;
    top: 0;
    left: 0;
    background-color: transparent;
    border: 1px solid ${props => props.bgColor || '#7ccb34'};
    border-radius: 1.8rem;
    width: 100%;
    height: 100%;
    opacity: 1;
    transition: .4s ease;
  }

  &:hover::after {
    opacity: 0;
    transform: scale(1.5);
    background-color: ${props => props.bgColor || 'transparent'};
  }
`

const Button = ({ children, ...props}) => {
  return <StyledButton {...props} >{children}</StyledButton>
}

export default Button
