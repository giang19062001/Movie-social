import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { useForm, SubmitHandler } from "react-hook-form";
import { LoginForm, openLoginType } from "@/types/auth";
import { Box, DialogTitle, LinearProgress } from "@mui/material";
import { messageFieldRegister, messageSuccess } from "@/helper/message";
import { useAppDispatch } from "@/redux/hook";
import { saveAuth } from "@/redux/auth/authReducer";
import useSWRMutation from "swr/mutation";
import { toast } from "react-toastify";
import axios from "axios";

const initialState: LoginForm = {
  email: "",
  password: "",
};

export default function Login({ openLogin, setOpenLoginChild }: openLoginType) {
  const dispatch = useAppDispatch();
  async function useLogin(url: string, { arg }: { arg: LoginForm }) {
    await axios
      .post(url, arg)
      .then((res) => {
        dispatch(saveAuth(res.data));
        setOpenLoginChild(false);
        toast.success(messageSuccess.Login);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  }

  const { trigger, isMutating, error } = useSWRMutation("/api/auth", useLogin);

  const onSubmit: SubmitHandler<LoginForm> = async (arg) => {
    try {
      trigger(arg);
    } catch (e) {
      console.log(e);
    }
  };

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginForm>({ defaultValues: initialState });
  const handleClose = () => {
    reset(initialState);
    setOpenLoginChild(false);
  };

  return (
    <div>
      <Dialog open={openLogin} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle className="bg-black text-slate-50 font-bold" variant="h5">
          ĐĂNG NHẬP
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
              <hr />
              {isMutating ? (
                <Box sx={{ width: "100%" }}>
                  <LinearProgress />
                </Box>
              ) : null}
              <button
                disabled={isMutating}
                className="bg-red-600 text-slate-50 p-2 rounded-full w-auto hover:bg-red-700"
                type="submit"
              >
                Đăng nhập
              </button>
            </form>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
