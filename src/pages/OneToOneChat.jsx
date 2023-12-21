import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "../components/Chat-Sidebar/Sidebar.jsx";
import { TypeAnimation } from "react-type-animation";
import UserList from "../components/One2One/UsersList";
import DisplayMessages from "../components/One2One/DisplayMessages";
import SendMessages from "../components/One2One/SendMessages";
import Lottie from "lottie-react";
import Robot from "../assets/robot.json";
import '../Sass/OneoneChat.scss'

const OneToOneChat = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.Chat.user);

  if (!user) return navigate("/login");

  return (
    <div className="One-One-Container">
      <div className="w-[100vw] text-center   left-0 text-xl flex  justify-center  text-black font-semibold  ">
         <h3>welcome </h3>
          <span></span>
          {user && (
            <span className="text-rose-700 capitalize ml-4 ">
              {user[0].name}{" "}
            </span>
          )}
        </div>
      <div className="h-[5rem] border-black flex justify-evenly px-5  w-[100vw] " >
        <Sidebar />
            
        <UserList select="user" />
      </div>
      
      <div className="  ">
        
        <div className="sm:w-[15rem] w-[8rem] absolute sm:left-[15%] right-[14%] top-[-5%]">
          <Lottie animationData={Robot} />
        </div>
        <div className="one-one-Hero ">
          <SendMessages />
          <div></div>
          <DisplayMessages />
        </div>
      </div>
    </div>
  );
};

export default OneToOneChat;
