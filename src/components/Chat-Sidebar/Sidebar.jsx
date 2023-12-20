import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import CreateGroup from "../GroupChat/CreateGroup";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { AiOutlineClose } from "react-icons/ai";
import { LogoutUser } from "../../Redux/ChatSlice"
import { useDispatch } from "react-redux";
const Sidebar = () => {
  const [click, setClick] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  
  const HandleLogOut=()=>{

    dispatch(LogoutUser());
    localStorage.setItem("myPassword", null);
    localStorage.setItem("myEmail", null);
    

  
  }

  const variants = {
    open: { opacity: 1, x: 0, rotate: 0, y: 25 },
    closed: { opacity: 0.5, x: "-100vw", rotate: 180, scale: 0 },
  };
  const burger = {
    open: { rotate: 90, color: "red", scale: 0.9 },
    closed: { rotate: 0, color: "black", scale: 1 },
  };
  return (
    <div
      className={`absolute left-5  bg-transparent rounded-lg ${
        click ? "h-[100vh]" : "h-[1rem]"
      }  z-50 w-[5rem]`}
    >
      <motion.div
        onClick={() => setClick((prev) => !prev)}
        className="text-2xl w-5 hover:text-green-500 "
        animate={click ? "open" : "closed"}
        whileHover={{ scale: 1.3, color: "green" }}
        transition={{
          duration: 2,
          delay: 0.1,
          type: "spring",
          stiffness: 350,
        }}
        variants={burger}
      >
        {click ? <AiOutlineClose /> : <RxHamburgerMenu />}
      </motion.div>
      <Tilt className={` ${click ? "block" : "hidden"} min-w-max`}>
        <motion.div
          className="w-[13rem] rounded-xl "
          style={{ background: "rgba(4, 17, 44, 1)" }}
          animate={click ? "open" : "closed"}
          transition={{
            duration: 1,
            delay: 0.1,
            type: "spring",
            stiffness: 50,
          }}
          variants={variants}
        >
          <ul className=" p-6 m-3 transition-all  duration-1000 font-xl ">
            <motion.li
              whileHover={{ originX: 0, color: "#FFF5A1" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* <a className="mb-3 bg-gradient-to-r from-fuchsia-500 to-cyan-500 bg-clip-text text-transparent hover:text-white  transition-colors duration-300 cursor-pointer">create group</a> */}
              {location.pathname === "/group" ? <CreateGroup /> : null}
            </motion.li>
            <motion.li
              whileHover={{ scale: 1.3, originX: 0, color: "#FFF5A1" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link className="mb-3 " to={"/one"}>
                Chat
              </Link>
            </motion.li>
            <motion.li
              whileHover={{ scale: 1.3, originX: 0, color: "#FFF5A1" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link className="mb-3 " to={"/group"}>
                Group Chat
              </Link>
            </motion.li>
        <motion.li
              whileHover={{ scale: 1.3, originX: 0, color: "#FFF5A1" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link className="mb-3 " to={"/chat"}>
                Random Chat
              </Link>
            </motion.li>
            <motion.li
              whileHover={{ scale: 1.3, originX: 0, color: "#FFF5A1" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link className="mb-3 " to={"/todos"}>
                Todos
              </Link>
            </motion.li>
            <motion.li
              whileHover={{ scale: 1.3, originX: 0, color: "#FFF5A1" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link className="mb-3 " onClick={HandleLogOut} to={"/login"}>
                Logout
              </Link>
            </motion.li>
            <motion.li
              whileHover={{ scale: 1.3, originX: 0, color: "#FFF5A1" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link className="mb-3 " to={"/register"}>
                Register
              </Link>
            </motion.li>


            <motion.li
              whileHover={{ scale: 1.3, originX: 0, color: "#FFF5A1" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link className="mb-3" to={"/img"}>
                upload image
                </Link>
            </motion.li>
          </ul>
        </motion.div>
      </Tilt>
    </div>
  );
};

export default Sidebar;
