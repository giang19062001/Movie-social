import { UserProps } from "@/types/user";
import { Avatar } from "@mui/material";
import React from "react";
import defaultImage from "@/assets/images/default-avatar.png";

const UserDetail = ({ userDetail }: UserProps) => {
  return (
    <div className="flex items-center gap-10">
      <div>
        {userDetail?.image === "" || userDetail?.image === undefined ? (
          <Avatar src={defaultImage as unknown as string}  sx={{width:200, height:200}} ></Avatar>
        ) : (
          <Avatar
          sx={{width:200, height:200}}
            src={`${process.env.HTTP_SERVER}/users/${userDetail?._id}/${userDetail?.image}`}
          ></Avatar>
        )}
      </div>
      <b className="text-4xl">{userDetail.name}</b>
    </div>
  );
};

export default UserDetail;
