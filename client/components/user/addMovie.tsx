/* eslint-disable @next/next/no-img-element */
import { CategoryAll } from "@/types/category";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Backdrop, CircularProgress, Container } from "@mui/material";
import { Movie } from "@/types/movie";
import { useAppSelector } from "@/redux/hook";
import { selectUserCurrent } from "@/redux/auth/authReducer";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase/firebase";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

const initialCates: CategoryAll = {
  _id: "",
  title: "",
  movie: [],
};

const initalState: Omit<Movie, "_id" | "createdAt" | "updatedAt"> = {
  title: "",
  category: "",
  link: "",
  user: "",
  image: "",
};

const AddMovie = () => {
  const user = useAppSelector(selectUserCurrent);
  const [cates, setCates] = useState<[CategoryAll]>([initialCates]);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState<
    Omit<Movie, "_id" | "createdAt" | "updatedAt"> | Movie
  >(initalState);

  useEffect(() => {
    axios
      .get(`${process.env.HTTP_SERVER}/category`)
      .then((res) => {
        setCates(res.data);
        setFormData((prev) => ({ ...prev, category: res.data[0]._id }));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const imageChange = (event: any) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedImage(event.target.files[0]);
      setFormData((pre) => ({ ...pre, image: event.target.files[0] }));
    }
  };
  const removeSelectedImage = () => {
    setSelectedImage(null);
    setFormData((pre) => ({ ...pre, image: "" }));
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const storageRef = ref(
      storage,
      `/videos/${formData.image.name + uuidv4()}`
    );
    await uploadBytesResumable(storageRef, formData.image).then((snapshot) => {
      getDownloadURL(snapshot.ref).then(async (video) => {
        const body = { ...formData, image: video, user: user?._id };
        await axios.post(`/api/movie`, body).then((response) => {
          setLoading(false);
          toast.success(response.data);
        });
      });
    });
  };

  return (
    <Container maxWidth="sm">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5"
        encType="multipart/form-data"
      >
        <div className="flex items-center">
          <label className="w-28">Tiêu đề</label>
          <input
            type="text"
            className="border-2  rounded-full py-2 px-3  focus:outline-none focus:border-sky-500  w-full text-slate-900"
            placeholder="Tiêu đề"
            onChange={(event) =>
              setFormData((prev) => ({ ...prev, title: event.target.value }))
            }
            value={formData.title}
          ></input>
        </div>
        <div className="flex items-center">
          <label className="w-28">Link</label>
          <input
            type="text"
            className="border-2  rounded-full py-2 px-3  focus:outline-none focus:border-sky-500  w-full  text-slate-900"
            placeholder="Link"
            onChange={(event) =>
              setFormData((prev) => ({ ...prev, link: event.target.value }))
            }
            value={formData.link}
          ></input>
        </div>

        <div className="flex items-center">
          <label className="w-28">Thể loại</label>
          <select
            value={formData.category}
            onChange={(event) =>
              setFormData((prev) => ({ ...prev, category: event.target.value }))
            }
            className="block w-full px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            {cates?.map((cates) => (
              <option key={cates._id} value={cates._id}>
                {cates.title}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-5">
          <label
            htmlFor="image"
            className="relative cursor-pointer rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900"
          >
            Ảnh video
          </label>
          <input
            type="file"
            id="image"
            name="image"
            style={{ display: "none" }}
            onChange={(event) => imageChange(event)}
          ></input>
          {selectedImage ? (
            <div className="relative my-6">
              <img
                src={URL.createObjectURL(selectedImage)}
                alt=""
                loading="lazy"
              />
              <button
                className="absolute top-4 right-4 rounded-full bg-red-500 px-4 py-2 text-slate-50"
                onClick={removeSelectedImage}
              >
                X
              </button>
            </div>
          ) : null}
        </div>
        <button
          className="bg-red-600 text-slate-50 p-2 rounded-full w-auto hover:bg-red-700"
          type="submit"
        >
          Thêm
        </button>
      </form>
    </Container>
  );
};

export default AddMovie;
