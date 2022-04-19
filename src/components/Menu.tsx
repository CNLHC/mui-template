import { Button, Menu, MenuItem } from "@mui/material";
import React from "react";

const SideBar = () => {
  return (
    <div
      className={`
    w-[15rem]
    h-full
    dark:bg-dark-menu
`}
    >
      <div className="w-full flex justify-center p-4">
        <h1 className="mx-auto">LOGO</h1>
      </div>
      <div className="px-4 flex flex-col">
        <Button>Go</Button>
      </div>
    </div>
  );
};

export default SideBar;
