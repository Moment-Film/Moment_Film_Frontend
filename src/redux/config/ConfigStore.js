import { configureStore } from "@reduxjs/toolkit";
import AccessToken from "../modules/AccessToken";
import Language from "../modules/Language";

const store = configureStore({
  reducer: {
    AccessToken,Language
  },
})

export default store;