import initialState from '../../store/initstate';
import {
    ADD_TODO,
    UPDATE_TODO,
    DELETE_TODO,
    LOADING,
} from '../../actions/types';

const activityReducers = (state = initialState.activity, action) => {
    switch (action.type) {
        case ADD_TODO:
            let id = state.id + 1;

            return {
                ...state,
                todos: [...state.todos, { id, ...action.payload }],
                id,
            };
        case UPDATE_TODO:
            let todos = state.todos.map(todo => {
                if (todo.id === action.payload.id) {
                    todo = { ...todo, ...action.payload };
                }

                return todo;
            });

            return {
                ...state,
                todos,
            };
        case DELETE_TODO:
            return {
                todos: state.todos.filter(todo => todo.id != action.payload.id),
                id: state.id,
            };
        case LOADING:
            return {
                ...state,
                isLoading: !state.isLoading,
            };
        default:
            return state;
    }
}

export default activityReducers;