import { configureStore } from "@reduxjs/toolkit";
import AccessToken from "../modules/AccessToken";

const store = configureStore({
  reducer: {
    AccessToken
  },
})

export default store;