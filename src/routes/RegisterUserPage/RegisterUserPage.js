import React, { Component } from "react";
import './RegisterUserPage.css';
import RegisterUserForm from '../../components/RegisterUserForm/RegisterUserForm';
import { withRouter } from "react-router-dom";

class RegisterUserPage extends Component {
  static defaultProps = {
    history: {
      push: () => {}
    }
  }

  handleRegistrationSuccess = () => {
    const { history } = this.props;
    history.push('/login');
  }

  render() {
    return (
      <section className="registration-page">
        <div className="registration-wrapper">
          <h2>Create New Account</h2>
          <RegisterUserForm onRegisterSuccess={this.handleRegistrationSuccess} />
        </div>
      </section>
    );
  }
}

export default withRouter(RegisterUserPage);
