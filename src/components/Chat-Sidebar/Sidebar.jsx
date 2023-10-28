import { useState } from "react"
import { Link } from "react-router-dom"
import {AiFillHome} from 'react-icons/ai'

const Sidebar = () => {
    const [click,setClick] = useState(true)

    const sidebarStyles = {
        transform: click ? "translateX(-110%)" : "translateX(-10%)",
        transition: "transform 0.5s ease-in-out",
        width: "250px",
      };

      const overlayStyles = {
        opacity: click ? 0.1 : 0,
        pointerEvents: click ? "auto" : "none",
        transition: "opacity 0.3s ease-in-out",
        // position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        background: "rgba(0, 0, 0, 0.5)",
      };
    
  return (
    <div className={`absolute left-0 bg-transparent rounded-lg h-[100vh] z-50 `} >
        <div onClick={()=>setClick(prev=>!prev)}>
           <AiFillHome />
        </div>
        <div className="h-[80vh] p-6 m-3 transition-all duration-500 shadow-md shadow-gray-700  bg-gradient-to-l from-slate-900 to-grey-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-50 "
        style={sidebarStyles}>

        <ul className=" p-6 m-3 transition-all hover:scale-110 duration-1000 font-bold ">
        <li>
                <Link  className="mb-3 bg-gradient-to-r from-fuchsia-500 to-cyan-500 bg-clip-text text-transparent hover:text-white  transition-colors duration-300 cursor-pointer" to={'/one'}>One to One Chat</Link>
            </li>
            <li>
                <a  className="mb-3 bg-gradient-to-r from-fuchsia-500 to-cyan-500 bg-clip-text text-transparent hover:text-white  transition-colors duration-300 cursor-pointer">Group Chat</a>
            </li>
            <li>
                <a  className="mb-3 bg-gradient-to-r from-fuchsia-500 to-cyan-500 bg-clip-text text-transparent hover:text-white  transition-colors duration-300 cursor-pointer">join group</a>
            </li>
            <li>
                <a className="mb-3 bg-gradient-to-r from-fuchsia-500 to-cyan-500 bg-clip-text text-transparent hover:text-white  transition-colors duration-300 cursor-pointer">create group</a>
            </li>
            <li>
              <Link  className="mb-3 bg-gradient-to-r from-fuchsia-500 to-cyan-500 bg-clip-text text-transparent hover:text-white  transition-colors duration-300 cursor-pointer" to={"/todos"}>Todos</Link>
            </li>
            <li>
              <Link  className="mb-3 bg-gradient-to-r from-fuchsia-500 to-cyan-500 bg-clip-text text-transparent hover:text-white  transition-colors duration-300 cursor-pointer" to={"/login"}>Login</Link>
            </li>
            <li>
                <Link   className="mb-3 bg-gradient-to-r from-fuchsia-500 to-cyan-500 bg-clip-text text-transparent hover:text-white  transition-colors duration-300 cursor-pointer"  to={'/register'}>Register</Link>
            </li>
            <li>
              <Link   className="mb-3 bg-gradient-to-r from-fuchsia-500 to-cyan-500 bg-clip-text text-transparent hover:text-white  transition-colors duration-300 cursor-pointer" to={"/chat"}>Chat</Link>
            </li>
            <li>
              <Link  className="mb-3 bg-gradient-to-r from-fuchsia-500 to-cyan-500 bg-clip-text text-transparent hover:text-white  transition-colors duration-300 cursor-pointer"  to={"/my"}>my</Link>
            </li>
            <li>
              <Link   className="mb-3 bg-gradient-to-r from-fuchsia-500 to-cyan-500 bg-clip-text text-transparent hover:text-white  transition-colors duration-300 cursor-pointer" to={"/one"}>one</Link>
            </li>
        </ul>
        </div>
        <div style={overlayStyles}></div>
    </div>
  )
}

export default Sidebar