import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'
import {HiMoon} from 'react-icons/hi'
import NxtWatchContext from '../../context/NxtWatchContext'
import {
  HeaderContainer,
  LogoImage,
  ProfileImage,
  ButtonContainer,
  CancelButton,
  ConfirmButton,
  PopupContainer,
  ProfileContainer,
} from './styledComponents'

const Header = props => {
  const {history} = props

  return (
    <NxtWatchContext.Consumer>
      {value => {
        const {isDark, backgroundTheme, changeTheme} = value
        const result = backgroundTheme === 'black' ? '#181818' : 'white'
        const color = isDark ? 'white' : 'black'
        const onClickChangeTheme = () => {
          changeTheme()
        }

        const onClickConfirm = () => {
          Cookies.remove('jwt_token')
          history.replace('/login')
        }

        const renderPopup = () => (
          <PopupContainer
            BgColor={result}
            color={color}
            style={{backgroundColor: result}}
          >
            <Popup
              modal
              trigger={<button type="button">Logout</button>}
              className="popup-content"
            >
              {close => (
                <>
                  <div>
                    <p>Are you sure, you want to logout</p>
                  </div>
                  <ButtonContainer>
                    <CancelButton
                      BgColor={result}
                      color={color}
                      type="button"
                      className="trigger-button"
                      onClick={() => close()}
                    >
                      Cancel
                    </CancelButton>
                    <ConfirmButton
                      BgColor={result}
                      color={color}
                      type="button"
                      onClick={onClickConfirm}
                    >
                      Confirm
                    </ConfirmButton>
                  </ButtonContainer>
                </>
              )}
            </Popup>
          </PopupContainer>
        )

        return (
          <HeaderContainer BgColor={result}>
            <Link to="/">
              {isDark ? (
                <LogoImage
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png"
                  alt="website logo"
                />
              ) : (
                <LogoImage
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                  alt="website logo"
                />
              )}
            </Link>
            <ProfileContainer>
              <button type="button" data-testid="theme">
                <HiMoon onClick={onClickChangeTheme} />
              </button>

              <ProfileImage
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                alt="profile"
              />
              {renderPopup()}
            </ProfileContainer>
          </HeaderContainer>
        )
      }}
    </NxtWatchContext.Consumer>
  )
}

export default withRouter(Header)
