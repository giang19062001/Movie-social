import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { useForm, SubmitHandler } from "react-hook-form";
import { RegisterForm, openRegisterType } from "@/types/auth";
import { Box, DialogTitle, LinearProgress } from "@mui/material";
import { messageFieldRegister, messageSuccess } from "@/helper/message";
import { toast } from "react-toastify";
import useSWRMutation from "swr/mutation";
import axios from "axios";

const initialState: RegisterForm = {
  email: "",
  name: "",
  password: "",
};

export default function Register({
  openRegister,
  setOpenRegisterChild,
}: openRegisterType) {
  async function useRegister(url: string, { arg }: { arg: RegisterForm }) {
    await axios.post(url, arg).then((res) => {
      setOpenRegisterChild(false);
      toast.success(messageSuccess.Register);
    })
    .catch((error) => {
      toast.error(error.response.data.message);
    });
  }
  const { trigger, isMutating } = useSWRMutation("/api/auth", useRegister);
  const onSubmit: SubmitHandler<RegisterForm> = (arg) => trigger(arg)
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<RegisterForm>({ defaultValues: initialState });
  const handleClose = () => {
    reset(initialState);
    setOpenRegisterChild(false);
  };

  return (
    <div>
      <Dialog open={openRegister} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle className="bg-black text-slate-50 font-bold" variant="h5">
          ĐĂNG KÝ
        </DialogTitle>
        <hr />
        <DialogContent>
          <DialogContentText>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-5"
            >
              <div className="flex items-center gap-5 justify-center">
                <label className="w-28">Email</label>
                <input
                  {...register("email", {
                    required: messageFieldRegister.EmailRequired,
                    pattern: {
                      value: /^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/,
                      message: messageFieldRegister.EmailPattern,
                    },
                  })}
                  className="border-2  rounded-full py-2 px-3  focus:outline-none focus:border-sky-500  w-full"
                />
              </div>
              {errors.email && (
                <p className="text-red-500">{errors.email?.message}</p>
              )}

              <div className="flex items-center gap-5 justify-center">
                <label className="w-28">Name</label>
                <input
                  {...register("name", {
                    required: messageFieldRegister.NameRequired,
                    pattern: {
                      value: /^[a-zA-Z ]+$/,
                      message: messageFieldRegister.NamePattern,
                    },
                  })}
                  className="border-2  rounded-full py-2 px-3  focus:outline-none focus:border-sky-500  w-full"
                />
              </div>
              {errors.name && (
                <p className="text-red-500">{errors.name?.message}</p>
              )}
              <div className="flex items-center gap-5 justify-center">
                <label className="w-28 ">Password</label>
                <input
                  {...register("password", {
                    required: messageFieldRegister.PasswordRequired,
                  })}
                  className="border-2  rounded-full py-2 px-3  focus:outline-none focus:border-sky-500 w-full"
                />
              </div>
              {errors.password && (
                <p className="text-red-500">{errors.password?.message}</p>
              )}
               {isMutating ? (
                <Box sx={{ width: "100%" }}>
                  <LinearProgress />
                </Box>
              ) : null}
              <hr />

              <button
                disabled={isMutating}
                className="bg-red-600 text-slate-50 p-2 rounded-full w-auto hover:bg-red-700"
                type="submit"
              >
                Đăng ký
              </button>
            </form>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
