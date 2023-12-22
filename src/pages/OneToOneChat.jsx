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
import WelcomeMessage from "../components/CommonComponents/WelcomeMessage.jsx";

const OneToOneChat = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.Chat.user);
  const isDark= useSelector((state) => state.Chat.darkMode);
  if (!user) return navigate("/login");

  return (
    <div className={`One-One-Container ${isDark?'dark-container':''}`} >
     
        <WelcomeMessage isDark={isDark}/>
      <div className="h-[5rem] border-black flex justify-evenly px-5  w-[100vw] " >
        <Sidebar />
            
        <UserList select="user" isDark={isDark} />
      </div>
      
      <div className="  ">
        
        <div className="sm:w-[15rem] w-[8rem] absolute sm:left-[15%] right-[14%] top-[-5%]">
          <Lottie animationData={Robot} />
        </div>
        <div className={`one-one-Hero ${isDark?'one-one-Hero-Dark':''}`}>
          <SendMessages />
          <div></div>
          <DisplayMessages isDark={isDark} user={user[0]}/>
        </div>
      </div>
    </div>
  );
};

export default OneToOneChat;
