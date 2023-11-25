import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DATABASES_ID, GROUP_LIST_COLLECTION_ID,GROUP_MESSAGES_COLLECTION_ID} from "../AppWrite/appwriteConfig";
import { databases } from "../AppWrite/appwriteConfig";
import { Query } from "appwrite";

export const getGroupList= createAsyncThunk('getGroupList',async()=>{
    
        const response = await databases.listDocuments(
          DATABASES_ID,
          GROUP_LIST_COLLECTION_ID,
          [Query.orderDesc("$createdAt")]
        );
        // console.log("response =<< Group", response.documents);
        return response.documents;
      
})
export const getMessages = createAsyncThunk('getMessages',async() =>{
    const response = await databases.listDocuments(
        DATABASES_ID,
        GROUP_MESSAGES_COLLECTION_ID,
        [Query.orderDesc("$createdAt")]
      );
    //   console.log("response =<>?=>Group ", response.documents);
      return response.documents;
})

export const deleteMessage= createAsyncThunk('deleteMessage',async(message_id) => {
    const response = await databases.deleteDocument(
        DATABASES_ID,
        GROUP_MESSAGES_COLLECTION_ID,
        message_id
      );
      
      console.log("deleted Group", response);
      return response;
});
const GroupChatSlice = createSlice({
    name: 'GroupChatSlice',
    initialState:{
        GroupList:[],
        Messages:[],
        selectedGroup:{id:'', groupname:''},
        isLoading: false,
    },
    reducers:{
        SelectGroup(state,action){
            state.selectedGroup.id =action.payload.id;
            state.selectedGroup.groupname = action.payload.groupname;
            console.log(action.payload.id,"action payload im am group id");
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
        builder.addCase(getGroupList.pending,(state,action)=>{
            state.isLoading=true
        });
        builder.addCase(getGroupList.fulfilled,(state,action)=>{
            state.GroupList=action.payload
            state.isLoading=false
        });
        builder.addCase(getGroupList.rejected,(state,action)=>{
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

export const {SelectGroup,SetMessages,RemoveMessages}= GroupChatSlice.actions;
export default  GroupChatSlice.reducer