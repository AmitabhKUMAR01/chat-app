import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import phone from "../assets/HomepageMobile.json";
import {  motion } from "framer-motion";

import "react-vertical-timeline-component/style.min.css";

import LoginButton from "../components/HomeComponent/LoginButton";
import RegisterButton from "../components/HomeComponent/RegisterButton";
import MidSection from "../components/HomeComponent/MidSection";
import BottomSection from "../components/HomeComponent/BottomSection";
import logo from '../assets/logo.png'

const Home = () => {
  const user = useSelector((state) => state.Chat.user);
  
  console.log("uuser", user);

  return (
    <div className="bg- min-h-[100vh] z-0 ">
      <div className="navbar">
        <div className="h-[5vh] w-[90vw] items-left m-auto text-gray-900 capitalize sm:text-sm text-[.6rem]  z-0 justify-around">
            <span>
              <img className="w-[5rem] " src={logo} alt="" />
            </span>
         
        </div>
      </div>
      <div className="flex sm:flex-row flex-col-reverse w-[90%] justify-center h-[80vh] sm:mt-0 mt-[4rem]  items-center m-auto">
        <div className="sm:w-[40%] w-[90%]  flex flex-col space-y-8">
          <h1
            className="sm:text-3xl text-xl font-semibold  text-gray-900 "
            style={{ color: "#7620b3" }}
          >
            Not your Average <br /> Messaging Web App
          </h1>
          <p className="sm:text-sm text-[.8rem] " style={{ color: "#404345" }}>
            Privacy-Driven Chat with Robust Encryption. Securely Connect and
            Chat with Encrypted Communication. Experience the ultimate privacy
            and security in your messaging
          </p>
          <div className=" flex gap-4 flex-row">
           <RegisterButton/>
           <LoginButton/>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: "30vw" }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            type: "spring",
            stiffness: 300,
            duration: 20,
            delay:.6,
            repeatType: "reverse",
          }}
          whileHover={{ scale: 1.2 }}
          className="box  sm:w-[35rem]   sm:h-[25rem] w-[20rem] h-[20rem]"
        >
          <Lottie animationData={phone} />
        </motion.div>
      </div>
      <div
        className="w-[100vw]  text-center text-4xl capitalize mt-20 font-semibold"
        style={{ color: `rgb(233, 30, 99)` }}
      >
        <h1>our process</h1>
      </div>
      <MidSection/>
      {/* --------------------bottom------------ */}

        <BottomSection/>
     
    </div>

  );
};

export default Home;
