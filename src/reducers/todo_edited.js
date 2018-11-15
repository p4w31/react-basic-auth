
const initialState = null;

export default function(state = initialState, action) {
    switch (action.type) {

        case 'TOGGLE_TODO_EDITED':
            return ( state === action.payload.id )
                ? null
                : action.payload.id;

        default:
            return state;
    }
};
