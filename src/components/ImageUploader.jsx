import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ID } from "appwrite";
import { USER_PROFILE_BUCKET_ID, storage,databases,USER_COLLECTIONS ,DATABASES_ID,PROJECT_ID} from "../AppWrite/appwriteConfig";
import { getUsersList } from "../Redux/OneOneChatSlice";
const ImageUploader = () => {
  const [file, setFile] = useState(null);
  const dispatch=useDispatch()
  const user = useSelector((state) => state.Chat.user);
  const UsersList= useSelector((state)=>state.OneOne.UsersList)
  const [AllImages,setAllImages] = useState([]);
  const [user_Detail,setuser_Detail]= useState(null);
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
    // getAllImage();
    // console.log('--------------------------------',AllImages)
    
      dispatch(getUsersList());
      setTimeout(()=>{
        if(UsersList!==undefined)setuser_Detail( UsersList.filter((User)=>user[0].$id===User.User_ID));
      console.log('--------------------------------UserDetail',user_Detail);
      },5000)
      
      
  
  },[file])
  // useEffect(() => {
  //   if(UsersList!==undefined)setuser_Detail( UsersList.filter((User)=>user[0].$id===User.User_ID));
  //     console.log('--------------------------------UserDetail',user_Detail);
  // }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };
  const uploadImage = async (e) => {
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
      console.log('user iiiid',user[0].$id);
      console.log(newImage,'createdfdskjf',newImage.$userId);
      setFile('')
    } else {
      console.log("something went wrong");
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (file) {
      try {
        uploadImage();
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    } else {
      console.error("No file selected");
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleFileChange(e)}
      />
      <button className="bg-red-500 ml-5" onClick={(e) => handleUpload(e)}>
        Upload Image
      </button>
      <div>
        {
           AllImages.length!==0 && AllImages.map((img)=>(
                <div key={img.$id} className="bg-red-500 p-5 border-2 w-[15rem] h">
                        <img src={storage.getFilePreview(USER_PROFILE_BUCKET_ID, img.$id,100,100,'center')}  alt="none" />
                </div> 
            ))
        }
      </div>
    </div>
  );
};

export default ImageUploader;
