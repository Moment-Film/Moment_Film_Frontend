import { createStore } from "redux";
import { combineReducers } from "redux";
import AccessToken from "../modules/AccessToken";

const rootReducer = combineReducers({
    AccessToken
});

const store = createStore(rootReducer);

export default store;
