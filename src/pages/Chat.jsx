import client, {
  databases,
  DATABASES_ID,
  COLLECTIONS_ID_MESSAGE,
} from "../AppWrite/appwriteConfig.js";
import { AiFillDelete } from "react-icons/ai";
import { useState, useEffect } from "react";
import { ID, Query, Role, Permission } from "appwrite";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "../components/Chat-Sidebar/Sidebar.jsx";
import { Loader } from "@react-three/drei";


const Chat = () => {

  //------------------states--------------------
  const [messages, setMessages] = useState([]);
  const [messageBody, setMessageBody] = useState("");
  const [visibleDeleteMessages, setVisibleDeleteMessages] = useState(false);
  const [selectedMessage, setSelectedMessages] = useState("");
  const navigate = useNavigate();

  const user = useSelector((state) => state.Chat.user);


  if (!user) return navigate("/login");
  // console.log("Welcome user", user[0].name);

  const getMessages = async () => {
    const response = await databases.listDocuments(
      DATABASES_ID,
      COLLECTIONS_ID_MESSAGE,
      [Query.orderDesc("$createdAt")]
    );
    console.log("response = ", response);
    setMessages(response.documents);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let payload = {
      body: messageBody,
      user_id: user[0].$id,
      username: user[0].name,
    };
    let permissions = [Permission.write(Role.user(user[0].$id))];
    let response = await databases.createDocument(
      DATABASES_ID,
      COLLECTIONS_ID_MESSAGE,
      ID.unique(),
      payload,
      permissions
    );
    setMessageBody("");
    console.log("created", response);
    // setMessages([response,...messages]);
  };

  useEffect(() => {
    getMessages();
    const unsubscribe = client.subscribe(
      `databases.${DATABASES_ID}.collections.${COLLECTIONS_ID_MESSAGE}.documents`,
      (response) => {
        // Callback will be executed on changes for documents A and all files.
        console.log("Real Time Res", response);
        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.create"
          )
        ) {
          setMessages((prevState) => [response.payload, ...prevState]);
          console.log("A message was sent");
        }
        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.delete"
          )
        ) {
          setMessages((messages) =>
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
  

  const deleteMessages = async (message_id) => {
    const response = await databases.deleteDocument(
      DATABASES_ID,
      COLLECTIONS_ID_MESSAGE,
      message_id
    );
    // setMessages(prevState => messages.filter(message => message.$id!== message_id))
    console.log("deleted", response);
  };

  const handleDoubleClick = (message) => {
    setVisibleDeleteMessages((prev) => !prev);
    console.log("handleDoubleClick", visibleDeleteMessages);
    setSelectedMessages(message);
  };


  return (
    <div className="chat" id="group">

    <div className="container p-5">
    <div className="h-[2rem] pt-1 absolute top-0 left-1">
        <Sidebar/>
      </div>

      {/* <ImageUpload/> */}
      <div className="w-[100vw] absolute text-center  left-0 text-xl flex p-2 justify-center top-7 text-white font-semibold    ">
        welcome to chat <span></span>
        {user && (
          <span className="text-red-400 capitalize ml-4 ">{user[0].name} </span>
        )}
      </div>
      
      <div className="room--container bg-tran">
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
            <button className="btn  one-btn select-none" type="submit" >SEND</button>
          </div>
        </form>
        <div className='messages'>
          {messages.length !== 0 ? (
            messages.map((message) => (
              <div
                onDoubleClick={() => handleDoubleClick(message)}
                className="message--wrapper"
                key={message.$id}
              >
                <div className="message--header">
                  <p>
                    {message?.username ? (
                      <span className="message--name--owner capitalize text-gray-400 font-bold">
                        {user[0].name !== message.username
                          ? message.username
                          : null}
                      </span>
                    ) : (
                      <span className="capitalize text-gray-400 font-semibold">
                        Anonymous user
                      </span>
                    )}
                  </p>
                  {visibleDeleteMessages &&
                    selectedMessage &&
                    selectedMessage.$id === message.$id && (
                      <div >
                        <small className="message-timestamp">
                          {" "}
                          {new Date(message.$createdAt).toLocaleString()}
                        </small>
                        <button
                          className="delete--btn px-2  rounded-xl   text-2xl hover:scale-x-90  font-semibold duration-700 focus:outline-none focus:ring  text-red-500"
                          onClick={() => deleteMessages(message.$id)}
                        >
                          {message.$permissions.includes(
                            `delete(\"user:${user[0].$id}\")`
                          ) && <AiFillDelete className="delete--btn" />}
                        </button>
                      </div>
                    )}
                </div>

                {message.$permissions.includes(
                  `delete(\"user:${user[0].$id}\")`
                ) ? (
                  <div className={` message--body--owner cursor-pointer `}>
                    <span></span>
                    <span>{message.body}</span>
                  </div>
                ) : (
                  <div className={` message--body cursor-pointer`}>
                    <span>{message.body}</span>
                  </div>
                )}
              </div>
            ))
          ) : (
            <Loader/>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default Chat;
