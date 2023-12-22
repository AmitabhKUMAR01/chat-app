import { useSelector } from "react-redux";

const WelcomeMessage = ({isDark}) => {
    const user = useSelector((state) => state.Chat.user);

    return (
        <div className={`w-[100vw] text-center   left-0 text-xl flex  justify-center  ${isDark?'text-white':'text-black'} font-semibold  `}>
        <h3>welcome </h3>
         <span></span>
         {user && (
           <span className="text-rose-700 capitalize ml-4 ">
             {user[0].name}{" "}
           </span>
         )}
       </div>
  )
}

export default WelcomeMessage