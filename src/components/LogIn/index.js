import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LogIn extends Component {
  state = {
    userId: '',
    pin: '',
    showSubmitError: false,
    error: '',
  }

  onChangeUserId = event => {
    this.setState({userId: event.target.value})
  }

  onChangePin = event => {
    this.setState({pin: event.target.value})
  }

  submitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expire: 30})
    const {history} = this.props
    history.replace('/')
  }

  submitFailure = error => {
    this.setState({showSubmitError: true, error})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {userId, pin} = this.state
    const userDetails = {userId, pin}

    const url = 'https://apis.ccbp.in/ebank/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.submitSuccess(data.jwt_token)
    } else {
      console.log(data.error_msg)
      this.submitFailure(data.error_msg)
    }
  }

  render() {
    const {showSubmitError, error, userId, pin} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-bg-container">
        <div className="login-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
            className="login-logo"
          />
          <form className="form-container" onSubmit={this.onSubmitForm}>
            <h1 className="login-heading">Welcome Back!</h1>
            <label htmlFor="userId" className="form-label">
              User Id
            </label>
            <input
              type="text"
              id="userId"
              className="user-input"
              placeholder="Enter User Id"
              onChange={this.onChangeUserId}
              value={userId}
            />
            <label htmlFor="pin" className="form-label">
              PIN
            </label>
            <input
              type="password"
              id="pin"
              className="user-input"
              placeholder="Enter PIN"
              value={pin}
              onChange={this.onChangePin}
            />
            <button type="submit" className="login-button">
              Login
            </button>
            {showSubmitError && <p className="err">{error}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default LogIn
