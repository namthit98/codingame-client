import React from 'react'
import styled from 'styled-components'
import Button from '../../components/Button.jsx'

const StyledFormLoginWrapper = styled.form`
  width: 400px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
`

const StyledInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  color: #fff;
  margin-bottom: 30px;

  & > label {
    font-size: 20px;
    margin-bottom: 5px;
  }

  & > input {
    border: 1px solid #7ccb34;
    border-radius: 5px;
    font-size: 18px;
    padding: 10px;
    outline: none;
    background: none;
    color: #fff;
  }
`

const FormLogin = () => {
  return (
    <StyledFormLoginWrapper>
      <StyledInputWrapper>
        <label>Email</label>
        <input type="text" name="email" placeholder="Email" />
      </StyledInputWrapper>

      <StyledInputWrapper>
        <label>Password</label>
        <input type="password" name="password" placeholder="Password" />
      </StyledInputWrapper>

      <Button type="button">Login</Button>
    </StyledFormLoginWrapper>
  )
}

export default FormLogin
