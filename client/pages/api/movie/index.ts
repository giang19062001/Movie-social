// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axiosCustom from "@/http/axios";
import axios from "axios";
import formidable from "formidable";
import * as fs from "fs";
import type { NextApiRequest, NextApiResponse } from "next";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query, method, body } = req;

  switch (method) {
    case "GET":
      const searchQuery = req.query.title?.toString();

      const response = await axiosCustom.get(`/movie/search/${searchQuery}`);
      res.status(200).json(response.data);
      break;

    case "POST":
      await axiosCustom.post(`/movie`, body, {
        headers: {
          Cookie: req.headers.cookie,
        },
      }).then((response)=>{
        res.status(200).json(response.data);
      })
      break;

    default:
  }
}
