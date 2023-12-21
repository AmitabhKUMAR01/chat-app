import { useState, useEffect } from "react";
import {
  getUsersList,
  SelectUser,
  SelectGroupUsers,
} from "../../Redux/OneOneChatSlice";
import { useDispatch, useSelector } from "react-redux";
import { BiSolidContact } from "react-icons/bi";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { MdGroupAdd } from "react-icons/md";
import SearchSelect from "../SearchInput";
const UserList = ({ select }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const UsersList = useSelector((state) => state.OneOne.UsersList);
  const FilteredUserList = useSelector(
    (state) => state.OneOne.FilteredUserList
  );
  const [isContactOpen, setIsContactOpen] = useState(true);
  const user = useSelector((state) => state.Chat.user);
  const variants = {
    open: { scale: 1, y: 30, x: -20 },
    closed: { scale: 0, rotate: 60 },
  };
  useEffect(() => {
    dispatch(getUsersList());
    dispatch(SelectUser({ id: 0, username: "none" }));
    
  }, []);

  return (
    <div className=" z-50  ml-[80vw] ">
      <button
        className="user-list-btn    p-2 rounded-full  text-3xl"
        onClick={() => setIsContactOpen((prev) => !prev)}
      >
        {location.pathname === "/group" ? <MdGroupAdd /> : <BiSolidContact />}
      </button>
      <motion.div
        className="p-2 absolute right-0  top-[5rem]"
        animate={isContactOpen ? "open" : "closed"}
        transition={{
          delay: 0.1,
          type: "spring",
          stiffness: 100,
        }}
        variants={variants}
      >
        {isContactOpen && UsersList.length !== 0 ? (
          <div
            style={{ background: "rgba(4, 17, 44, 1)" }}
            className="user-list-card absolute   right-0 w-[12rem]  h-[40vh] overflow-scroll p-[.5rem] rounded-md"
          >
            <SearchSelect />
            {FilteredUserList.map((User) => (
              <div
                onClick={() => {
                  if (select === "user") {
                    dispatch(
                      SelectUser({ id: User.User_ID, username: User.Username })
                    );
                    setIsContactOpen(false);
                  } else {
                    dispatch(
                      SelectGroupUsers({
                        id: User.User_ID,
                        username: User.Username,
                      })
                    );
                  }
                }}
                className="cursor-pointer hover:text-red-500"
                key={User.User_ID}
              >
                {user[0].$id !== User.User_ID ? (
                  <div className="flex text-center items-center py-[1rem]">
                    <img
                      src={User.profile_url}
                      loading="lazy"
                      alt="profile"
                      className="w-[2rem]  border-[2px] border-black rounded-full "
                    />
                    <div className="flex flex-col text-left ml-2">
                      <h1>{User.Username}</h1>
                      <p className="text-[.7rem]  text-gray-300">{User.unque_name}</p>
                    </div>
                    
                    
                    
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        ) : null}
      </motion.div>
    </div>
  );
};

export default UserList;
