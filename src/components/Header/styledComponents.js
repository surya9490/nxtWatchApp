import styled from 'styled-components'

export const HeaderContainer = styled.div`
  background-color: ${props => props.BgColor};
  height: 10vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-left: 4%;
  padding-right: 4%;
`

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

export const LogoImage = styled.img`
  height: 30px;
  width: 100px;
`

export const ProfileImage = styled.img`
  width: 30px;
  margin-left: 20px;
`

export const LogoutButton = styled.button`
  border: 1px solid #616e73;
  color: #3b82f6;
  margin-left: 20px;
  height: 25px;
  width: 60px;
`
export const PopupContainer = styled.div`
  background-color: ${props => props.BgColor};
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: ${props => props.color};
`

export const ConfirmButton = styled.button`
  height: 30px;
  width: 80px;
  margin-left: 20px;
  background-color: ${props => props.BgColor};
  color: ${props => props.color};
`

export const CancelButton = styled.button`
  height: 30px;
  width: 80px;
  margin-left: 20px;
  background-color: ${props => props.BgColor};
  color: ${props => props.color};
`

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
