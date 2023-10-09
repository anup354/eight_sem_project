import Link from "next/link";
import React from "react";

const portalTop = () => {
  return (
    <div>
      <div className=" z-[99] ">
        {""}
        <div className="bg-white h-16 border-b-2 w-full">
          <div className="pt-2 mx-2  text-black flex ml-4">
            <div className="w-1/2 items-center">
              <p>
                
                <span className="text-green-600">Hello Admin</span>{" "}
              </p>
              
            </div>
            <div className="w-1/2 flex justify-end">
              <div className=" flex items-center">
                <div className="">Hello Cousultancy</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default portalTop;
