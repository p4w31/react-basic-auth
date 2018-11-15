import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signOut } from '../../actions/auth.js';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import './menu_top.scss';

const defaultProps = {};
      
const propTypes = {
    user: PropTypes.object,
    signOut: PropTypes.func,
    history: PropTypes.shape({
        push: PropTypes.func
    })
};

class MenuTop extends Component {
    logout = () => {
        this.props.signOut()
            .then((authData) => {
                console.log('auth data');
                console.log(authData);
                this.props.history.push('/login');
            })
            .catch((err) => {
                console.log('auth err');
                console.log(err);
            });
    }

    redirectTo = (path) => {
        this.props.history.push(`/${path}`);
    }

    renderMenu = () => {
        return (
            <div className="menu-top-wrapper">
                <span className="menu-link" style={{float: 'right'}} onClick={ this.logout }>Logout</span>
                <span className="menu-link" style={{float: 'left', marginRight: '10px'}} onClick={ () => this.redirectTo('list') }>List</span>
                <span className="menu-link" style={{float: 'left', marginRight: '10px'}} onClick={ () => this.redirectTo('page2') }>Page2</span>
            </div>
        );
    }

    render() {
        return (
            ( this.props.user )
                ? this.renderMenu()
                : null
        );
    }
}

function mapStatsToProps(state) {
    return {
        user: state.user
    };
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators ({
        signOut
    }, dispatch);
}

MenuTop.defaultProps = defaultProps;
MenuTop.propTypes = propTypes;

export default compose(
    withRouter,
    connect(mapStatsToProps, mapDispatchToProps)
)(MenuTop);