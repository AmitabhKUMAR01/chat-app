import mobile2 from "../../assets/mobile3.png";
import LoginButton from "./LoginButton";
import RegisterButton from "./RegisterButton";


const BottomSection = () => {
  return (
    <div className="flex sm:flex-row flex-col items-center sm:w-[90vw]   m-auto justify-around   mt-20">
    <div className="sm:w-[30%] w-[90%]">
      <img src={mobile2} alt="" />
    </div>
    <div className="sm:w-[30%] w-[90%]">
      <h1 className="text-3xl font-semibold" style={{color:'#32c0f9'}}>
      Open Our Web <br /> App to Make it Easier
      </h1>
      <p className="text-black mt-8 text-sm" >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec lobortis lorem, a viverra ipsum. Aliquam commodo</p>
      <div className="flex gap-5 mt-2">
        <RegisterButton/>
        <LoginButton/>
      </div>
    </div>
</div>
  )
}

export default BottomSection