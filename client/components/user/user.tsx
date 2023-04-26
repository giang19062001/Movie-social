import { UserCurrentPopulateInProp, UserProps } from "@/types/user";
import React from "react";
import UserDetail from "./userDetail";
import { UserMovie } from "./userMovie";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { TabPanel, a11yProps } from "@/custom/Mui/tab";
import AddMovie from "./addMovie";

const User = ({ user }: UserCurrentPopulateInProp) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <div className="container mx-auto my-28 px-4">
      <UserDetail
        userDetail={{
          _id: user._id,
          name: user.name,
          image: user.image,
        }}
      ></UserDetail>
      <hr className="mt-12" />
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            textColor="inherit"
            onChange={handleChange}
            TabIndicatorProps={{
              style: {
                backgroundColor: "red",
                color:'black'
              }
            }}
          >
            <Tab label="Video của bạn" {...a11yProps(0)}  sx={{color:'white'}} />
            <Tab label="Thêm video" {...a11yProps(1)}  sx={{color:'white'}}/>
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <UserMovie movies={user.movie}></UserMovie>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <AddMovie></AddMovie>
        </TabPanel>
      </Box>
    </div>
  );
};

export default User;
