import { useDispatch, useSelector } from "react-redux"
import UserList from "../One2One/UsersList";
import { useEffect, useState } from "react";
import { databases,DATABASES_ID,GROUP_LIST_COLLECTION_ID } from "../../AppWrite/appwriteConfig";
import { ID,Permission,Role } from "appwrite";
import './myStyles.scss'

const CreateGroup = () => {
    const disptach = useDispatch();
    const groupUsers = useSelector((state)=>state.OneOne.groupUsers)
    // const [numberOfUsers,setNumberOfUsers] =useState(0)
    const user = useSelector((state) => state.Chat.user);
    const [GroupName,setGroupName] = useState('')
    const [GroupId,setGroupId] = useState();
    const [isCreateGroupOpen,setIsCreateGroupOpen] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        let payload = {
            GROUP_NAME: GroupName,
            Creator_Id: user[0].$id,
            GROUP_ID: groupUsers.map((user) => user.id).join('')+user[0].$id,
          
          
        };
        let permissions = [Permission.write(Role.user(user[0].$id))];
        if(GroupName.length > 0){

            let response = await databases.createDocument(
              DATABASES_ID,
              GROUP_LIST_COLLECTION_ID,
              ID.unique(),
              payload,
              permissions
            );
            console.log(response,'group has been created');
           
          }
        }

    
    

    useEffect(()=>{
        console.log('usersrdsf',groupUsers)
        // setGroupId(groupUsers.map(user=>user.id));
    },[])
    const sidebarStyles = {
        transform: isCreateGroupOpen ? "translateX(-120%)" : "translateX(-20%)",
        transition: "transform 5s ease-in-out",
        width: "250px",
      };
  return (
    
    <div className="  z-50 ">
        <button className="" onClick={()=>setIsCreateGroupOpen(prev=>!prev)}>create group</button>
        {isCreateGroupOpen &&
        
        <div className={`${isCreateGroupOpen?'isOpen ':'isClose'} absolute max-w-fit min-h-fit border-2 `} >
            <div className="z-50 w-[5vw] h-[1rem] ">
            <UserList select="group"/>
            </div>        
            <input className="mt-[2rem]" type="text" placeholder="Enter Group name" onChange={(e)=>{
                setGroupName(e.target.value)
            }}/>
            <ul>
                {groupUsers.map((user)=>(
                    <li key={user.id} className="hover:text-black cursor-pointer">
                        {user.username}
                    </li>
                ))}
            </ul>
        <button className="bg-zinc-300 rounded-lg text-black p-2 hover:scale-110" onClick={(e)=>handleSubmit(e)}>Create</button>
        </div>
        }
    </div>
    
  )
}

export default CreateGroup