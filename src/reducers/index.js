import { combineReducers } from 'redux';

import counter from '../modules/counter';
import users from '../modules/users';

const reducer = combineReducers({
    counter,
    users
});

export default reducer;