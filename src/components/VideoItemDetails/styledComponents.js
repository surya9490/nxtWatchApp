import styled from 'styled-components'

export const Container = styled.div`
  color: ${props => props.color};
`
export const SideAndTrendContainer = styled.div`
  display: flex;
  flex-direction: row;
`
export const TrendingContainer = styled.div`
  width: 90vw;
  overflow-y: scroll;
  height: 91vh;
  background-color: ${props => props.bgColor};
  padding: 30px;
  display: flex;
  flex-direction: column;
`
export const Buttons = styled.button`
  background-color={props=>props.bgColor};
  border:none;
`

export const LikeInfo = styled.button`
  color: ${props => props.color};
`

export const DislikeInfo = styled.button`
  color: ${props => props.color};
`
