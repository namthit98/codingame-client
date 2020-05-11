import React, { useState } from 'react'
import styled from 'styled-components'

const TabWrapper = styled.div`
  width: 100%;
  height: auto;
`

const StyledHeading = styled.div`
  width: 100%;
  margin-bottom: 1rem;
`

const StyledHeadingItem = styled.span`
  font-size: 1.8rem;
  margin-right: 2rem;
  transition: .2s ease;
  cursor: pointer;

  &.active {
    color: #FF5B31
  }
`

const Tab = ({ panels }) => {
  const [indexPanel, setIndexPanel] = useState(0)

  const handleChangePanel = (index) => {
    setIndexPanel(index)
  }

  return (
    <TabWrapper>
      <StyledHeading>
        {panels.map((panel, index) => (
          <StyledHeadingItem id={panel.menuItem} key={index} className={indexPanel === index ? "active" : ""} onClick={() => handleChangePanel(index)}>{panel.menuItem}</StyledHeadingItem>
        ))}
      </StyledHeading>
      <div className="content">
        {panels[indexPanel].render()}
      </div>
    </TabWrapper>
  )
}

export default Tab
