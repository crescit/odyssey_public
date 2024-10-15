import { configureStore } from "@reduxjs/toolkit";
import ping from './ping/index'

export default configureStore({
  reducer: {
    server_status: ping
  },
});
