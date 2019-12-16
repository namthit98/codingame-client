import React from 'react'
import styled from 'styled-components'

const StyledLabel = styled.span`
  border: 1px solid ${props => props.bgColor || '#7ccb34'};
  color: ${props => props.color || '#fff'};
  background-color: ${props => props.bgColor || 'transparent'};
  font-size: .8rem;
  border-radius: .5rem;
  padding: .5rem .8rem;
  text-transform: uppercase;
  letter-spacing: 2px;
`

const Label = ({children, ...props}) => {
  return (
    <StyledLabel {...props}>
      {children}
    </StyledLabel>
  )
}

export default Label
