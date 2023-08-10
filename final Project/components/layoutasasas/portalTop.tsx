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
                {/* <Link href="/portal/loadfund">
                <div className="mr-4">
                  <button className="border border-primary px-4 py-2 rounded-xl mr-5 text-primary bg-white hover:bg-primary hover:text-white">
                    Load Fund
                  </button>
                </div>
                </Link> */}
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
