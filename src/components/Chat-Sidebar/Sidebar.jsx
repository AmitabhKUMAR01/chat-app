import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import CreateGroup from "../GroupChat/CreateGroup";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { AiOutlineClose } from "react-icons/ai";

const Sidebar = () => {
  const [click, setClick] = useState(false);
  const location = useLocation();
  

  useEffect(() => {
    console.log("my location", location.pathname);
  }, []);
  const variants = {
    open: { opacity: 1, x: 0, rotate: 0, y: 25 },
    closed: { opacity: 0.5, x: "-100vw", rotate: 180 },
  };
  const burger = {
    open: { rotate: 90 ,color: "red",scale:.9},
    closed: {  rotate: 0 ,color:'black',scale:1},
  };
  return (
    <div
      className={`absolute left-5  bg-transparent rounded-lg h-[100vh] z-50 w-[5rem]`}
    >
      <motion.div
        onClick={() => setClick((prev) => !prev)}
        className="text-2xl w-5 hover:text-green-500 "
        animate={click ? "open" : "closed"}
        whileHover={{scale:1.3,color:'green'}}
        transition={{
          duration: 2,
          delay: 0.1,
          type: "spring",
          stiffness: 350,
        }}
        variants={burger}
      >
        {click?<AiOutlineClose/>:<RxHamburgerMenu />}
      </motion.div>
      <Tilt>

      <motion.div
          className="w-[13rem] rounded-xl " style={{'background':'rgba(4, 17, 44, 1)'}}
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
          <motion.li whileHover={{  originX: 0, color: "#FFF5A1" }}
            transition={{ type: "spring", stiffness: 300 }}>
            {/* <a className="mb-3 bg-gradient-to-r from-fuchsia-500 to-cyan-500 bg-clip-text text-transparent hover:text-white  transition-colors duration-300 cursor-pointer">create group</a> */}
            {location.pathname === "/group" ? <CreateGroup /> : null}
          </motion.li>
          <motion.li
            whileHover={{ scale: 1.3, originX: 0, color: "#FFF5A1" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link
              className="mb-3 "
              to={"/one"}
            >
              One to One Chat
            </Link>
          </motion.li>
          <motion.li whileHover={{ scale: 1.3, originX: 0, color: "#FFF5A1" }}
            transition={{ type: "spring", stiffness: 300 }}>
            <Link
              className="mb-3 "
              to={"/group"}
            >
              Group Chat
            </Link>
          </motion.li >
          <motion.li className=" cursor-pointer select-none" whileHover={{ scale: 1.3, originX: 0, color: "#FFF5A1" }}
            transition={{ type: "spring", stiffness: 300 }}>
            <a className="mb-3 cursor-pointer select-none">
              join group
            </a>
          </motion.li>

          <motion.li whileHover={{ scale: 1.3, originX: 0, color: "#FFF5A1" }}
            transition={{ type: "spring", stiffness: 300 }}>
            <Link
              className="mb-3 "
              to={"/todos"}
            >
              Todos
            </Link>
          </motion.li>
          <motion.li whileHover={{ scale: 1.3, originX: 0, color: "#FFF5A1" }}
            transition={{ type: "spring", stiffness: 300 }}>
            <Link
              className="mb-3 "
              to={"/login"}
            >
              Login
            </Link>
          </motion.li>
          <motion.li whileHover={{ scale: 1.3, originX: 0, color: "#FFF5A1" }}
            transition={{ type: "spring", stiffness: 300 }}>
            <Link
              className="mb-3 "
              to={"/register"}
            >
              Register
            </Link>
          </motion.li>
          <motion.li whileHover={{ scale: 1.3, originX: 0, color: "#FFF5A1" }}
            transition={{ type: "spring", stiffness: 300 }}>
            <Link
              className="mb-3 "
              to={"/chat"}
            >
              Chat
            </Link>
          </motion.li>
          <motion.li  whileHover={{ scale: 1.3, originX: 0, color: "#FFF5A1" }}
            transition={{ type: "spring", stiffness: 300 }}>
            <Link
              className="mb-3"
              to={"/my"}
            >
              my
            </Link>
          </motion.li>
          <motion.li  whileHover={{ scale: 1.3, originX: 0, color: "#FFF5A1" }}
            transition={{ type: "spring", stiffness: 300 }}>
            <Link
              className="mb-3"
              to={"/one"}
            >
              one
            </Link>
          </motion.li>
          <motion.li  whileHover={{ scale: 1.3, originX: 0, color: "#FFF5A1" }}
            transition={{ type: "spring", stiffness: 300 }}>
            <Link
              className="mb-3"
              to={"/img"}
            >
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
