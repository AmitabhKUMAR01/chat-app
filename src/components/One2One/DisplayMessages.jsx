import { useState,useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AiFillDelete } from "react-icons/ai";
import Loader from "../Loader";
import { deleteMessage } from "../../Redux/OneOneChatSlice";
import client, { DATABASES_ID,ONE_MESSAGE_COLLECTION } from "../../AppWrite/appwriteConfig";
import { RemoveMessages, SetMessages, getMessages } from "../../Redux/OneOneChatSlice";
import { InfinitySpin } from "react-loader-spinner";
const DisplayMessages = () => {
  const [selectedMessage, setSelectedMessages] = useState("");
    const dispatch =useDispatch();
    const userId= useSelector((state)=>state.OneOne.selectedUser.id)
    
    const Messages= useSelector((state)=>state.OneOne.Messages)
    
    const user = useSelector((state) => state.Chat.user);
    
    const [visibleDeleteMessages, setVisibleDeleteMessages] = useState(false);
    const [MMessages,setMMessages] = useState([])
    
useEffect(()=>{
  setMMessages(Messages);
},[userId])
   
    
    const handleDoubleClick = (message) => {
      setVisibleDeleteMessages((prev) => !prev);
      console.log("handleDoubleClick", visibleDeleteMessages);
      setSelectedMessages(message);
    };
    useEffect(() => {
      dispatch(getMessages());
    const unsubscribe = client.subscribe(
      `databases.${DATABASES_ID}.collections.${ONE_MESSAGE_COLLECTION}.documents`,
      (response) => {
        
        console.log("Real Time Res", response);
        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.create"
          )
        ) {
          setMMessages((prevState) => [response.payload, ...prevState]);
          dispatch(SetMessages(response.payload))
          console.log("A message was sent");
        }
        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.delete"
          )
        ) {
         
          dispatch(RemoveMessages(response.payload.$id));
          setMMessages((messages) =>
          messages.filter((message) => message.$id !== response.payload.$id)
        );
          console.log("A message was Deleted");
        }
        console.log("i am the user ", user);
      }
    );
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
    
    
    
    <div className="messages">
    {MMessages.length !== 0 ? (
      MMessages.map((message) => (
        <div
          onClick={() => handleDoubleClick(message)}
          className="message--wrapper"
          key={message.$id}
        >
          <div className="message--header">
            <p>
              {message?.username ? (
                <span className="message--name--owner capitalize text-gray-400 font-bold">
                  {userId+user[0].$id === message.unique_msg_02 
                    ? message.username
                    : ''}
                </span>
              ) : (
                <span className="capitalize text-gray-400 font-semibold">
                  Anonymous user
                </span>
              )}
            </p>
            { visibleDeleteMessages &&
              selectedMessage &&
              selectedMessage.$id === message.$id && (
                <div>
                  <small className="message-timestamp">
                    {" "}
                    {new Date(message.$createdAt).toLocaleString()}
                  </small>
                  <button
                    className="delete--btn px-2  rounded-xl   text-2xl hover:scale-x-90  font-semibold duration-700 focus:outline-none focus:ring  text-red-500"
                    onClick={() => {dispatch(deleteMessage(message.$id))
                      console.log("message deleted",message);
                    }}
                  >
                    {message.$permissions.includes(
                      `delete(\"user:${user[0].$id}\")`
                    ) && <AiFillDelete className="delete--btn" />}
                  </button>
                </div>
              )}
          </div>

         
      {userId+user[0].$id === message.unique_msg_01 || user[0].$id+userId===message.unique_msg_01 ? ( // Check if the message is from the selected user
        <div className={`${userId+user[0].$id === message.unique_msg_02 ?'message--body':'message--body--owner'}`}>
          <span></span>
          <span>{message.body}</span>
        </div>
      ) : (
        null
      )}
        </div>
      ))
    ) : (
      <div className='absolute z-50 top-[40%] sm:left-[35%] left-[20%] text-center'>
        <InfinitySpin 
  width='200'
  color="#4fa94d"
/>
<h1 className="bg-green-500 ">Choose Your Chat</h1>
      </div>
    )}
    
  </div>
    </>
  )
}

export default DisplayMessages