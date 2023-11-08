import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { LoginUser } from "../Redux/ChatSlice";
import Loader from "../components/Loader";
import Lottie from "lottie-react";
import phone from '../assets/smartphone.json'
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion"
import { AiFillEye, AiTwotoneEyeInvisible } from "react-icons/ai";

const LoginPage = () => {
  const dispatch = useDispatch();
  

const errorNotify = () => toast.error("Error ");

  const user = useSelector((state) => state.Chat.user);
  const isLoading = useSelector((state) => state.Chat.isLoading);

  const navigate = useNavigate();
  const [isPasswordVisible,setIsPasswordVisible] =useState(false)
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    console.log("i am authenticated", user);
    
    if (user) {
      navigate("/chat");
    }
  }, [user, navigate]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
    console.log(credentials);
  };

  const submitFom = (e) => {
    e.preventDefault();
    dispatch(LoginUser(credentials))
    .then((res)=>{
      console.log(res,'llllog in');
      if(res.type === "LoginUser/rejected"){
        errorNotify();
      }
     
    })
  
    
  };

  return (<div className="flex items-center sm:gap-5 sm:flex-row flex-col  ">
         <Toaster />

    <motion.div initial={{y:'-100vh',rotate:380}} animate={{y:0,rotate:0}} transition={{type:"spring",stiffness:80,delay:.1 ,duration:5}} className={`sm:w-[30vw] sm:h[40vh] ${isLoading?'hidden':'block'}`}>
    <Lottie animationData={phone}/>

    </motion.div>
    <motion.div initial={{x:'100vw'}} animate={{x:0}} transition={{type:"spring",stiffness:100,delay:.2 ,duration:.7}} className="auth--container max-w-full sm:mt-0 mt-[-5rem]  ">
      {!isLoading?<div className="form--wrapper">
        <form onSubmit={(e) => submitFom(e)}>
          <div className="field--wrapper">
            <label>Email</label>
            <input
              type="email"
              name="email"
              required
              placeholder="enter your email"
              value={credentials.email}
              onChange={handleChange}
            />
            <label>Password</label>
            <div className="flex text-center items-center logpass">

            <input
              type={isPasswordVisible?"password":'text'}
              name="password"
              id="pass"
              required
              placeholder="enter your password"
              value={credentials.password}
              onChange={handleChange}
            />
            <span className="text-2xl text-rose-600" onClick={()=>setIsPasswordVisible(prev=>!prev)}>
            {isPasswordVisible?<AiTwotoneEyeInvisible/>:<AiFillEye/>}
              </span>
            </div>
            <input
            
              type="submit"
              className="btn btn--lg btn--main"
              value="Login"
            />
          </div>
        </form>
        
      </div>:<Loader/>}
    </motion.div>
  </div>
  );
};

export default LoginPage;
