import React, { Component } from 'react';

const UserContext = React.createContext({
  loggedInStatus: false,
  user_name: '',
  user_id: null,
  bands: [],
  setUser: () => {},
  loginSuccess: () => {},
  logOut: () => {},
});

export default UserContext;

export class UserProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInStatus: false,
      user_name: '',
      user_id: null,
      bands: [],
    };
  }

  loginSuccess = (user) => {
    this.setState({ loggedInStatus: true });
    window.localStorage.setItem('user_name', user.user_name);
    window.localStorage.setItem('user_id', user.id);
    window.localStorage.setItem('bands', JSON.stringify(user.bands));
  }

  logOut = () => {
    this.setState({
      loggedInStatus: false,
      user_name: '',
      user_id: null,
      bands: [],
    });
    window.localStorage.removeItem('user_name');
    window.localStorage.removeItem('user_id');
    window.localStorage.removeItem('bands');
  }

  setUser = () => {
    this.setState({
      user_name: window.localStorage.getItem('user_name'),
      user_id: window.localStorage.getItem('user_id'),
      bands: window.localStorage.getItem('bands'),
    });
  }

  setBands = (bands) => {
    this.setState({
      bands,
    });
    window.sessionStorage.setItem('bands', bands);
  }

  render() {
    const value = {
      loggedInStatus: !!window.localStorage.getItem('user_id'),
      user_name: window.localStorage.getItem('user_name'),
      user_id: window.localStorage.getItem('user_id'),
      bands: window.localStorage.getItem('bands'),
      setUser: this.setUser,
      loginSuccess: this.loginSuccess,
      logOut: this.logOut,
      setBands: this.setBands,
    };
    return (
      <UserContext.Provider value={value}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
};
