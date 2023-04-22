// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axiosCustom from "@/http/axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query, method, body } = req
  switch (method) {
    case 'GET':
      const searchQuery = req.query.title?.toString();

      const response = await axiosCustom.get(
          `/movie/search/${searchQuery}`
      );
      res.status(200).json(response.data);
      break

    case 'POST':
    await axiosCustom.post(`/movie`, body);
    res.status(201).json("Đăng ký thành công");


    default:
  }
}
