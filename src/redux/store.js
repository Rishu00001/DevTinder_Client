import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "./userSlice";
import feedSliceReducer from "./feedSlice";
import ConnectionSliceReducer from "./ConnectionSlice";
import requestSliceReducer from "./RequestSlice";
const store = configureStore({
  reducer: {
    user: userSliceReducer,
    feed: feedSliceReducer,
    connection: ConnectionSliceReducer,
    request: requestSliceReducer,
  },
});

export default store;
