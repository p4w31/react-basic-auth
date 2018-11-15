import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signInWithEmailAndPassword, verifyAuth, signOut } from '../../actions/auth.js';
import PropTypes from 'prop-types';

const defaultProps = {};
  
const propTypes = {
    user: PropTypes.object,
    history: PropTypes.shape({
        push: PropTypes.func
    }),
    signInWithEmailAndPassword: PropTypes.func,
    verifyAuth: PropTypes.func,
    signOut: PropTypes.func, 
};

class LoginPage extends Component {
    constructor(props){
        super(props);

        this.state = {
            inputUser: '',
            inputPassword: ''
        };
    }

    componentDidMount() {
        this.verify();
    }

    inputUserChange = (event) => {
        this.setState({ inputUser: event.target.value });
    }

    inputPasswordChange = (event) => {
        this.setState({ inputPassword: event.target.value });
    }

    login = () => { 
        this.props.signInWithEmailAndPassword(this.state.inputUser, this.state.inputPassword)
            .then((authData) => {
                console.log('auth data');
                console.log(authData);
                this.props.history.push('/list');
            })
            .catch((err) => {
                console.log('auth err');
                console.log(err);
            });
    }

    verify = () => {
        this.props.verifyAuth();
    }

    logout = () => {
        this.props.signOut()
            .then((authData) => {
                console.log('auth data');
                console.log(authData);
            })
            .catch((err) => {
                console.log('auth err');
                console.log(err);
            });
    }

    render() {
        return (
            <div className="login-form-wrapper">
                <div>Logged in as: { (this.props.user) ? this.props.user.email : 'not logged in' }</div>
                <input 
                    type="text"
                    value={ this.state.inputUser } 
                    onChange={ this.inputUserChange }/>
                <input 
                    type="password"
                    value={ this.state.inputPassword } 
                    onChange={ this.inputPasswordChange }/>
                <div>
                    <button onClick={ this.login }>Login</button> 
                    <button onClick={ this.logout }>Logout</button>
                </div>
            </div>
        );
    }

}

//export default LoginForm;
function mapStateToProps(state) {
    return {
        user: state.user
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators ({
        signInWithEmailAndPassword,
        verifyAuth,
        signOut
    }, dispatch);
}

LoginPage.defaultProps = defaultProps;
LoginPage.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
