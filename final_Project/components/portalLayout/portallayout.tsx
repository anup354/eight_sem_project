import React from "react";
import Navbar from "../frontlayout/navbar";
import Footer from "../frontlayout/footer";
import Sidebar from "../layouts/portalSide";
import PortalSidebar from "./sidebar";

const Portallayout = ({children}) => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className=" flex flex-col">
        <div className="flex">
          <div className="bg-white top-0 ">
            {/* <Navbar /> */}
            <PortalSidebar/>
          </div>
          <main className=" max-h-[100vh] flex-1  pl-10 overflow-y-scroll bg-white ">
            {children}
          </main>
          {/* <Footer /> */}
        </div>
      </div>
    </div>
  );
};

export default Portallayout;
