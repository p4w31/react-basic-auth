import React, { Component } from 'react';
import withAuthorization from '../../components/with_authorization';

import './index.scss';

class Page2 extends Component {
    render() {
        return (
            <div className="page2-wrapper">
                Page2
            </div>
        );
    }
}

export default withAuthorization(Page2);