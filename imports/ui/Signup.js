import React from 'react';
import { Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ''
    };
  }

  onSignup(e) {
    e.preventDefault();

    const email = this.refs.email.value.trim();
    const password = this.refs.password.value.trim();

    if (password.length < 8) {
      this.setState({ error: 'Password must be at least 8 characters' });
      return;
    }

    Accounts.createUser({ email, password }, (err) => {
      if (!err) {
        console.log(`User created: ${Meteor.userId()}`);
        this.setState({ error: '' });
      }
      else {
        console.log('Failed to create user, err: ', err);
        this.setState({ error: err.reason });
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
          <h1>Join Short Lnk</h1>
          {this.state.error && <p>{this.state.error}</p>}
          <form className="boxed-view__form" onSubmit={this.onSignup.bind(this)} noValidate>
            <input type="email" ref="email" name="email" placeholder="Email" />
            <input type="password" ref="password" name="password" placeholder="Password" />
            <button className="button">Create Account</button>
          </form>
          <Link to="/">Already have an account?</Link>
        </div>
      </div>
    );
  }
};