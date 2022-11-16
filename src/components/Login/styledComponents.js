import styled from 'styled-components'

export const BgContainer = styled.div`
  background-color: ${props => props.bgColor};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: ${props => props.height};
  width: ${props => props.width};
`
export const FormContainer = styled.form`
  background-color: ${props => props.bgColor};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: ${props => props.height};
  width: ${props => props.width};
`

export const LogoImage = styled.img`
  height: 40px;
  width: 140px;
  margin-bottom: 20px;
`

export const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
`
export const LabelItems = styled.label`
  margin-bottom: 4px;
  font-family: 'Roboto';
`
export const InputItems = styled.input`
  padding: 5px;
  margin-bottom: ${props => props.marginBottom};
  border: 1px solid #94a3b8;
  border-radius: 2px;
  width: 200px;
`
export const ShowPassword = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 10px;
  font-size: 14px;
`

export const LoginButton = styled.button`
  width: 200px;
  height: 25px;
  background-color: #3b82f6;
  border: none;
  border-radius: 4px;
  color: #ffffff;
`
