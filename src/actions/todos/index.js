import {
    ADD_TODO,
    UPDATE_TODO,
    DELETE_TODO,
    LOADING,
    UPDATE_NOTIFICATIONS_OPEN,
} from '../types';

export const addTodo = task => {
    //console.log('add todo', task);
    return async dispatch => dispatch({
        type: ADD_TODO,
        payload: task,
    })
};

export const updateTodo = task => {
    //console.log('updateTodo', task);
    return async dispatch => dispatch({
        type: UPDATE_TODO,
        payload: task,
    });
}

export const deleteTodo = id => async dispatch => dispatch({
    type: DELETE_TODO,
    payload: {
        id,
    }
});

export const Loading = () => ({
    type: LOADING,
})