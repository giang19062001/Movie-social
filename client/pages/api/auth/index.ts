// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { messageSuccess } from "@/helper/message";
import axiosCustom from "@/http/axios";
import { LoginForm, RegisterForm } from "@/types/auth";
import type { NextApiRequest, NextApiResponse } from "next";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { headers, method, body } = req;

  function isCheckInterface(
    payload: LoginForm | RegisterForm
  ): payload is RegisterForm {
    return typeof payload === "object" && payload !== null && "name" in payload;
  }
  switch (method) {
    case "POST":
      if (isCheckInterface(body) === false) {
        await axiosCustom
          .post(`/auth/signin`, body)
          .then((response) => {
            setCookie("accessToken", response.data.tokens.accessToken, {
              req,
              res,
            });
            setCookie("refreshToken", response.data.tokens.refreshToken, {
              req,
              res,
            });

            res.status(201).json(response.data);
          })
          .catch((error) => {
            res.status(400).json(error.response.data);
          });
      } else {
        await axiosCustom
          .post(`/auth/signup`, body)
          .then((response) => {
            res.status(201).json(messageSuccess.Register);
          })
          .catch((error) => {
            res.status(400).json(error.response.data);
          });
      }
      break;
    case "GET":
      await axiosCustom
        .get(`/auth/logout`, {
          headers: {  Cookie: req.headers.cookie },
        })
        .then((response) => {
          deleteCookie('accessToken', { req, res });
          deleteCookie('refreshToken', { req, res });

          res.status(200).json(response.data);
        })
        .catch((error) => {
          res.status(400).json(error.response.data);
        });

    default:
      res.status(200);
  }
}
