import { useState } from "react";
import {databases,DATABASES_ID,GROUP_MESSAGES_COLLECTION_ID} from '../../AppWrite/appwriteConfig'
import { Role,Permission,ID } from 'appwrite';

import { useDispatch,useSelector } from "react-redux";

const SendMessages = () => {
  
    const [messageBody, setMessageBody] = useState("");
    const [isRealTime,setIsRealTime] = useState(false)
    const groupId = useSelector((state)=>state.GroupChat.selectedGroup.id)
    const groupname = useSelector((state)=>state.GroupChat.selectedGroup.groupname)
    const user = useSelector((state) => state.Chat.user);
   
        
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        let payload = {
          body: messageBody,
          sender_id: user[0].$id,
          sender_name: user[0].name,
          group_id: groupId,
          group_name:groupname
        };
        let permissions = [Permission.write(Role.user(user[0].$id))];
        if(groupId.includes(user[0].$id)) {

          let response = await databases.createDocument(
            DATABASES_ID,
            GROUP_MESSAGES_COLLECTION_ID,
            ID.unique(),
            payload,
            permissions
            );
            console.log("created", response);
        }else{
          console.log("groupid = ",groupId,'userId',user[0].$id,groupId.includes(user[0].$id));
          console.log('you can not send the message');
        }
        setMessageBody('');
        
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
        className="h-[4rem]"
      >
        {" "}
      </textarea>
    </div>
    <div className="send-btn--wrapper">
        <div className="send-btn--wrapper">
            <button className="one-btn select-none" type="submit" >SEND</button>
          </div>
    </div>
  </form>
  
  )
}

export default SendMessages