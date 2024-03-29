import React from 'react';
import Header from './Header';
import axios from 'axios';
import { connect } from 'react-redux';
import { setAuthUserData } from '../../redux/auth-reducer';
import { usersAPI } from '../../api/api';

class HeaderContainer extends React.Component {
  componentDidMount() {
    // axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
    //   withCredentials: true
    // })
    usersAPI.getAuthMe()
      .then(data => {
        if(data.resultCode === 0) {
          let {id, email, login} = data.data;
          this.props.setAuthUserData(id, email, login)
        }
      })
  }

  render() {
    return (
      <Header {...this.props} />
    )
  }
}

let mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login,
})

export default connect(mapStateToProps, { setAuthUserData })(HeaderContainer);