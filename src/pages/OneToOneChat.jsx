  
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
    <>
      <Sidebar/> 
      
      <UserList/>
      {/* <ImageUploader/> */}
<div className="container">

<div className="w-[100vw]  flex p-2 justify-center text-emerald-400  ">
  welcome to chat <span></span>
  {user && (
    <span className="text-red-400 capitalize ml-4 ">{user[0].name} </span>
  )}
</div>

<div className="room--container">
  
  <SendMessages/>
  <div>
   
  </div>
    <DisplayMessages/>
</div>
</div>
  </>
  )
}

export default OneToOneChat

  
  