import { createStore } from "redux";
import { combineReducers } from "redux";
import AccessToken from "../modules/AccessToken";
import Language from "../modules/Language";
import image from '../modules/imageSlice';
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import FrameInfo from '../modules/FrameInfo';
import ResultImage from '../modules/ResultImage';
import UserInfo from '../modules/User';

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["Language", "image","ResultImage","AccessToken",'UserInfo'],

};

const rootReducer = combineReducers({
    AccessToken,Language,
    image,FrameInfo,ResultImage,UserInfo
})

const store = createStore(persistReducer(persistConfig, rootReducer));


export default store;