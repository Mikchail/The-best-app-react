import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';


import {AuthTypes} from '../../types';
import {logout} from '../../actions/auth';

const Header = (props) => {
  const {logout} = props;
  const {isAuthenticated, user} = props.auth;
  const onLogout = (event) => {
    event.preventDefault();
    logout();
  };

  let links;
  if (isAuthenticated) {
    links = (
      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
           aria-haspopup="true" aria-expanded="false">
          <i className="fa fa-user"/>
          Account
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <Link className="dropdown-item" to={`/user/${user.id}`}>My Profile</Link>
          <div className="dropdown-divider"/>
          <a
            className="dropdown-item"
            href="#"
            onClick={onLogout}
          >Log Out</a>
        </div>
      </li>
    )
  } else {
    links = (
      <React.Fragment>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            <i className="fa fa-sign-in"/>
            Log In
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            <i className="fa fa-user-plus"/>
            Register
          </Link>
        </li>
      </React.Fragment>
    )
  }
  return (
    <nav className="navbar navbar-icon-top navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">The Best App</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"/>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                <i className="fa fa-globe"/>
                All Posts
              </Link>
            </li>
            {isAuthenticated && (
              <li className="nav-item">
                <Link className="nav-link" to="/feed">
                  <i className="fa fa-rss"/>
                  Feed
                </Link>
              </li>
            )}
          </ul>
          <ul className="navbar-nav">
            {links}
          </ul>
        </div>
      </div>
    </nav>
  )
}

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: AuthTypes
}

const mapStateToProps = (state) => ({auth: state.auth});
export {Header};
export default connect(mapStateToProps, {logout})(Header)
