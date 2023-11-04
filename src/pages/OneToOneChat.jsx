  
  import { useNavigate } from "react-router-dom";
  import { useSelector } from "react-redux";
  import Sidebar from "../components/Chat-Sidebar/Sidebar.jsx";
  import { TypeAnimation } from "react-type-animation";
import UserList from '../components/One2One/UsersList';
import DisplayMessages from '../components/One2One/DisplayMessages';
import SendMessages from '../components/One2One/SendMessages';
import Lottie from "lottie-react";
import { useState } from "react";
import Robot from '../assets/robot.json'
const OneToOneChat = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.Chat.user); 
    
    if (!user) return navigate("/login");
    
  return (
    <div className="one-onechat ">
      <div className="h-[5rem] pt-5">

      <Sidebar/> 
      
      <UserList select="user"/>
      </div>
      {/* <ImageUploader/> */}
<div className="container">

<div className="w-[100vw] absolute text-center   left-0 text-xl flex px-2 justify-center top-12 text-black font-semibold  ">
<TypeAnimation
    sequence={[
      // Same substring at the start will only be typed once, initially
      'Welcome to Chat,',
      3000,
      'Have Fun, ',
      2000,
      'Have Fun Chat ,',
      1000
    ]}
    speed={30}
    style={{ fontSize: '1rem' }}
    repeat={Infinity}
  /> <span></span>
  {user && (
    <span className="text-rose-700 capitalize ml-4 ">{user[0].name} </span>
  )}
  
</div>
<div className="sm:w-[15rem] w-[8rem] absolute sm:left-[15%] right-[14%] top-[-5%]">
<Lottie animationData={Robot}/>
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

  
  