import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ImageUploader from "../components/ImageUploader";
import Lottie from "lottie-react";
import phone from '../assets/smartphone.json'
const Home = () => {
  const user = useSelector((state) => state.Chat.user);
  console.log("uuser", user);
  

  return (
    <div className="bg-gradient-to-tr from-pink-500 to-indigo-800 min-h-[100vh] z-0 border-2 ">

      <div className="navbar">
        
        
        <div className="flex h-[15vh] z-0">
          <ul className="flex justify-around w-[100vw] font-bold">
            <li>
              <Link to={"/todos"}>Todos</Link>
            </li>
            <li>
              <Link to={"/login"}>Login</Link>
            </li>
            <li>
                <Link to={'/register'}>Register</Link>
            </li>
            <li>
              <Link to={"/chat"}>Chat</Link>
            </li>
            <li>
              <Link to={"/my"}>my</Link>
            </li>
            <li>
              <Link to={"/one"}>one</Link>
            </li>
          </ul>
        </div>
      </div>
      {/* <ImageUploader/> */}
      <div className="box  bg-green-400 w-[35rem] h-[25rem]">
          <Lottie animationData={phone}/>
      </div>
    </div>
  );
};

export default Home;
