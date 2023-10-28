import { configureStore } from "@reduxjs/toolkit";
import TodoReducre from './TodoSlice'
import ChatReducer from './ChatSlice'
import OneOneReducer from './OneOneChatSlice'
const store = configureStore({
  reducer:{
    todos:TodoReducre,
    Chat:ChatReducer,
    OneOne:OneOneReducer,
  }
})

export default store; 