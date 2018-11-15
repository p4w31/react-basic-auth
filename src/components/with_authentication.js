import React, { Component } from 'react';
import { connect } from 'react-redux';
import { verifyAuth, userSignedIn,  } from '../actions/auth';
import { bindActionCreators } from 'redux';
import * as firebase from "firebase";
import PropTypes from 'prop-types';

const withAuthentication = (WrappedComponent) => {
    const defaultProps = {};
      
    const propTypes = {
        userSignedIn: PropTypes.func,
    };

    class WithAuthentication extends Component {

        componentDidMount() {
            firebase.auth().onAuthStateChanged(user => {
                console.log('withAuthentication LISTENER');
                if (user) {
                    this.props.userSignedIn(user);
                } else {
                    this.props.userSignedIn(null);
                }
            });
        }

        render() {
            return (
                <WrappedComponent {...this.props} />
            );
        }
    }

    function mapDispatchToProps(dispatch) {
        return bindActionCreators({
            verifyAuth,
            userSignedIn
        }, dispatch);
    }

    WithAuthentication.defaultProps = defaultProps;
    WithAuthentication.propTypes = propTypes;

    return connect(null, mapDispatchToProps)(WithAuthentication);
}

export default withAuthentication;
