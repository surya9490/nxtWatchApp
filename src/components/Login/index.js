import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import NxtWatchContext from '../../context/NxtWatchContext'
import {
  BgContainer,
  LogoImage,
  UserContainer,
  LabelItems,
  InputItems,
  ShowPassword,
  LoginButton,
  FormContainer,
} from './styledComponents'

class Login extends Component {
  state = {
    username: '',
    password: '',
    loginError: false,
    errorMessage: '',
    type: 'password',
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
    this.setState({loginError: false})
  }

  onSubmitFailure = errorMsg => {
    this.setState({loginError: true, errorMessage: errorMsg})
  }

  onSubmitLoginDetails = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}

    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  togglePassword = () => {
    const {type} = this.state
    if (type === 'password') {
      this.setState({type: 'text'})
    } else {
      this.setState({type: 'password'})
    }
  }

  getUserDetails = event => {
    this.setState({username: event.target.value})
  }

  getPasswordDetails = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {loginError, errorMessage, type} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {isDark, backgroundTheme} = value
          return (
            <BgContainer bgColor={backgroundTheme} height="100vh" width="100vw">
              <FormContainer
                bgColor="#f8fafc"
                height="300px"
                width="300px"
                onSubmit={this.onSubmitLoginDetails}
              >
                {isDark ? (
                  <LogoImage
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                    alt="website logo"
                  />
                ) : (
                  <LogoImage
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                    alt="website logo"
                  />
                )}
                <UserContainer>
                  <LabelItems htmlFor="username">USERNAME</LabelItems>
                  <InputItems
                    marginBottom="10px"
                    type="text"
                    id="username"
                    onChange={this.getUserDetails}
                  />
                </UserContainer>
                <UserContainer>
                  <LabelItems htmlFor="password">PASSWORD</LabelItems>
                  <InputItems
                    marginBottom="2px"
                    type={type}
                    id="password"
                    onChange={this.getPasswordDetails}
                  />
                </UserContainer>
                <ShowPassword>
                  <input
                    type="checkbox"
                    id="checkbox"
                    onClick={this.togglePassword}
                  />
                  <label htmlFor="checkbox">Show Password</label>
                </ShowPassword>
                <LoginButton type="submit">Login</LoginButton>
                {loginError ? <p>{errorMessage}</p> : null}
              </FormContainer>
            </BgContainer>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}

export default Login
