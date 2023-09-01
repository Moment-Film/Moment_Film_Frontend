import { createStore } from "redux";
import { combineReducers } from "redux";
import AccessToken from "../modules/AccessToken";
import Language from "../modules/Language";
import image from "../modules/imageSlice";
import persistReducer from "redux-persist/es/persistReducer";
/* import storage from 'redux-persist/lib/storage'*/
import storageSession from 'redux-persist/lib/storage/session'; //세션
import FrameInfo from "../modules/FrameInfo";
import ResultImage from "../modules/ResultImage";
import UserInfo from "../modules/User";
import Filter from "../modules/Filter";
import persistStore from "redux-persist/es/persistStore";

const persistConfig = {
  key: "root",
  storage:storageSession,
  whitelist: ["Language", "image","ResultImage","AccessToken",'UserInfo','Filter',"FrameInfo"],

};

const rootReducer = combineReducers({
  AccessToken,
  Language,
  image,
  FrameInfo,
  ResultImage,
  UserInfo,
  Filter,
});

const store = createStore(persistReducer(persistConfig, rootReducer));

export default store;
