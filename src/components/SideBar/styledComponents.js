import styled from 'styled-components'

export const TypeContainer = styled.ul`
  list-style-type: none;
  margin: 0px;
  padding: 0px;
  padding-left: 10px;
  flex-shrink: 0;
`
export const TypeButton = styled.button`
  background: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  border: none;
`

export const TypeInfo = styled.p`
  margin: 4px;
  padding-left: 5px;
  color: ${props => props.color};
`

export const TypesContainer = styled.div`
  background-color: ${props => props.bgColor};

  @media screen and (min-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 200px;
    height: 90vh;
    padding-right: 20px;
  }
`
export const Logos = styled.img`
  height: 20px;
  width: 20px;
  margin-right: 5px;
`
export const ContactUsContainer = styled.div`
  padding-left: 20px;
`
