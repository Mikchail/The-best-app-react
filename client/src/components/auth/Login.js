import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import {AuthTypes} from '../../types'

import Input from '../UI/input/input'
import {login} from '../../actions/auth'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  componentDidUpdate(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/')
    };
  };

  onChange = (event) => this.setState({[event.target.name]: event.target.value});

  onSubmit = (event) => {
    event.preventDefault();
    this.props.login(this.state)
  };

  render() {
    return (
      <div className="row mt-4">
        <div className="col-4 mx-auto">
          <div className="card">
            <article className="card-body">
              <h4 className="card-title text-center mb-4 mt-1">Log In</h4>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <div className="input-group">
                    <div className="input-group-prepend">
                         <span className="input-group-text">
                           <i className="fa fa-user"/>
                         </span>
                    </div>


                    <Input
                      className="form-control"
                      placeholder="Email"
                      type="email"
                      name="email"
                      value={this.state.email}
                      onChange={this.onChange}
                      pattern=".{4,30}"
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fa fa-lock"/>
                      </span>
                    </div>
                    <Input
                      className="form-control"
                      placeholder="Password"
                      type="password"
                      name="password"
                      value={this.state.password}
                      onChange={this.onChange}
                      pattern=".{4,30}"
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <button type="submit" className="btn btn-dark btn-block">Login</button>
                </div>
              </form>
            </article>
          </div>
        </div>
      </div>
    )
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  auth: AuthTypes
}

const mapStateToProps = (state) => ({auth: state.auth})

export default connect(mapStateToProps, {login})(Login)
