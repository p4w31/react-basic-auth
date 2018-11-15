import _ from 'lodash';
import { createSelector } from 'reselect';

const todosSelector = state => state.todos
const editedTodosSelector = state => state.todoEdited

const getTodos = (todos, editedTodosIds) => {
    const selectedTodos = _.map(todos.items, (todo) => {
        return ( todo.key === editedTodosIds )
            ? {
                ...todo,
                isEdited: true
            }
            : {
                ...todo,
                isEdited: false
            };
    });

    //return selectedTodos;
    return {
        ...todos,
        items: selectedTodos
    };
};

export default createSelector(
    todosSelector,
    editedTodosSelector,
    getTodos 
);