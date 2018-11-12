import React from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ''
    };
  }

  onLogin(e) {
    e.preventDefault();

    const email = this.refs.email.value.trim();
    const password = this.refs.password.value.trim();
    Meteor.loginWithPassword({ email }, password, (err) => {
      if (!err) {
        console.log(`Login OK: ${Meteor.userId()}`);
        this.setState({ error: '' });
      }
      else {
        console.log('Failed to login user, err: ', err);
        this.setState({ error: 'Unable to login: Email or password is incorrect' });
      }
    });

    // this.setState({
    //   error: 'Something went wrong'
    // });
  }

  render() {
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Short Lnk</h1>
          {this.state.error && <p>{this.state.error}</p>}
          <form className="boxed-view__form" onSubmit={this.onLogin.bind(this)} noValidate>
            <input type="email" ref="email" name="email" placeholder="Email" />
            <input type="password" ref="password" name="password" placeholder="Password" />
            <button className="button">Login</button>
          </form>
          <Link to="/signup">Need an account?</Link>
        </div>
      </div>
    );
  }
};