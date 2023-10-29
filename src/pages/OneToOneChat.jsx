  
  import { useNavigate } from "react-router-dom";
  import { useSelector } from "react-redux";
  import Sidebar from "../components/Chat-Sidebar/Sidebar.jsx";
  
import UserList from '../components/One2One/UsersList';
import DisplayMessages from '../components/One2One/DisplayMessages';
import SendMessages from '../components/One2One/SendMessages';
import ImageUploader from "../components/ImageUploader.jsx";
import { useState } from "react";
const OneToOneChat = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.Chat.user); 
    
    if (!user) return navigate("/login");
    
  return (
    <div className="one-onechat ">
      <div className="h-[5rem] pt-5">

      <Sidebar/> 
      
      <UserList/>
      </div>
      {/* <ImageUploader/> */}
<div className="container">

<div className="w-[100vw] absolute text-center  left-0 text-xl flex p-2 justify-center top-10 text-black font-semibold  ">
  welcome to chat <span></span>
  {user && (
    <span className="text-rose-700 capitalize ml-4 ">{user[0].name} </span>
  )}
</div>

<div className="room--container">
  
  <SendMessages/>
  <div>
   
  </div>
    <DisplayMessages/>
</div>
</div>
  </div>
  )
}

export default OneToOneChat

  
  