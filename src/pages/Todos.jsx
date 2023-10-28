import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddTodo, RemoveTodo } from "../Redux/TodoSlice";
import {
  AiFillDelete,
  AiOutlineCheck,
  AiOutlineCheckCircle,
  AiOutlinePlus,
} from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import client, { databases } from "../AppWrite/appwriteConfig";
import {
  TODO_COLLECTIONS_ID_MESSAGE,
  TODO_DATABASES_ID,
} from "../AppWrite/appwriteConfig";
import { Query, ID, Permission, Role } from "appwrite";

const Todos = () => {
  const [input, setInput] = useState("");
  const [editText, setEditText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [completed, setCompleted] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.Chat.user);
  async function handleAdd(e) {
    if (input.length) dispatch(AddTodo(input));

    e.preventDefault();
    let payload = {
      todos: input,
      user_id: user[0].$id,
      username: user[0].name,
      completed: false,
      isEditable: false,
    };
    let permissions = [Permission.write(Role.user(user[0].$id))];
    let response = await databases.createDocument(
      TODO_DATABASES_ID,
      TODO_COLLECTIONS_ID_MESSAGE,
      ID.unique(),
      payload,
      permissions
    );

    console.log("created Todo", response);
    setInput("");
  }
  async function handleDelete(id) {
    dispatch(RemoveTodo(id));

    const response = await databases.deleteDocument(
      TODO_DATABASES_ID,
      TODO_COLLECTIONS_ID_MESSAGE,
      id
    );
    console.log("mid = ", id);

    console.log("deleted", response);
  }
  function handleEdit(todo, value) {
    const promise = databases.updateDocument(
      TODO_DATABASES_ID,
      TODO_COLLECTIONS_ID_MESSAGE,
      todo.$id,
      { isEditable: !value }
    );
    promise.then(() => {
      setIsEditable((prev) => !prev);
      console.log("my Edits=================-", promise);
    });
  }

  function saveEdit(todo) {
    if (editText.length) {
      const promise = databases.updateDocument(
        TODO_DATABASES_ID,
        TODO_COLLECTIONS_ID_MESSAGE,
        todo.$id,
        { isEditable: !todo.isEditable, todos: editText }
      );
      promise.then((res) => {
        console.log("save document --------------------------------", res);
        setIsEditable((prev) => !prev);
      });

      setEditText("");
      setEditingId(null);
    }
  }
  function handleCompleted(todo, value) {
    const promise = databases.updateDocument(
      TODO_DATABASES_ID,
      TODO_COLLECTIONS_ID_MESSAGE,
      todo.$id,
      { completed: !value }
    );
    promise.then(() => setCompleted((prev) => !prev));
    console.log("my", promise);
  }
  const getMessages = async () => {
    const response = await databases.listDocuments(
      TODO_DATABASES_ID,
      TODO_COLLECTIONS_ID_MESSAGE,
      [Query.orderDesc("$createdAt")]
    );
    console.log("Todos response = ", response);
    setMessages(response.documents);
    console.log("Todos response =>>>> ", messages);
  };

  useEffect(() => {
    getMessages();
    const unsubscribe = client.subscribe(
      `databases.${TODO_DATABASES_ID}.collections.${TODO_COLLECTIONS_ID_MESSAGE}.documents`,
      (response) => {
        // Callback will be executed on changes for documents A and all files.
        console.log("RealODO ==== Res", response);
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
    console.log("user inside todos", user);
    return () => {
      unsubscribe();
    };
  }, [user, completed, isEditable]);

  return (
    <div className="bg-green-300 min-h-[100vh] w-[100vw] grid justify-center overflow-x-hidden bg-gradient-to-tr from-pink-500 to-indigo-800 ">
      <div className=" sm:w-[70vw]  w-[90vw] sm:h-[10rem] h-[5rem] flex justify-between sm:mt-8 mt-5 items-center text-center mx-2">
        <form className="flex sm:min-w-full  sm:p-0 p-5">
          <input
            className="sm:w-[20rem] bg-gray-200 w-[70vw] pl-2   sm:mx-2 mr-2  hover:bg-white rounded-md  outline-0 hover:border-2 hover:border-emerald-300 duration-600 transition-all  bg-gradient-to-r from-slate-900 to-slate-700 "
            type="text"
            value={input}
            placeholder="Enter your Todo ...."
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            className="bg-violet-500 px-3 py-2 text-lg font-bold  rounded-xl  active:bg-violet-700 hover:scale-x-90 text-white hover:text-red-500  hover:bg-white duration-1000 focus:outline-none focus:ring focus:ring-violet-300  "
            type="submit"
            onClick={(e) => handleAdd(e)}
          >
            <AiOutlinePlus />
          </button>
        </form>
          {/* <div className="min-w-[10rem] flex text-left text-4xl border-2"></div> */}
      </div>
      <div className="w-[90vw] overflow-x-hidden  items-center justify-center">
        {messages.length !== 0 &&
          messages.map(
            (todo, i) =>
              user[0].$id === todo.user_id && (
                <ul
                  key={i}
                  className="sm:flex  sm:space-x-2  sm:py-6 py-4 my-3  sm:m-4 font-semibold text-sky-600 bg-emerald-400 sm:px-24 px-5  rounded-md bg-gradient-to-r from-slate-900 to-slate-700  hover:from-red-600 hover:to-violet-700 w-[90vw]"
                >
                  {todo.isEditable ? (
                    <li className="flex  flex-col sm:flex-row space-y-3 ">
                      <input
                        type="text"
                        className="sm:w-[20rem] rounded-full pl-2 sm:px-[1rem] sm:mx-10 hover:bg-violet-600 hover:text-white  outline-0 hover:scale-105 duration-1000 transition-all "
                        value={editText}
                        placeholder={todo.text}
                        onChange={(e) => setEditText(e.target.value)}
                      />
                      <button
                        className="bg-red-500 sm:px-9 px-3 text-start text-2xl py-1  w-[3rem] rounded-xl hover:bg-violet-600 active:bg-violet-700 hover:scale-x-90 text-white  duration-1000  focus:outline-none focus:ring focus:ring-violet-300  font-bold"
                        onClick={() => saveEdit(todo)}
                      >
                        <AiOutlineCheck />
                      </button>
                    </li>
                  ) : (
                    <li
                      className={`sm:min-w-[20rem] flex ${
                        todo.completed
                          ? "bg-green-500 line-through hover:text-white text-teal-600"
                          : "bg"
                      } items-center  text-white font-semibold py-1 px-1 rounded-md space-x-2`}
                    >
                      <button
                        className="w-[2rem] hover:text-red-500 hover:scale-x-110  transition-all duration-700 text-2xl"
                        onClick={() => handleCompleted(todo, todo.completed)}
                      >
                        <AiOutlineCheckCircle />
                      </button>
                      {todo.todos}
                    </li>
                  )}
                  <button
                    className=" sm:px-9 p-1  rounded-xl bg-white active:bg-violet-700 hover:scale-x-90  font-semibold duration-700 focus:outline-none focus:ring focus:ring-violet-300 text-red-500"
                    onClick={() => handleDelete(todo.$id)}
                  >
                    <AiFillDelete />
                  </button>
                  <button
                    className=" sm:px-9 p-1 ml-4 mt-2 rounded-xl  bg-white text-red-500 active:bg-violet-700 hover:scale-x-90 font-semibold duration-700 focus:outline-none focus:ring focus:ring-violet-300 "
                    onClick={() => handleEdit(todo, todo.isEditable)}
                  >
                    <FiEdit2 />
                  </button>
                </ul>
              )
          )}
      </div>
    </div>
  );
};

export default Todos;
