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
`

export const TrendIconContainer = styled.div`
  display: flex;
  background-color: ${props => props.bgColor};
  flex-direction: row;
  align-items: center;
  height: 60px;
`

export const GamingList = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  text-decoration: none;
`

export const GamingItem = styled.li`
  height: 280px;
  width: 170px;
  margin: 20px;
  text-decoration: none;
`

export const GamingImage = styled.img`
  height: 240px;
  width: 170px;
`

export const GamingDetails = styled.p`
  font-size: ${props => props.size};
  margin: 0px;
  padding-top: 4px;
`
