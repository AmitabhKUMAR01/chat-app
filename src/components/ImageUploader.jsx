import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ID } from "appwrite";
import { USER_PROFILE_BUCKET_ID, storage } from "../AppWrite/appwriteConfig";

const ImageUploader = () => {
  const [file, setFile] = useState(null);
  const user = useSelector((state) => state.Chat.user);

  const [AllImages,setAllImages] = useState([]);
  const getAllImage = () => {
    const promise = storage.listFiles(USER_PROFILE_BUCKET_ID);
    promise.then(
      function (response) {
            
          setAllImages(response.files)
          console.log('whole file list =::',response.files); // Array of files in the bucket
      },
      function (error) {
        console.log(error); // Failure
      }
    );
  };

  useEffect(()=>{
    getAllImage();
    console.log('--------------------------------',AllImages)
  },[file])

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
      newImage.name=user[0].$id;
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
