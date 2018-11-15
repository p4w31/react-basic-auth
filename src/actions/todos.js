import { databaseRef, intervalsRef } from "../config/firebase";

export function removeInterval(intervalId) {
    return function(dispatch, getState) {
        let userUid = getState().user.uid;

        intervalsRef
            .child(userUid)
            .child(intervalId)
            .set(null,
                (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('Removed sucessfully!');
                        dispatch(fetchIntervalsOnce());
                    }
                }
            );
    }
}

export function toggleIntervalCompleted(intervalId) {
    return {
        type: 'TOGGLE_INTERVAL_COMPLETED',
        payload: {
            id: intervalId
        }
    };
}

export function toggleTodoEdited(todoId) {
    return {
        type: 'TOGGLE_TODO_EDITED',
        payload: {
            id: todoId
        }
    };
}

export function fetchIntervals() {
    return function(dispatch, getState) {
        dispatch(fetchIntervalsBegin() );
        let userintervalsRef = databaseRef.child("todos");

        userintervalsRef.on("value", snapshot => {
            dispatch({
                type: 'FETCH_INTERVALS',
                payload: snapshot.val()
            });
        });

    }
}

export function fetchIntervalsOnce() {
    return function(dispatch, getState) {
        dispatch(fetchIntervalsBegin() );
        let userUid = (getState().user) ? getState().user.uid : null;
        let userintervalsRef = databaseRef.child(`todos/${userUid}`);

        userintervalsRef.once("value", snapshot => {
            dispatch({
                type: 'FETCH_INTERVALS',
                payload: snapshot.val()
            });
        });

    }
}

export const fetchIntervalsBegin = () => ({
    type: 'FETCH_INTERVALS_BEGIN'
});

export function addInterval(newInterval){
    return function(dispatch, getState){
        console.log('getState in addInterval');
        console.log( getState().user.uid );
        let userUid = getState().user.uid;

        intervalsRef
            .child(userUid)
            .push()
            .set(newInterval, 
                (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('Added sucessfully!');
                        dispatch(fetchIntervalsOnce());
                    }
                }
            );
    }
};

export function updateTodo (key, newInterval) {
    return function(dispatch, getState) {
        return new Promise((resolve, reject) => {
            let userUid = getState().user.uid;

            intervalsRef
                .child(userUid)
                .child(key)
                .set(newInterval, 
                    (err) => {
                        if (err) {
                            console.log(err);
                            reject();
                        } else {
                            console.log('Added sucessfully!');
                            resolve();
                        }
                    }
                );
        });
    }
};