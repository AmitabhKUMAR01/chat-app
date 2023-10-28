import { useState } from "react";
import {databases,DATABASES_ID,ONE_MESSAGE_COLLECTION} from '../../AppWrite/appwriteConfig'
import { Role,Permission,ID } from 'appwrite';

import { useDispatch,useSelector } from "react-redux";

const SendMessages = () => {
  
    const [messageBody, setMessageBody] = useState("");
    const [isRealTime,setIsRealTime] = useState(false)
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
      <textarea
        required
        maxLength={"1000"}
        placeholder="say something"
        onChange={(e) => setMessageBody(e.target.value)}
        value={messageBody}
      >
        {" "}
      </textarea>
    </div>
    <div className="send-btn--wrapper">
      <input className="btn btn--secondary" type="submit" value="Send" />
    </div>
  </form>
  
  )
}

export default SendMessages