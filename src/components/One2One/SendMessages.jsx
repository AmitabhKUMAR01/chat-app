import { useState } from "react";
import {databases,DATABASES_ID,ONE_MESSAGE_COLLECTION} from '../../AppWrite/appwriteConfig'
import { Role,Permission,ID } from 'appwrite';
import { useSelector } from "react-redux";
import ImageUploader from "../ImageUploader";
import { AiOutlineUpload } from "react-icons/ai";
import Textarea from "../CommonComponents/Textarea";
import SubmitButton from "../CommonComponents/SubmitButton";
import '../../Sass/OneoneChat.scss'
const SendMessages = () => {
  
    const [messageBody, setMessageBody] = useState("");
    const [isRealTime,setIsRealTime] = useState(false)
    const [isUploadOpen,setIsUploadOpen] = useState(false)
    const userId= useSelector((state)=>state.OneOne.selectedUser.id)
    const user = useSelector((state) => state.Chat.user);
    
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        let payload = {
          body: messageBody,
          user_id: user[0].$id,
          username: user[0].name,
          receiver_id: userId,
          unique_msg_01:userId+user[0].$id,
          unique_msg_02:user[0].$id+userId
        };
        let permissions = [Permission.write(Role.user(user[0].$id))];
        let response = await databases.createDocument(
          DATABASES_ID,
          ONE_MESSAGE_COLLECTION,
          ID.unique(),
          payload,
          permissions
        );
        setMessageBody("");
        console.log("created", response);
        
        setIsRealTime(prev=>!prev);
        console.log("is Real Time", isRealTime);
      };

    
    

  return (
    
  <form id="message--form" onSubmit={handleSubmit}>
    <div>
      <div className={`flex flex-col`}>
        {isUploadOpen?<ImageUploader type="message"/>:null}
      <div className="flex  space-x-0" >

      <input type='text' placeholder='say something...' className="one-one-input" value={messageBody} onChange={(e)=>setMessageBody(e.target.value)}/>
      <button className="text-2xl max-w-min hover:text-green-500 text-red-500 z-50 ml-20" onClick={()=>setIsUploadOpen(prev=>!prev)}><AiOutlineUpload/></button>
      </div>
    </div>
      </div>
 <SubmitButton/>
  </form>
  
  )
}

export default SendMessages