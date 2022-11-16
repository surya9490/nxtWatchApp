import styled from 'styled-components'

export const SavedItem = styled.li`
  display: flex;
  flex-direction: row;
  margin: 20px;
  color: ${props => props.color};
`

export const SavedImage = styled.img`
  height: 150px;
  width: 300px;
`

export const SavedDetails = styled.p`
  font-size: ${props => props.size};
  margin: 0px;
  padding-top: 4px;
  margin-left: 20px;
`
