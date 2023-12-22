import DisplayMessages from "../components/GroupChat/DisplayMessages";
import GroupList from "../components/GroupChat/GroupList";
import SendMessages from "../components/GroupChat/SendMessages";
import Sidebar from "../components/Chat-Sidebar/Sidebar";
import Lottie from "lottie-react";
import Robot from "../assets/robot.json";
import Smily from "../assets/smilyface.json";
import { motion } from "framer-motion";
import WelcomeMessage from "../components/CommonComponents/WelcomeMessage";
import { useSelector } from "react-redux";
const GroupChat = () => {
    const isDark= useSelector((state) => state.Chat.darkMode);

  return (
    <div className={`One-One-Container ${isDark?'dark-container':''}`} >
       <WelcomeMessage isDark={isDark}/>
      <div className="h-[5rem]">
        <Sidebar />
      </div>
      <GroupList />
      <div className="container">
        <motion.div
          initial={{ y: "-10vh" }}
          animate={{ y: 0 }}
          transition={{
            type: "spring",
            stiffness: 100,
            delay: 0.2,
            duration: 0.7,
          }}
          className="sm:w-[15rem] w-[10rem] absolute sm:left-[15%] right-[-5%] top-[-5%]"
        >
          <Lottie animationData={Robot} />
        </motion.div>
        <motion.div
          initial={{ x: "110vw" }}
          animate={{ x: 0 }}
          transition={{
            type: "spring",
            stiffness: 100,
            delay: 0.5,
            duration: 3,
          }}
          className="w-[15rem] hidden md:block  absolute right-[14%]"
        >
          <Lottie animationData={Smily} />
        </motion.div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 0.9 }}
          transition={{
            delay: 0.2,
            duration: 3,
            type: "spring",
            stiffness: 300,
            damping: 18,
          }}
          className={`one-one-Hero ${isDark?'one-one-Hero-Dark':''} -mt-[5rem] `} 
        >
          <SendMessages isDark={isDark}/>
          <div></div>
          <DisplayMessages isDark={isDark} />
        </motion.div>
      </div>
    </div>
  );
};

export default GroupChat;
