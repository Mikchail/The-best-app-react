import React,{Component} from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {AuthTypes} from '../../types'
import Input from '../UI/input/input'
import { register } from '../../actions/auth'

class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: ''
    }
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/')
    }
  }

  onChange = (event) => this.setState({ [event.target.name]: event.target.value })

  onSubmit = (event) => {
    event.preventDefault();
    this.props.register(this.state, this.props.history)
  }

  render() {
    return (
      <div className="row mt-4">
        <div className="col-4 mx-auto">
          <div className="card">
            <article className="card-body">
              <h4 className="card-title text-center mb-4 mt-1">Registration</h4>
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
                      placeholder="Name"
                      type="text"
                      name="name"
                      value={this.state.name}
                      onChange={this.onChange}
                      pattern=".{3,20}"
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fa fa-envelope"/>
                      </span>
                    </div>
                    <Input
                      className="form-control"
                      placeholder="Email"
                      type="email"
                      name="email"
                      value={this.state.email}
                      onChange={this.onChange}
                      pattern=".{5,30}"
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
                      pattern=".{6,30}"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <button type="submit" className="btn btn-dark btn-block">Register</button>
                </div>
              </form>
            </article>
          </div>
        </div>
      </div>
    )
  }
}

Register.propTypes = {
  register: PropTypes.func.isRequired,
  auth: AuthTypes
};

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps, { register })(Register);
