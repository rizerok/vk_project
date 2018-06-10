import { combineReducers } from 'redux';

import counter from '../modules/counter';
import users from '../modules/users';
import user from 'modules/user';

const reducer = combineReducers({
    counter,
    users,
    user
});

export default reducer;