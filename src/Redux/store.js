import { configureStore } from "@reduxjs/toolkit";
import TodoReducre from './TodoSlice'
import ChatReducer from './ChatSlice'
import OneOneReducer from './OneOneChatSlice'
import GroupChatReducer from './GroupChatSlice'
const store = configureStore({
  reducer:{
    todos:TodoReducre,
    Chat:ChatReducer,
    OneOne:OneOneReducer,
    GroupChat:GroupChatReducer,
  }
})

export default store; 