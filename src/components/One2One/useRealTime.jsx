import { useState, useEffect } from "react";
import client from "../../AppWrite/appwriteConfig";
import {
  DATABASES_ID,
  ONE_MESSAGE_COLLECTION,
  databases,
  GROUP_MESSAGES_COLLECTION_ID,
} from "../../AppWrite/appwriteConfig";
import { Query } from "appwrite";
import { useSelector } from "react-redux";
const useRealTime = (user, type) => {
  const [Messages, setMessages] = useState([]);
  const [isLoading,setIsLoading] = useState(false);
  const userId = useSelector((state) => state.OneOne.selectedUser.id);
  const selectedGroup = useSelector((state) => state.GroupChat.selectedGroup);
  const getMessages = async () => {
    
    const response = await databases.listDocuments(
      DATABASES_ID,
      ONE_MESSAGE_COLLECTION,
      [
        Query.orderDesc("$createdAt"),
        Query.equal("user_id", [user.$id, userId]),
        Query.equal("receiver_id", [user.$id, userId]),
        Query.limit(100),
      ]
    );
    setMessages(response.documents);
    setIsLoading(false);
  };
  const getGroupMessages = async () => {
    const response = await databases.listDocuments(
      DATABASES_ID,
      GROUP_MESSAGES_COLLECTION_ID,
      [
        Query.orderDesc("$createdAt"),
        Query.equal("group_id", selectedGroup.id),
        Query.limit(100),
      ] 
    );
    setMessages(response.documents);
    setIsLoading(false);
  };
  useEffect(() => {
    if (type == "one") {
      getMessages();
    } else if (type == "group") {
      getGroupMessages();
    }
    setIsLoading(true);
    const unsubscribe = client.subscribe(
      `databases.${DATABASES_ID}.collections.${
        type == "one" ? ONE_MESSAGE_COLLECTION : GROUP_MESSAGES_COLLECTION_ID
      }.documents`,
      (response) => {
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
      }
    );
    return () => {
      unsubscribe();
    };
  }, [userId, selectedGroup.id]);
  return { Messages ,isLoading};
};
export default useRealTime;
