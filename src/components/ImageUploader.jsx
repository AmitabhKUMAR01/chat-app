import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ID ,Permission,Role} from "appwrite";
import { USER_PROFILE_BUCKET_ID,MESSAGE_IMAGE_BUCKET_ID,ONE_MESSAGE_COLLECTION, storage,databases,USER_COLLECTIONS ,DATABASES_ID,PROJECT_ID,} from "../AppWrite/appwriteConfig";
import { getUsersList } from "../Redux/OneOneChatSlice";
import { AiOutlineCloudUpload } from "react-icons/ai";
import {useNavigate} from 'react-router-dom'
//type is used to distinguish between message image and profile image actions

const ImageUploader = ({type}) => {
  const [file, setFile] = useState(null);
  const dispatch=useDispatch()
  const user = useSelector((state) => state.Chat.user);
  const userId= useSelector((state)=>state.OneOne.selectedUser.id)
  const UsersList= useSelector((state)=>state.OneOne.UsersList)
  const [AllImages,setAllImages] = useState([]);
  const [user_Detail,setuser_Detail]= useState(null);
  const navigate= useNavigate();
  // const getAllImage = () => {
  //   const promise = storage.listFiles(USER_PROFILE_BUCKET_ID);
  //   promise.then(
  //     function (response) {
            
  //         setAllImages(response.files)
  //         console.log('whole file list =::',response.files); // Array of files in the bucket
  //     },
  //     function (error) {
  //       console.log(error); // Failure
  //     }
  //   );
  // };

  useEffect(()=>{
    
    
      dispatch(getUsersList());
      setTimeout(()=>{
        if(UsersList!==undefined)setuser_Detail( UsersList.filter((User)=>user[0].$id===User.User_ID));
      console.log('--------------------------------UserDetail',user_Detail);
      },5000)
      
      
  
  },[file])
  

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  // upload image to appwrite in profile section
  const uploadImageProfile = async () => {
    if (user) {
      const newImage = await storage.createFile(
        USER_PROFILE_BUCKET_ID,
        ID.unique(),
        file
      );
      let promise = databases.updateDocument(
        DATABASES_ID,
        USER_COLLECTIONS,
        user_Detail[0].$id,
        {'profile_url': `https://cloud.appwrite.io/v1/storage/buckets/${USER_PROFILE_BUCKET_ID}/files/${newImage.$id}/view?project=${PROJECT_ID}&mode=admin`}
       );
       promise.then(function () {
        navigate('/one')
}, function (error) {
    console.log(error); // Failure
});
      console.log('user iiiid',user[0].$id);
      console.log(newImage,'createdfdskjf',newImage.$userId);
      setFile('')
    } else {
      console.log("something went wrong");
    }
  };

  //// upload image to appwrite in message section
  const uploadImageMessage = async () => {
    // e.preventDefault();
    if (user) {
      const newImage = await storage.createFile(
        MESSAGE_IMAGE_BUCKET_ID,
        ID.unique(),
        file
      );
      let payload = {
        body: `https://cloud.appwrite.io/v1/storage/buckets/${MESSAGE_IMAGE_BUCKET_ID}/files/${newImage.$id}/view?project=${PROJECT_ID}&mode=admin`,
        user_id: user[0].$id,
        username: user[0].name,
        receiver_id: userId,
        unique_msg_01:userId+user[0].$id,
        unique_msg_02:user[0].$id+userId
      };
      let permissions = [Permission.write(Role.user(user[0].$id))];
      let promise = databases.createDocument(
        DATABASES_ID,
        ONE_MESSAGE_COLLECTION,
        ID.unique(),
        payload,
        permissions
        
       );
       promise.then(()=>{
         console.log('image uploaded user iiiid',user[0].$id);

       })
      console.log(newImage,'createdfdskjf oooh yeah',newImage.$userId);
      setFile('')
    } else {
      console.log("something went wrong");
    }
  };

  
  const handleUpload = async (e) => {
    e.preventDefault();
    if (file) {
      try {
        if(type==='profile')
        {

          uploadImageProfile();
        }else if(type=='message'){
          uploadImageMessage();
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    } else {
      console.error("No file selected");
    }
  };

  return (
    <div className=" ">
      <input
        type="file"
        accept="image/*"
        className="border-none  max-w-min bg-blue-500"
        onChange={(e) => handleFileChange(e)}
      />
      <button className="bg-green-500 p-1 text-2xl hover:bg-green-800 ml-5 z-50" onClick={(e) => handleUpload(e)}>
        <AiOutlineCloudUpload/>
      </button>
      <div>
     
      </div>
    </div>
  );
};

export default ImageUploader;
