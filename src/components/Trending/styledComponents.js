import styled from 'styled-components'

export const Container = styled.div`
  color: ${props => props.color};
  text-decoration: none;
`
export const SideAndTrendContainer = styled.div`
  display: flex;
  flex-direction: row;
`
export const TrendingContainer = styled.div`
  width: 90vw;
  overflow-y: scroll;
  height: 91vh;
  margin: 0px;
  padding: 0px;
`

export const TrendingIconContainer = styled.div`
  display: flex;
  background-color: ${props => props.bgColor};
  flex-direction: row;
  align-items: center;
  height: 60px;
`
export const TrendingEachItemContainer = styled.ul`
  background-color: ${props => props.bgColor};
`
