import React, { useState, useEffect } from "react";
import { Socket, io } from "socket.io-client";
import { useRouter } from "next/router";
import { useAppSelector } from "@/redux/hook";
import { selectUserCurrent } from "@/redux/auth/authReducer";
import { Avatar, TextField, styled } from "@mui/material";

const CustomTextField = styled(TextField)({
  input: {
    color: "white",
  },

  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "red",
    },
    "&:hover fieldset": {
      borderColor: "red",
    },
    "&.Mui-focused fieldset": {
      borderColor: "red",
      color: "white",
    },
  },
});

interface data {
  roomId: string;
  message: string;
  user: string;
  image: string;
}
const Chat = () => {
  const router = useRouter();
  const roomId = router.query?.idMovie as string;
  const user = useAppSelector(selectUserCurrent);
  const [socket, setSocket] = useState<Socket>();
  const [value, setValue] = useState<string>("");
  const [room, setRoom] = useState<string>();
  const [messages, setMessage] = useState<data[]>([]);
  useEffect(() => {
    const newSocket = io("http://localhost:8001");
    newSocket?.emit("room", roomId);

    setSocket(newSocket);
  }, [setSocket]);

  const send = (value: string) => {
    const chat: data = {
      roomId: roomId,
      message: value,
      user: user?.email as string,
      image: user?.image as string,
    };
    setValue("");
    socket?.emit("chat", chat);
  };

  const messageListener = (data: data) => {
    setMessage([...messages, data]);
  };

  useEffect(() => {
    socket?.on("chat", messageListener);
    return () => {
      socket?.off("chat", messageListener);
    };
  }, [messageListener]);

  return (
    <div className="h-100 my-4 ml-0 sm:ml-24 md:ml-24 lg:ml-24 xl:ml-24 flex flex-col gap-2 mt-12">
      {user ? (
        <>
          <CustomTextField
            placeholder="Bình luận..."
            value={value}
            className="text-slate-50"
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                send(value);
              }
            }}
          ></CustomTextField>
          <div className=" rounded-md p-2">
            {messages?.map((mess) => (
              <div key={mess.user} className="flex flex-row items-center gap-5 mb-5 ">
                <Avatar
                  sx={{ width: 50, height: 50 }}
                  src={`${mess.image}`}
                ></Avatar>
                <span className="text-slate-50 text-lg w-96">
                  <b> {mess.user} </b>
                  <p style={{overflowWrap:"break-word",wordWrap:'break-word',hyphens:'auto'}}> {mess.message}</p>
                </span>
              </div>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
};
export default Chat;
