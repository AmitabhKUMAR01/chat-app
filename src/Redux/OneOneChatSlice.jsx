import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
import { DATABASES_ID,USER_COLLECTIONS,databases,ONE_MESSAGE_COLLECTION,COLLECTIONS_ID_MESSAGE } from "../AppWrite/appwriteConfig";

import { Query } from "appwrite";
export const getUsersList= createAsyncThunk('getUsersList',async()=>{
    
        const response = await databases.listDocuments(
          DATABASES_ID,
          USER_COLLECTIONS,
          [Query.orderDesc("$createdAt")]
        );
        console.log("response =<< ", response.documents);
        return response.documents;
      
})

export const getMessages = createAsyncThunk('getMessages',async() =>{
    const response = await databases.listDocuments(
        DATABASES_ID,
        ONE_MESSAGE_COLLECTION,
        [Query.orderDesc("$createdAt")]
      );
      console.log("response =<>?=> ", response.documents);
      return response.documents;
})

export const deleteMessage= createAsyncThunk('deleteMessage',async(message_id) => {
    const response = await databases.deleteDocument(
        DATABASES_ID,
        ONE_MESSAGE_COLLECTION,
        message_id
      );
      
      console.log("deleted", response);
      return response;
});

const OneOneChatSlice = createSlice({
    name: 'OneOneChatSlice',
    initialState: {
        UsersList:[],
        Messages:[],
        selectedUser:{id:'', username:''},
        isLoading:false,
        Deleted:false,
        
        
    },
    reducers:{
        SelectUser(state,action){
            state.selectedUser.id =action.payload.id;
            state.selectedUser.username = action.payload.username;
            console.log(action.payload.id,"action payload");
        },
        SetMessages(state, action) {
            state.Messages.push(action.payload);
            console.log('my messages',state.Messages)
        },
        RemoveMessages(state, action) {
            state.Messages=state.Messages.filter((msg)=>msg.id!==action.payload)
            console.log('messages removed');
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getUsersList.pending,(state,action)=>{
            state.isLoading=true
        });
        builder.addCase(getUsersList.fulfilled,(state,action)=>{
            state.UsersList=action.payload
            state.isLoading=false
        });
        builder.addCase(getUsersList.rejected,(state,action)=>{
            state.isLoading=false
        });
        builder.addCase(getMessages.pending,(state,action)=>{
            state.isLoading=true
        });
        builder.addCase(getMessages.fulfilled,(state,action)=>{
            state.Messages=action.payload
            state.isLoading=false
        });
        builder.addCase(getMessages.rejected,(state,action)=>{
            state.isLoading=false
        });
        builder.addCase(deleteMessage.pending,(state,action)=>{
            state.isLoading=true
        });
        builder.addCase(deleteMessage.fulfilled,(state,action)=>{
            console.log('i have deleted message...')
            state.Deleted=true
            state.isLoading=false
        });
        builder.addCase(deleteMessage.rejected,(state,action)=>{
            state.isLoading=false
        });
    }
})

export const {SelectUser, SetMessages,RemoveMessages} = OneOneChatSlice.actions;
export default OneOneChatSlice.reducer