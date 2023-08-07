import { configureStore } from "@reduxjs/toolkit";
import AccessToken from "../modules/AccessToken";
import Language from "../modules/Language";
import image from '../modules/imageSlice';

const store = configureStore({
  reducer: {
    AccessToken,Language,
    image,
  },
})

export default store;