import { combineReducers } from 'redux';
import TodoReducer from './todo_reducer';
import TodoEditedReducer from './todo_edited';
import UserReducer from './user_reducer';

const rootReducer = combineReducers({
    todos: TodoReducer,
    todoEdited: TodoEditedReducer,
    user: UserReducer
});

export default rootReducer;
