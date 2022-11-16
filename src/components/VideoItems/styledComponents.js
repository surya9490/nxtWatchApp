import styled from 'styled-components'

export const VideoEachItem = styled.li`
  display: flex;
  flex-direction: column;
  width: 100vw;
  margin-right: 20px;
  margin-bottom: 40px;
  color: ${props => props.color};
  @media screen and (min-width: 768px) {
    width: 25vw;
  }
`

export const ThumbnailImage = styled.img`
  width: 80vw;
  @media screen and (min-width: 768px) {
    width: 23vw;
  }
`

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 5px;
  width: 75vw;
  @media screen and (min-width: 768px) {
    width: 22vw;
  }
`

export const ChannelProfileImage = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 10px;
`
export const VideoInfo = styled.p`
  margin: 0px;
  font-family: 'Roboto';
`

export const CountContainer = styled.div`
  display: flex;
  flex-direction: row;
`
