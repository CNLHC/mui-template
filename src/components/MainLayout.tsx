import React, { PropsWithChildren, ReactNode } from "react";
import SideBar from "./Menu";

const MainLayout: React.FC<{ children?: ReactNode }> = ({ children }) => {
  return (
    <div
      className={`flex h-screen
    dark:text-dark-primary
    dark:bg-dark-bg
    

    `}
    >
      <div>
        <SideBar />
      </div>
      <div className="p-8">{children}</div>
    </div>
  );
};

export default MainLayout;
