import DisplayMessages from "../components/GroupChat/DisplayMessages";
import GroupList from "../components/GroupChat/GroupList";
import SendMessages from "../components/GroupChat/SendMessages";
import Sidebar from "../components/Chat-Sidebar/Sidebar";
import { useSelector } from "react-redux";
import Lottie from "lottie-react";
import Robot from "../assets/robot.json";
import Smily from "../assets/smilyface.json";

import { motion } from "framer-motion";

const GroupChat = () => {
  const user = useSelector((state) => state.Chat.user);
  return (
    <div className="one-onechat " id="group">
      <div className="h-[5rem] pt-5">
        <Sidebar />
      </div>
      {/* <CreateGroup/> */}
      <GroupList />
      <div className="container">
        <div className="w-[100vw] absolute text-center  left-0 text-xl flex p-2 justify-center top-10 text-black font-semibold  ">
          welcome to chat <span></span>
          {user && (
            <span className="text-rose-700 capitalize ml-4 ">
              {user[0].name}{" "}
            </span>
          )}
        </div>
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
          className="w-[15rem] hidden md:block  absolute top-[10%] right-[14%]"
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
          className="room--container border-2 "
          id={"group--room"}
        >
          <SendMessages />
          <div></div>
          <DisplayMessages />
        </motion.div>
      </div>
      <div className="fixed bottom-10"></div>
    </div>
  );
};

export default GroupChat;
