import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/profileActions';
import { getCurrentProfile } from '../../actions/profileActions';
import Spinner from '../common/Spinner';

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }


  render() {
    const { isAuthenticated, user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    let authLinks;

    if (profile === null || loading) {
      authLinks = <Spinner />;
    } else {
      // Check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        const authLinks = (
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/feed">
                Post Feed
          </Link>
            </li>
            <li className="nav-item">

              <p className="lead text-muted">
                <Link to={`/profile/${profile.handle}`}>Profile</Link>
              </p>


            </li>
            <li className="nav-item">
              <a
                href=""
                onClick={this.onLogoutClick.bind(this)}
                className="nav-link"
              >
                <img
                  className="rounded-circle"
                  src={user.avatar}
                  alt={user.name}
                  style={{ width: '25px', marginRight: '5px' }}
                  title="You must have a Gravatar connected to your email to display an image"
                />{' '}
                Logout
          </a>
            </li>
          </ul>
        );
      }
      else {
        // User is logged in but has no profile
        authLinks = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
      }

      const guestLinks = (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/register">
              Sign Up
          </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">
              Login
          </Link>
          </li>
        </ul>
      );

      return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
          <div className="container">
            <Link className="navbar-brand" to="/">
              MomentsnMemories
          </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#mobile-nav"
            >
              <span className="navbar-toggler-icon" />
            </button>

            <div className="collapse navbar-collapse" id="mobile-nav">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/profiles">
                    {' '}
                    Profiles
                </Link>
                </li>
              </ul>
              {isAuthenticated ? authLinks : guestLinks}
            </div>
          </div>
        </nav>
      );
    }
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile, logoutUser, clearCurrentProfile })(
  Navbar
);
