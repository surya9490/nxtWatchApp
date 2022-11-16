import styled from 'styled-components'

export const Container = styled.div`
  height: 100vh;
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
  color: ${props => props.color};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
