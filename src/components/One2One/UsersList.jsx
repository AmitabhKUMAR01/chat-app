// UserList.js
import  { useState, useEffect } from 'react';
import { getUsersList, SelectUser } from '../../Redux/OneOneChatSlice';
import { useDispatch, useSelector } from 'react-redux';
import {BiSolidContact} from 'react-icons/bi'
import Loader from '../Loader';
const UserList = () => {
  
    const dispatch = useDispatch();
    const UsersList= useSelector((state)=>state.OneOne.UsersList)
    const [isContactOpen,setIsContactOpen] =useState(false)
    const user = useSelector((state) => state.Chat.user);
 
    useEffect(()=>{
        dispatch(getUsersList());
        
    },[])
    
  return (
    <>
    <button className="absolute right-20 w-20 text-3xl hover:text-red-500"  onClick={()=>setIsContactOpen(prev=>!prev)}><BiSolidContact/></button>
   { isContactOpen&& <div className='p-2 absolute right-0'>
      {
      UsersList.length!==0 ?(
        <div className='absolute mt-[5rem] right-0 w-[8rem] p-[2rem] h-[30vh] overflow-scroll  bg-gradient-to-r from-sky-900 to-sky-700' >
            {UsersList.map((User)=>(
                <h1 
                onClick={()=>{
                    dispatch(SelectUser({id:User.User_ID,username:User.Usesrname}))
                    
                }
                
                } 
                className='cursor-pointer hover:text-red-500' key={User.User_ID}>{user[0].$id!==User.User_ID ?User.Username:''}</h1>
            ))}
        </div>
      )  :<Loader/>
    } 
    </div>}
    </>
  );
};

export default UserList;
