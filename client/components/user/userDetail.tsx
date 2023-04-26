import { UserProps } from "@/types/user";
import { Avatar, Backdrop, CircularProgress } from "@mui/material";
import React, { useState } from "react";
import defaultImage from "@/assets/images/default-avatar.png";
import { v4 as uuidv4 } from "uuid";
import { storage } from "../firebase/firebase";
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { toast } from "react-toastify";
import axios from "axios";
import { useAppSelector } from "@/redux/hook";
import { selectUserCurrent } from "@/redux/auth/authReducer";

const UserDetail = ({ userDetail }: UserProps) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const user = useAppSelector(selectUserCurrent);

  const imageChange = (event: any) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedImage(event.target.files[0]);
      setImage(event.target.files[0]);
    }
  };
  const handleSubmit = async () => {
    setLoading(true);
    if(user?.image !== ''){
      const desertRef = ref(storage, `${user?.image}`);
      deleteObject(desertRef).then(() => {
      }).catch((error) => {
        console.log(error);
      });
    }
      const storageRef = ref(storage, `/users/${image.name + uuidv4()}`);
      await uploadBytesResumable(storageRef, image).then((snapshot) => {
        getDownloadURL(snapshot.ref).then(async (userImage) => {
          const body = {_id: user?._id, image:userImage}
          await axios.put(`/api/auth`, body).then((response) => {
            setLoading(false);
            toast.success(response.data);
          });
        });
      });
    
   
  };
  return (
    <div className="flex items-center gap-10">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div>
        {userDetail?.image === "" || userDetail?.image === undefined ? (
          <Avatar
            src={defaultImage as unknown as string}
            sx={{ width: 200, height: 200 }}
          ></Avatar>
        ) : (
          <div className="group relative">
            {selectedImage ? (
              <Avatar
                sx={{ width: 200, height: 200 }}
                src={URL.createObjectURL(selectedImage)}
              ></Avatar>
            ) : (
              <Avatar
                sx={{ width: 200, height: 200 }}
                src={`${userDetail?.image}`}
              ></Avatar>
            )}
            <label
              htmlFor="image"
              className="absolute  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden group-hover:block
            bg-slate-200 p-2 rounded-md text-neutral-900 font-bold hover:cursor-pointer
            "
            >
              Đổi avatar
            </label>
            <input
              style={{ display: "none" }}
              type="file"
              id="image"
              name="image"
              onChange={(e) => imageChange(e)}
            ></input>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-7">
        <b className="text-4xl">{userDetail.name}</b>
        {selectedImage ? (
          <button
            className="bg-sky-500 p-2 rounded-md"
            onClick={() => handleSubmit()}
          >
            Lưu avatar
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default UserDetail;
