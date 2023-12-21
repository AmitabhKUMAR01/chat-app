import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiFillDelete } from "react-icons/ai";
import { deleteMessage } from "../../Redux/OneOneChatSlice";
import { RiChatSmile2Fill } from "react-icons/ri";
import {motion} from 'framer-motion'
import client, {
  DATABASES_ID,
  MESSAGE_IMAGE_BUCKET_ID,
  ONE_MESSAGE_COLLECTION,
} from "../../AppWrite/appwriteConfig";
import {
  RemoveMessages,
  SetMessages,
  getMessages,
} from "../../Redux/OneOneChatSlice";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";

const DisplayMessages = () => {

  const dispatch = useDispatch();
  const userId = useSelector((state) => state.OneOne.selectedUser.id);
  const Messages = useSelector((state) => state.OneOne.Messages);
  const user = useSelector((state) => state.Chat.user);

  const [visibleDeleteMessages, setVisibleDeleteMessages] = useState(false);
  const [selectedMessage, setSelectedMessages] = useState("");
  const [MMessages, setMMessages] = useState([]);

  useEffect(() => {
    setMMessages(Messages);
  }, [userId]);

  const handleDoubleClick = (message) => {
    setVisibleDeleteMessages((prev) => !prev);
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
          dispatch(SetMessages(response.payload));
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
      <div className="messages cursor-pointer">
        {MMessages.length !== 0 ? (
          MMessages.map((message) => (
            <div
              onDoubleClick={() => handleDoubleClick(message)}
              className="message--wrapper"
              key={message.$id}
            >
              <div className="message--header">
                <p>
                  {message?.username ? (
                    <span className="message--name--owner capitalize text-gray-300 font-semibold ">
                      {userId + user[0].$id === message.unique_msg_02
                        ? message.username
                        : ""}
                    </span>
                  ) : null}
                </p>
                {visibleDeleteMessages &&
                  selectedMessage &&
                  selectedMessage.$id === message.$id && (
                    <div>
                      <small className="message-timestamp">
                        {" "}
                        {new Date(message.$createdAt).toLocaleString()}
                      </small>
                      <button
                        className="delete--btn px-2  rounded-xl   text-2xl hover:scale-x-90  font-semibold duration-700 focus:outline-none focus:ring  text-red-500"
                        onClick={() => {
                          dispatch(deleteMessage(message.$id));
                          console.log("message deleted", message);
                        }}
                      >
                        {message.$permissions.includes(
                          `delete(\"user:${user[0].$id}\")`
                        ) && <AiFillDelete className="delete--btn" />}
                      </button>
                    </div>
                  )}
              </div>

              {userId + user[0].$id === message.unique_msg_01 ||
              user[0].$id + userId === message.unique_msg_01 ? (
                <div
                  className={`${
                    userId + user[0].$id === message.unique_msg_02
                      ? "message--body"
                      : "message--body--owner"
                  }`}
                >
                  <span></span>
                  <div>
                    {message.body.includes(MESSAGE_IMAGE_BUCKET_ID) ? (
                      <a href={message.body} target="blank">
                        <img
                          className="w-[5rem] "
                          src={`${message.body}`}
                          alt="image"
                        />{" "}
                      </a>
                    ) : (
                      message.body
                    )}
                  </div>
                </div>
              ) : null}
            </div>
          ))
        ) : (
       <motion.div  initial={{ opacity: 0.2  ,rotateX:90}}
          animate={{ opacity: 1 ,rotateX:0}}
          transition={{
            type: "spring",
            duration: 2,
            delay:.2,
            repeatType: "reverse",
          }}
          className="w-full text-black  text-xl h-[50vh] flex flex-col items-center justify-center text-center font-semibold ">
        <h1 >Select Chat from <br />your Contact  </h1>
<motion.span initial={{y:'5rem'}} animate={{y:0}} transition={{type:"spring",stiffness:200,duration:3,delay:.5,repeatType:'reverse'}} className="text-3xl text-green-500 mt-5">
  <RiChatSmile2Fill/>
  </motion.span>
       </motion.div>
       )}
      </div>
    </>
  );
};

export default DisplayMessages;
