const initialState = 0;

export const COUNTER_INCREMENT = 'counter/increment';
export const COUNTER_DECREMENT = 'counter/decrement';

export function reducer(state = initialState, action){
    switch (action.type) {
        case COUNTER_INCREMENT:
            return state + 1;
        case COUNTER_DECREMENT:
            return state - 1;
        default:
            return state;
    }
}

export const increment = () => (dispatch) => {
    dispatch({ type: COUNTER_INCREMENT });
};
export const decrement = () => (dispatch) => {
    dispatch({ type: COUNTER_DECREMENT });
};

export default reducer;