import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { verifyAuth } from '../../actions/auth.js';
import { removeInterval, 
        toggleIntervalCompleted,
        toggleTodoEdited, 
        fetchIntervals, 
        addInterval, 
        updateTodo, 
        fetchIntervalsOnce } from '../../actions/todos.js';
import EditedTodoSelector from '../../selectors/edited_todos';
import withAuthorization from '../../components/with_authorization';
import ItemButtons from './item_buttons';
import PropTypes from 'prop-types';

import './index.scss';

const defaultProps = {};
  
const propTypes = {
    todos: PropTypes.object,
    user: PropTypes.object,
    removeInterval: PropTypes.func,
    toggleIntervalCompleted: PropTypes.func,
    toggleTodoEdited: PropTypes.func, 
    fetchIntervals: PropTypes.func, 
    addInterval: PropTypes.func,
    updateTodo: PropTypes.func,
    fetchIntervalsOnce: PropTypes.func,
};

class IntervalsListPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inputNewTask: '',
            tempEditedInput: ''
        };
    }

    componentDidMount() {
        this.props.fetchIntervalsOnce();
    }

    verify = () => {
        this.props.verifyAuth();
    }

    taskToggleEdited = (item) => {
        this.setState({ tempEditedInput: item.data.title });
        this.props.toggleTodoEdited(item.key);
    }

    taskEditedSave = (item) => {
        this.props.updateTodo(item.key, {title: this.state.tempEditedInput})
            .then(() => {
                this.props.fetchIntervalsOnce();
            })
            .catch((err) => {
                console.log(err);
            });
        this.props.toggleTodoEdited(item.key);
    }

    renderEditableItemTitle = (item) => {
        if(item.isEdited) {
            return <input value={ this.state.tempEditedInput } onChange={ this.inputEditedTaskChange }/>;
        } else {
            return (
                <span className="row-content">
                    { item.data.title } 
                </span>
            );
        }
    }

    generateTodos = () => {
        return _.map( this.props.todos.items, (item, index) => (
            <li key={item.key} className="item-row-wrapper">
                <ItemButtons 
                    item={item} 
                    taskToggleEdited={this.taskToggleEdited} 
                    taskEditedSave={this.taskEditedSave} 
                />
                { this.renderEditableItemTitle(item) }
                <span className="remove-btn" onClick={ () => this.taskRemove(item.key) }>
                    X
                </span>
            </li>
        ));
    }

    getTextDecoration = (isCompleted) => {
        return isCompleted ? 'line-through' : 'none';
    }

    taskRemove = (val) => {
        this.props.removeInterval(val);
    }

    taskToggleCompleted = (val) => {
        this.props.toggleIntervalCompleted(val);
    }

    inputNewTaskChange = (event) => {
        this.setState({inputNewTask: event.target.value});
    }

    inputEditedTaskChange = (event) => {
        this.setState({ tempEditedInput: event.target.value });
    }

    selectNewTaskTypeChange = (event) => {
        this.setState({ selectType: event.target.value });
    }

    dbTest = () => {
        this.props.fetchIntervals();
    }

    addItem = () => {
        this.props.addInterval({
            title: this.state.inputNewTask
        });

        this.clearNewTaskInputs();
    }

    clearNewTaskInputs = () => {
        this.setState({inputNewTask: ''});
        this.setState({selectType: ''});
    }

    render() {
        return (
            <div className="todo-list-wrapper">
                <h4>List</h4>
                <h6>{(this.props.user ? this.props.user.email : 'no user')}</h6>
                <div>
                    <input value={ this.state.inputNewTask } onChange={ this.inputNewTaskChange }/>
                    <button onClick={ this.addItem }>ADD</button>
                </div>
                <ul style={{ listStyle: 'none', padding: '0' }}>
                    { (this.props.todos.loading) ? <li>Loading...</li> : this.generateTodos() }
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        todos: EditedTodoSelector(state),
        user: state.user
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        addInterval,
        removeInterval,
        toggleIntervalCompleted,
        toggleTodoEdited,
        fetchIntervals,
        fetchIntervalsOnce,
        updateTodo,
        verifyAuth
    }, dispatch);
}

IntervalsListPage.defaultProps = defaultProps;
IntervalsListPage.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(withAuthorization(IntervalsListPage));