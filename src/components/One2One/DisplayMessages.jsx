import { useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiFillDelete } from "react-icons/ai";
import { deleteMessage } from "../../Redux/OneOneChatSlice";
import { RiChatSmile2Fill } from "react-icons/ri";
import { motion } from "framer-motion";
import { MESSAGE_IMAGE_BUCKET_ID } from "../../AppWrite/appwriteConfig";
import "react-loading-skeleton/dist/skeleton.css";
import useRealTime from "./useRealTime";
import Skeleton from "react-loading-skeleton";

const DisplayMessages = ({ isDark, user }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.OneOne.selectedUser.id);
  const { Messages,isLoading } = useRealTime(user,'one');
  const [visibleDeleteMessages, setVisibleDeleteMessages] = useState(false);
  const [selectedMessage, setSelectedMessages] = useState("");
  console.log('i am userId: ', userId);
  const handleDoubleClick = (message) => {
    setVisibleDeleteMessages((prev) => !prev);
    setSelectedMessages(message);
  };
  return (
    <>
      <div className="messages cursor-pointer">
        {Messages.length !== 0 && !isLoading? (
          Messages.map((message) => (
            <div
              onDoubleClick={() => handleDoubleClick(message)}
              className="message--wrapper"
              key={message.$id}
            >
              <div className="message--header">
                <p>
                  {message?.username ? (
                    <span className="message--name--owner capitalize text-gray-700 font-semibold ">
                      {userId + user.$id === message.unique_msg_02
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
                          `delete(\"user:${user.$id}\")`
                        ) && <AiFillDelete className="delete--btn" />}
                      </button>
                    </div>
                  )}
              </div>

              {userId + user.$id === message.unique_msg_01 ||
              user.$id + userId === message.unique_msg_01 ? (
                <div
                  className={`${
                    userId + user.$id === message.unique_msg_02
                      ? ` ${isDark ? "message--body--dark" : "message--body"}`
                      : `${
                          isDark
                            ? "message--body--owner--dark"
                            : "message--body--owner"
                        }`
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
          <motion.div
            initial={{ opacity: 0.2, rotateX: 90 }}
            animate={{ opacity: 1, rotateX: 0 }}
            transition={{
              type: "spring",
              duration: 2,
              delay: 0.2,
              repeatType: "reverse",
            }}
            className="w-full text-black  text-xl h-[50vh] flex flex-col items-center justify-center text-center font-semibold "
          >
          {!isLoading?(  <h1>
              Select Chat from <br />
              your Contact{" "}
            </h1>):(   <Skeleton
                count={10}
                width={"50vw"}
                height={"2rem"}
                className="mt-[2rem] ml-[2rem]"
                baseColor={"#d9d9d9"}
              />)}
            <motion.span
              initial={{ y: "5rem" }}
              animate={{ y: 0 }}
              transition={{
                type: "spring",
                stiffness: 200,
                duration: 3,
                delay: 0.5,
                repeatType: "reverse",
              }}
              className="text-3xl text-green-500 mt-5"
            >
              <RiChatSmile2Fill />
            </motion.span>
          </motion.div>
        )}
      </div>
    </>
  );
};
export default DisplayMessages;
