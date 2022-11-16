import {Link} from 'react-router-dom'

import {AiFillHome, AiOutlineArrowDown} from 'react-icons/ai'
import {BiTrendingDown} from 'react-icons/bi'
import {IoLogoGameControllerB} from 'react-icons/io'
import NxtWatchContext from '../../context/NxtWatchContext'

import {
  TypeContainer,
  TypeButton,
  TypeInfo,
  TypesContainer,
  Logos,
  ContactUsContainer,
} from './styledComponents'

const SideBar = () => (
  <NxtWatchContext.Consumer>
    {value => {
      const {backgroundTheme, isDark} = value
      const result = backgroundTheme === 'black' ? '#181818' : 'white'
      const Fontcolor = isDark ? 'white' : 'black'
      return (
        <TypesContainer bgColor={result} color={Fontcolor}>
          <TypeContainer>
            <Link to="/" style={{textDecoration: 'none'}}>
              <li>
                <TypeButton type="button">
                  <AiFillHome style={{color: Fontcolor}} />
                  <TypeInfo color={Fontcolor}>Home</TypeInfo>
                </TypeButton>
              </li>
            </Link>
            <Link to="/trending" style={{textDecoration: 'none'}}>
              <li>
                <TypeButton type="button">
                  <BiTrendingDown style={{color: Fontcolor}} />
                  <TypeInfo color={Fontcolor}>Trending</TypeInfo>
                </TypeButton>
              </li>
            </Link>
            <Link to="/gaming" style={{textDecoration: 'none'}}>
              <li>
                <TypeButton type="button">
                  <IoLogoGameControllerB style={{color: Fontcolor}} />
                  <TypeInfo color={Fontcolor}>Gaming</TypeInfo>
                </TypeButton>
              </li>
            </Link>
            <Link to="/saved-videos" style={{textDecoration: 'none'}}>
              <li>
                <TypeButton type="button">
                  <AiOutlineArrowDown style={{color: Fontcolor}} />
                  <TypeInfo color={Fontcolor}>Saved videos</TypeInfo>
                </TypeButton>
              </li>
            </Link>
          </TypeContainer>
          <ContactUsContainer>
            <p>Contact us</p>
            <div>
              <Logos
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                alt="facebook logo"
              />
              <Logos
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                alt="twitter logo"
              />
              <Logos
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                alt="linked in logo"
              />
            </div>
            <p>Enjoy! Now to see your channels and recommendations!</p>
          </ContactUsContainer>
        </TypesContainer>
      )
    }}
  </NxtWatchContext.Consumer>
)

export default SideBar
