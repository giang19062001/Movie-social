import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import HomeIcon from "@mui/icons-material/Home";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { MoviePopulate, MovieSideBarType } from "@/types/movie";
import { AppBar, DrawerHeader, Main, drawerWidth } from "@/custom/Mui/drawer";
import { MovieList } from "@/components/movie/movieList";
import { useRouter } from "next/router";
import { MovieSearch } from "@/components/movie/movieSearch";
import Link from "next/link";
import MovieDetailComponent from "@/components/movie/movieDetail";
import { MovieListDiff } from "@/components/movie/movieListDiff";
import Register from "@/components/register/register";
import Login from "@/components/login/login";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  removeAuth,
  selectTokens,
  selectUserCurrent,
} from "@/redux/auth/authReducer";
import { Avatar } from "@mui/material";
import useSWR from "swr";
import { toast } from "react-toastify";
import axios from "axios";
import User from "@/components/user/user";
import { UserCurrentPopulate } from "@/types/user";

export const SidebarHome = ({ movies, movie, id, user }: MovieSideBarType) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const tokens = useAppSelector(selectTokens);
  const userCurrent = useAppSelector(selectUserCurrent);
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [openRegister, setOpenRegister] = React.useState(false);
  const [openLogin, setOpenLogin] = React.useState(false);
  const [logout, setLogout] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const sidebarText = userCurrent
    ? ["Trang chủ", "Kênh của bạn"]
    : ["Trang chủ"];
  const fetcher = (url: string) =>
    axios
      .get(url)
      .then((res) => {
        setLogout(false),
          dispatch(removeAuth()),
          router.push("/"),
          toast.success(res.data);
      })
      .catch(() => setLogout(false));
  const { data } = useSWR(() => (logout ? "/api/auth" : null), fetcher);

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const handleSearched = async () => {
    router.push("/movie/search/search?title=" + title);
  };

  const hanldeLogout = () => {
    setLogout(true);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={openDrawer}
        sx={{
          backgroundColor: "black",
          paddingY: 1,
          borderBottom: "2px solid grey",
        }}
      >
        <Toolbar className="flex flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row gap-5 justify-between mx-5">
          <div className="flex items-center">
            <IconButton
              onClick={handleDrawerOpen}
              sx={{
                mr: 2,
                ...(openDrawer && { display: "none" }),
                color: "red",
              }}
            >
              <MenuIcon />
            </IconButton>
            <Link href="/">
              {" "}
              <Typography variant="h5" noWrap component="div">
                <b>
                  YouTube <sup>VN</sup>
                </b>
              </Typography>
            </Link>
          </div>
          <input
            className="border-2 rounded-full py-2 px-3 text-gray-700 focus:outline-none focus:border-sky-500 "
            style={{ width: "50%" }}
            type="text"
            placeholder="Tìm kiếm"
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSearched();
              }
            }}
          />
          {userCurrent ? (
            <div className="flex gap-5 items-center">
              <Link href={`/user/${userCurrent?._id}`} className="flex gap-5 items-center">
                {userCurrent.image === "" ? (
                  <Avatar></Avatar>
                ) : (
                  <Avatar
                    src={
                      process.env.HTTP_SERVER +
                      "/users/" +
                      userCurrent._id +
                      "/" +
                      userCurrent.image
                    }
                  ></Avatar>
                )}
              <p>{userCurrent.name}</p>
              </Link>

              <button
                type="button"
                className="font-bold border-2 border-red-500 rounded-lg p-2"
                onClick={() => hanldeLogout()}
              >
                Đăng xuất
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <button
                type="button"
                className="font-bold border-2 border-red-500 rounded-lg p-2"
                onClick={() => setOpenLogin(true)}
              >
                Đăng nhập
              </button>
              <button
                type="button"
                className="font-bold border-2 border-red-500 rounded-lg p-2"
                onClick={() => setOpenRegister(true)}
              >
                Đăng ký
              </button>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "black",
            color: "white",
          },
        }}
        variant="persistent"
        anchor="left"
        open={openDrawer}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon sx={{ color: "red" }} />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {sidebarText.map((text, index) => {
            return (
              <ListItem key={text} disablePadding>
                <Link
                  href={index % 2 === 0 ? "/" : `/user/${userCurrent?._id}`}
                >
                  <ListItemButton>
                    <ListItemIcon>
                      {index % 2 === 0 ? (
                        <HomeIcon sx={{ color: "white" }} />
                      ) : (
                        <AccountBoxIcon sx={{ color: "white" }} />
                      )}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </Link>
              </ListItem>
            );
          })}
        </List>
      </Drawer>
      <Main open={openDrawer}>
        <DrawerHeader />
        <Login
          openLogin={openLogin}
          setOpenLoginChild={() => setOpenLogin(false)}
        ></Login>
        <Register
          openRegister={openRegister}
          setOpenRegisterChild={() => setOpenRegister(false)}
        ></Register>
        {router.asPath === "/" ? (
          <MovieList movies={movies}></MovieList>
        ) : router.asPath.includes("search") ? (
          <MovieSearch movies={movies}></MovieSearch>
        ) : router.asPath.includes("detail") ? (
          <>
            <div className="flex gap-10">
              <MovieDetailComponent
                movie={movie as MoviePopulate}
              ></MovieDetailComponent>
              <MovieListDiff id={id}></MovieListDiff>
            </div>
          </>
        ) : router.asPath.includes("user") ? (
          <User user={user as UserCurrentPopulate}></User>
        ) : null}
      </Main>
    </Box>
  );
};
