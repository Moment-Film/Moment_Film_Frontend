import { createStore } from "redux";
import { combineReducers } from "redux";
import AccessToken from "../modules/AccessToken";
import Language from "../modules/Language";
import image from '../modules/imageSlice';
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["Language"],
};

const rootReducer = combineReducers({
    AccessToken,Language,
    image,
})

const store = createStore(persistReducer(persistConfig, rootReducer));


export default store;