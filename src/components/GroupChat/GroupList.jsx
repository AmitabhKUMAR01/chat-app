
import  { useState, useEffect } from 'react';
// import {  SelectUser,SelectGroupUsers } from '../../Redux/OneOneChatSlice';
import { useDispatch, useSelector } from 'react-redux';
import {BiSolidContact} from 'react-icons/bi'
import Loader from '../Loader';
import { getGroupList } from '../../Redux/GroupChatSlice';
import { SelectGroup } from '../../Redux/GroupChatSlice';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
const GroupList = () => {
  
    const dispatch = useDispatch();
    const GroupList= useSelector((state)=>state.GroupChat.GroupList)
    const [isGroupListOpen,setIsGroupListOpen] =useState(false)
    const user = useSelector((state) => state.Chat.user);
 
    useEffect(()=>{
        dispatch(getGroupList());
        console.log(' i have been called',GroupList);
    },[])
    
  return (
    
    
    <div className='absolute right-0  sm:w-[10rem] top-0 sm:bg-transparent w-[5rem] border-2 h-[5rem]'>
    <button className="sm:absolute fixed sm:top-0 bottom-[5rem] left-0  text-2xl text-blue-500 hover:text-green-500 " id='mybutton' onClick={()=>setIsGroupListOpen(prev=>!prev)}><BiSolidContact/></button>
   {  <div className='p-2 absolute left-40'>
      {
      GroupList.length!==0 && isGroupListOpen?(
        <div className='absolute mt-[5rem] right-[2vw] w-[15rem] p-[2rem] h-[40vh] overflow-scroll  bg-gradient-to-r from-white to-blue-50 text-black font-bold rounded-xl border-2 groupList ' >
            {GroupList.map((group,i)=>(
                <h1 
                onClick={()=>{
                    dispatch(SelectGroup({id:group.GROUP_ID,groupname:group.GROUP_NAME	}))
                    // setIsContactOpen(false)
                    // dispatch(SelectGroupUsers());
                    
                }
                
                } 
                className='cursor-pointer hover:text-red-500' key={i}>{group.GROUP_NAME}</h1>
            ))}
        </div>
      )  :null
    } 
    </div>}
    </div>
  
  );
};

export default GroupList;
