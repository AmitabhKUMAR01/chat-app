import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { account } from "../AppWrite/appwriteConfig";
import { ID,Role,Permission } from "appwrite";
import { databases } from "../AppWrite/appwriteConfig";
import { DATABASES_ID,USER_COLLECTIONS } from "../AppWrite/appwriteConfig";
export const LoginUser = createAsyncThunk("LoginUser", async (credentials) => {
  await account.createEmailSession(credentials.email, credentials.password);
  const accountDetails = await account.get();
  // console.log('logini successful',user[0])
  console.log("user created thunk", accountDetails);
  return accountDetails;
});

export const RegisterUser = createAsyncThunk(
  "RegisterUser",
  async function (credentials) {
    console.log("Handle Register triggered!", credentials);
    if (credentials.password1 !== credentials.password2) {
      alert("Passwords did not match!");
      return;
    }
    let response = await account.create(  
      ID.unique(),
      credentials.email,
      credentials.password1,
      credentials.name
    );
    console.log("User registered!", response);

    await account.createEmailSession(credentials.email, credentials.password1);
    let accountDetails = await account.get();

    let payload = {
      
      User_ID: accountDetails.$id,
      Username: accountDetails.name,
      Email: accountDetails.email,
      unque_name: `@${accountDetails.email.split('@')[0]}`,
    };
    let permissions = [Permission.write(Role.user(accountDetails.$id))];
    let res= await databases.createDocument(
      DATABASES_ID,
      USER_COLLECTIONS,
      ID.unique(),
      payload,
      permissions
    );
    console.log("data sent",res);
    console.log("User registered!======>", accountDetails);
    return accountDetails;
  }
);
export const  LogoutUser=createAsyncThunk('LogoutUser',async function(){
  
     account.deleteSessions();

})


const ChatSlice = createSlice({
  name: "chat",
  initialState: {
    user: null,
    isLoading: false,
  },
  reducers: {
      
  },
  extraReducers: (builder) => {
    builder.addCase(LoginUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(LoginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = [action.payload];
      console.log("i am fulfilled");
    });
    builder.addCase(LoginUser.rejected, (state, action) => {
      console.log("Errororoor -------> ", action.payload);
      state.isLoading = false;
    });
    builder.addCase(RegisterUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(RegisterUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = [action.payload];
      console.log("i am fulfilled");
    });
    builder.addCase(RegisterUser.rejected, (state, action) => {
      console.log("Errororoor -------> ", action.payload);
      state.isLoading = false;
    });
    builder.addCase(LogoutUser.fulfilled, (state, action) => {
      state.user= null;
    })
  },
});

export const { toggleUser, handleUserLogin } = ChatSlice.actions;
export default ChatSlice.reducer;
