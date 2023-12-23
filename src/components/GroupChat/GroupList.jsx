import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TiGroup } from "react-icons/ti";
import { getGroupList } from "../../Redux/GroupChatSlice";
import { SelectGroup } from "../../Redux/GroupChatSlice";
import { motion } from "framer-motion";
import "reactjs-popup/dist/index.css";
const GroupList = () => {
  const dispatch = useDispatch();
  const GroupList = useSelector((state) => state.GroupChat.GroupList);
  const [isGroupListOpen, setIsGroupListOpen] = useState(false);
  const variants = {
    open: { scale: 0.9, y: 0, x: 0 },
    closed: { scale: 0, rotate: -60 },
  };
  useEffect(() => {
    dispatch(getGroupList());
    dispatch(SelectGroup({ id: 0, groupname: "none" }));
    console.log(" i have been called", GroupList);
  }, []);

  return (
    <div className="absolute right-0  sm:w-[10rem] top-0 sm:bg-transparent w-[5rem]  h-[5rem]">
      <button
        className="sm:absolute fixed sm:top-0 bottom-[5rem] left-0 bg-transparent  text-2xl text-blue-500 hover:text-green-500 "
        id="mybutton"
        onClick={() => setIsGroupListOpen((prev) => !prev)}
      >
        <TiGroup />
      </button>
      {
        <motion.div
          className="p-2 absolute z-50 left-40"
          animate={isGroupListOpen ? "open" : "closed"}
          transition={{
            duration: 3.5,
            delay: 0.1,
            type: "spring",
            stiffness: 180,
            damping: 18,
          }}
          variants={variants}
        >
          {GroupList.length !== 0 && isGroupListOpen ? (
            <div className="absolute mt-[5rem] right-[2vw] w-[15rem] p-[2rem] h-[40vh] overflow-scroll  bg-gradient-to-r from-white to-blue-50 text-black font-bold rounded-xl  groupList ">
              {GroupList.map((group, i) => (
                <h1
                  onClick={() => {
                    dispatch(
                      SelectGroup({
                        id: group.GROUP_ID,
                        groupname: group.GROUP_NAME,
                      })
                    );
                    setIsGroupListOpen(false);
                  }}
                  className="cursor-pointer hover:text-red-500"
                  key={i}
                >
                  {group.GROUP_NAME}
                </h1>
              ))}
            </div>
          ) : null}
        </motion.div>
      }
    </div>
  );
};

export default GroupList;
