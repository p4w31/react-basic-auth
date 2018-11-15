import React, { Component } from 'react';
import { Switch } from 'react-router';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import './App.css';
import withAuthentication from '../../components/with_authentication';
import MenuTop from './menu_top';

import IntervalsListPage from '../IntervalsList';
import LoginPage from '../Login';
import Page2 from '../Page2'; 

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <MenuTop />

                    <Switch>
                        <Route path="/list" component={ IntervalsListPage } />
                        <Route path="/login" component={ LoginPage } />
                        <Route path="/page2" component={ Page2 } />
                        <Redirect from="/" exact to="/list" />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default withAuthentication(App);
