import { combineReducers } from "redux";
import user from './user_reducer';

const rootRecuder = combineReducers({
    user
});

export default rootRecuder;