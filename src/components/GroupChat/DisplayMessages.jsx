import { useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiFillDelete } from "react-icons/ai";
import { deleteMessage } from "../../Redux/OneOneChatSlice";
import { InfinitySpin } from "react-loader-spinner";
import useRealTime from "../One2One/useRealTime";
const DisplayMessages = ({isDark}) => {
  const dispatch = useDispatch();
  const selectedGroup = useSelector((state) => state.GroupChat.selectedGroup);
  const user = useSelector((state) => state.Chat.user)[0];
  const [visibleDeleteMessages, setVisibleDeleteMessages] = useState(false);
  const [selectedMessage, setSelectedMessages] = useState("");
  const {Messages,isLoading} = useRealTime(user,'group')
  const handleDoubleClick = (message) => {
    setVisibleDeleteMessages((prev) => !prev);
    console.log("handleDoubleClick", visibleDeleteMessages);
    setSelectedMessages(message);
  };
  return (
    <>
      <div className="messages">
        {Messages.length !== 0 && !isLoading ? (
          Messages.map(
            (message) =>
              message.group_name === selectedGroup.groupname && (
                <div
                  onDoubleClick={() => handleDoubleClick(message)}
                  className="message--wrapper"
                  key={message.$id}
                >
                  <div className="message--header">
                    <p>
                      {message?.sender_name ? (
                        <span className="message--name--owner capitalize text-gray-700 font-bold">
                          {user.$id !== message.sender_id
                            ? message.sender_name
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

                  {selectedGroup.id.includes(user.$id) ? (
                    <div
                      className={`${
                        user.$id === message.sender_id
                        ? `${isDark?'message--body--owner--dark':'message--body--owner'}`
                        : ` ${isDark?'message--body--dark':'message--body'}`
                      }`}
                    >
                      <span></span>
                      <span>{message.body}</span>
                    </div>
                  ) : null}
                </div>
              )
          )
        ) : (
          <div className="absolute z-50 top-[40%] sm:left-[35%] left-[20%] text-center">
            <InfinitySpin width="200" color="#4fa94d" />
            <h1 className="bg-green-500 ">Choose Your Chat</h1>
          </div>
        )}
      </div>
    </>
  );
};
export default DisplayMessages;
