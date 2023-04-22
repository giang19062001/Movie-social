import {  UserCurrentPopulateInProp, UserProps } from "@/types/user";
import React from "react";
import UserDetail from "./userDetail";
import { UserMovie } from "./userMovie";

const User = ({ user }: UserCurrentPopulateInProp) => {
  return (
    <div className="container mx-auto my-28 px-4">
      <UserDetail
        userDetail={{
          _id: user._id,
          name: user.name,
          image: user.image,
        }}
      ></UserDetail>
      <hr className="mt-12"/>
      <UserMovie movies={user.movie}></UserMovie>
    </div>
  );
};

export default User;
