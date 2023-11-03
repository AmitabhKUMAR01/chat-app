import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import {RxHamburgerMenu} from 'react-icons/rx'
import CreateGroup from "../GroupChat/CreateGroup"

const Sidebar = () => {
    const [click,setClick] = useState(true)
    const location =useLocation()
    const sidebarStyles = {
        transform: click ? "translateX(-120%)" : "translateX(-20%)",
        transition: "transform 0.5s ease-in-out",
        width: "250px",
      };

    useEffect(()=>{
      console.log("my location",location.pathname);
    },[])
    
  return (
    <div className={`absolute left-5  bg-transparent rounded-lg h-[100vh] z-50 w-[5rem]`} >
        <div onClick={()=>setClick(prev=>!prev)} className="text-2xl w-5 hover:text-green-500 ">
           <RxHamburgerMenu/>
        </div>
        <div className="h-[80vh] p-6 m-3 transition-all duration-500 shadow-md shadow-gray-700  bg-gradient-to-l from-slate-900 to-grey-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-50 "
        style={sidebarStyles}>

        <ul className=" p-6 m-3 transition-all  duration-1000 font-bold ">
        <li>
                {/* <a className="mb-3 bg-gradient-to-r from-fuchsia-500 to-cyan-500 bg-clip-text text-transparent hover:text-white  transition-colors duration-300 cursor-pointer">create group</a> */}
                {location.pathname==='/group'?<CreateGroup/>:null}
            </li>
        <li>

                <Link  className="mb-3 bg-gradient-to-r from-fuchsia-500 to-cyan-500 bg-clip-text text-transparent hover:text-white  transition-colors duration-300 cursor-pointer" to={'/one'}>One to One Chat</Link>
            </li>
            <li>
                <Link  className="mb-3 bg-gradient-to-r from-fuchsia-500 to-cyan-500 bg-clip-text text-transparent hover:text-white  transition-colors duration-300 cursor-pointer" to={'/group'}>Group Chat</Link>
            </li>
            <li>
                <a  className="mb-3 bg-gradient-to-r from-fuchsia-500 to-cyan-500 bg-clip-text text-transparent hover:text-white  transition-colors duration-300 cursor-pointer">join group</a>
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
        
    </div>
  )
}

export default Sidebar