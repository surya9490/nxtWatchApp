import styled from 'styled-components'

export const Container = styled.div`
  height: 100vh;
`

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: ${props => props.color};
  @media screen and (min-width: 768px) {
    flex-direction: row;
  }
`

export const LogoImage = styled.img`
  height: 30px;
  width: 100px;
`

export const BannerImage = styled.div`
  background-image: ${props => `url(${props.imgUrl})`};
  height: 100px;
  width: 250px;
  @media screen and (min-width: 768px) {
    height: 150px;
    width: 600px;
  }
`

export const BannerContainer = styled.div`
  display: ${props => props.display};
  flex-direction: row;
  background-color: white;
  padding: 10px;
  @media screen and (min-width: 768px) {
    padding: 20px;
  }
`

export const BannerInfo = styled.p`
  width: 100px;
  font-size: 10px;
  @media screen and (min-width: 768px) {
    width: 200px;
  }
`
export const BannerButton = styled.button`
  height: 20px;
  width: 20px;
  border: none;
  display: ${props => props.display};
`

export const Input = styled.input`
  padding: 5px;
  border: none;
  border-radius: 4px;
  border: ${props => props.color};
`

export const VideosContainer = styled.div`
  background-color: ${props => props.bgColor};
  padding: 20px;
  overflow: auto;
`
export const UnorderedVideos = styled.ul`
  list-style-type: none;
  padding-left: 0px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`
export const SearchResultsContainer = styled.div`
  width: 80vw;
`

export const RetryImage = styled.img`
  width: 40vw;
`
export const ApiResultsContainer = styled.div`
  text-decoration: none;
  height: 90vh;
  overflow-y: scroll;
  background-color: ${props => props.bgColor};
`
