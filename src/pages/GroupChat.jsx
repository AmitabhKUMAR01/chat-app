import CreateGroup from "../components/GroupChat/CreateGroup"
import DisplayMessages from "../components/GroupChat/DisplayMessages"
import GroupList from "../components/GroupChat/GroupList"
import SendMessages from "../components/GroupChat/SendMessages"
import Sidebar from "../components/Chat-Sidebar/Sidebar"
import { useSelector } from "react-redux"
import Lottie from "lottie-react";
import Robot from '../assets/robot.json'
import Smily from '../assets/smilyface.json'
const GroupChat = () => {
  const user = useSelector((state) => state.Chat.user); 
  return (
    // <div>
    //     <CreateGroup/>
    //     <GroupList/>
    //     <div className="container">

    //     <div className="room--container">

    //     <SendMessages/>
    //     </div>
    //     </div>
    //     <DisplayMessages/>
    // </div>
    <div className="one-onechat " id="group">
    <div className="h-[5rem] pt-5">

    <Sidebar/> 
    
    
    </div>
         {/* <CreateGroup/> */}
         <GroupList/>
<div className="container">

<div className="w-[100vw] absolute text-center  left-0 text-xl flex p-2 justify-center top-10 text-black font-semibold  ">
welcome to chat <span></span>
{user && (
  <span className="text-rose-700 capitalize ml-4 ">{user[0].name} </span>
)}
</div>
<div className="sm:w-[15rem] w-[10rem] absolute sm:left-[15%] right-[-5%] top-[-5%]">
<Lottie animationData={Robot}/>
</div>
<div className="w-[15rem] hidden md:block  absolute top-[10%] right-[14%]">
<Lottie animationData={Smily}/>
</div>
 
<div className="room--container" id={'group--room'}>

<SendMessages/>
<div>
 
</div>
  <DisplayMessages/>
</div>
</div>
</div>
  )
}

export default GroupChat