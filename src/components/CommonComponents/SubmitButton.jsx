
import { IoIosSend } from "react-icons/io";
const SubmitButton = ({isDark}) => {
  return (
        <div className="w-100vw  flex justify-end text-right">
          <button className={`one-one-btn select-none ${isDark?'one-one-btn-dark':''}` }type="submit" >
          <span className="text-2xl">
            <IoIosSend/>
            </span>
          </button>
        </div> 
  )
}
export default SubmitButton