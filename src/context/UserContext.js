import React, { Component } from 'react'

const UserContext = React.createContext({
  loggedInStatus: false,
  user_name: '',
  user_id: null,
  bands: [],
  setUser: () => {},
  loginSuccess: () => {},
  logOut: () => {}
})

export default UserContext

export class UserProvider extends Component {
  state = {
    loggedInStatus: false,
    user_name: '',
    user_id: null,
    bands: [],
  }
  
  loginSuccess = () => {
    this.setState({ loggedInStatus: true })
  }
  logOut = () => {
    this.setState({ loggedInStatus: false })
  }

  setUser = (user) => {
    this.setState({
      user_name: user.user_name,
      user_id: user.id,
      bands: user.bands
    })
  }
   render() {
     const value = {
      loggedInStatus: this.state.loggedInStatus,
      user_name: this.state.user_name,
      user_id: this.state.user_id,
      bands: this.state.bands,
      setUser: this.setUser,
      loginSuccess: this.loginSuccess,
      logOut: this.logOut
     }
     return (
       <UserContext.Provider value={value}>
         {this.props.children}
       </UserContext.Provider>
     )
   }
}