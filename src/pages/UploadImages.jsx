import { Link } from "react-router-dom";
import ImageUploader from "../components/ImageUploader";

const UploadImages = () => {
  return (
   <div className="bg-black w-[100vw] h-[100vh] flex flex-col items-center text-center justify-center border-2 ">
 <ImageUploader type="profile"/>
    <Link className="px-5 mt-5 rounded-sm font-semibold  hover:opacity-75 bg-gray-800 " to={'/chat'}>skip</Link>
   </div>
  )
}

export default UploadImages