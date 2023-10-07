import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useAuth } from "../context/AuthProvider";

const PortalSidebar = () => {
  const [navList, setNavList] = useState([
    {
      navType: "clickable",
      href: "/portal/dashboard",
      name: "Dashboard",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M4 13h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1zm-1 7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v4zm10 0a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v7zm1-10h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1z"
          />
        </svg>
      ),
    },
    {
      navType: "clickable",
      name: "Prediction",
      href: "/portal/predictresult",
      open: false,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M7 22q-.825 0-1.413-.588T5 20V10q0-.825.588-1.413T7 8h10q.825 0 1.413.588T19 10v10q0 .825-.588 1.413T17 22H7Zm5-1.5q.425 0 .713-.288T13 19.5V19h-2v.5q0 .425.288.713T12 20.5ZM11 18h2q0-.575.388-1.137t.862-1.175q.475-.613.863-1.276T15.5 13q0-1.45-1.025-2.475T12 9.5q-1.45 0-2.475 1.025T8.5 13q0 .75.388 1.413t.862 1.274q.475.613.863 1.176T11 18ZM6 6.5q0-.625.438-1.063T7.5 5h9q.625 0 1.063.438T18 6.5H6Zm1-3q0-.625.438-1.063T8.5 2h7q.625 0 1.063.438T17 3.5H7Z"
          />
        </svg>
      ),
    },
   
    
    // {
    //   navType: "clickable",
    //   name: "Loan Rate",
    //   href: "/admin/loan",
    //   open: false,
    //   icon: (
    //     <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-cash-banknote" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
    //     <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    //     <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
    //     <path d="M3 6m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z"></path>
    //     <path d="M18 12l.01 0"></path>
    //     <path d="M6 12l.01 0"></path>
    //  </svg>
    //   ),
    // },
    // {
    //     navType: 'clickable',
    //     name: 'Bookings',
    //     href: "/booking",
    //     open: false,
    //     icon: <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-building" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" >
    //         <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    //         <path d="M3 21l18 0"></path>
    //         <path d="M9 8l1 0"></path>
    //         <path d="M9 12l1 0"></path>
    //         <path d="M9 16l1 0"></path>
    //         <path d="M14 8l1 0"></path>
    //         <path d="M14 12l1 0"></path>
    //         <path d="M14 16l1 0"></path>
    //         <path d="M5 21v-16a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v16"></path>
    //     </svg>
    // },
    // {
    //     navType: 'clickable',
    //     name: 'Services',
    //     href: "/services",
    //     open: false,
    //     icon: <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-building" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" >
    //         <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    //         <path d="M3 21l18 0"></path>
    //         <path d="M9 8l1 0"></path>
    //         <path d="M9 12l1 0"></path>
    //         <path d="M9 16l1 0"></path>
    //         <path d="M14 8l1 0"></path>
    //         <path d="M14 12l1 0"></path>
    //         <path d="M14 16l1 0"></path>
    //         <path d="M5 21v-16a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v16"></path>
    //     </svg>
    // },
  ]);

  const router = useRouter();
  const auth = useAuth();
  

  const profileRef = useRef();

  const [isProfileActive, setIsProfileActive] = useState(false);

  const [sideBar, setSideBar] = useState(true);

  const handleSide = () => {
    setSideBar(!sideBar);
  };
  useEffect(() => {
    const handleProfile = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target))
        setIsProfileActive(false);
    };
    document.addEventListener("click", handleProfile);
  }, []);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = (index) => {
    setNavList((prevState) => {
      const newState = prevState.map((item, i) => {
        if (i === index) {
          return { ...item, open: !item.open };
        } else if (item.navType === "dropdown") {
          return { ...item, open: false };
        }
        return item;
      });
      return newState;
    });
  };
  // setDropdownOpen(!dropdownOpen)
  return (
    <>
      {sideBar === false ? (
        <nav className=" h-screen space-y-8 z-[10]">
          <div className="flex flex-col relative w-full bg-white h-full border-r">
            <div className="absolute top-4 -right-3" onClick={handleSide}>
              <div className=" bg-gradient-to-r from-purple-900 to-purple-800 cursor-pointer rounded-full h-7 w-7 flex justify-center items-center text-white">
                <AiOutlineLeft />
              </div>
            </div>
            <div className="h-20 flex font-bold text-3xl items-center px-8">
              Loan Prediction
            </div>
            <div className="flex-1  flex flex-col h-full">
              <div className="div h-[65%] overflow-y-scroll">
                <ul
                  className={`was pl-4 text-sm font-medium flex-1 gap-y-3  overflow-y-hidden`}
                >
                  {navList.map((item, index) => {
                    return (
                      <>
                        {item.navType === "clickable" ? (
                          <>
                            <li key={index}>
                              <Link
                                href={`${item.href}`}
                                className={`${
                                  router.pathname == item.href
                                    ? "active bg-purple-800 text-white"
                                    : ""
                                } flex items-center gap-x-2 text-base text-gray-500 my-3 p-2 rounded-lg pr-16 py-3  duration-150 mx-4`}
                              >
                                <div className="">{item.icon}</div>
                                {item.name}
                              </Link>
                            </li>
                          </>
                        ) : (
                          <>
                            <div
                              key={index}
                              onClick={() => toggleDropdown(index)}
                            >
                              <div
                                className={`${
                                  router.pathname == item.href
                                    ? "active bg-purple-900 text-white"
                                    : ""
                                } flex items-center gap-x-2 text-base text-gray-500 my-3 p-2 rounded-lg  pr-16 py-3 duration-150 mx-4`}
                              >
                                <div className="">{item.icon}</div>
                                {item.name}
                              </div>
                            </div>
                            {item.open && (
                              <ul className="ml-6 z-10 bg-white rounded-lg">
                                {item.navChilds?.map((navItem, childIndex) => (
                                  <li key={childIndex}>
                                    <Link href={navItem.navLink}>
                                      <div
                                        className={`flex items-center text-sm text-gray-500 my-1 gap-x-2 rounded-lg  pr-16 py-3 duration-150 `}
                                      >
                                        <span className="">{navItem.icon}</span>
                                        {navItem.itemName}
                                      </div>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </>
                        )}
                      </>
                    );
                  })}
                </ul>
              </div>
              
            </div>
          </div>
        </nav>
      ) : (
        <>
          <nav className=" w-20  h-full border-r bg-white space-y-8 z-[10]">
            <div className="flex flex-col top-0 right-0 h-full relative">
              <div className="absolute top-4 -right-3" onClick={handleSide}>
                <div className=" bg-gradient-to-r from-purple-900 to-purple-800 rounded-full cursor-pointer h-7 w-7 flex justify-center items-center text-white">
                  <AiOutlineRight />
                </div>
              </div>
              <div className="h-20 flex font-bold text-3xl items-center px-8">
                LP
              </div>
              <div className="flex-1 flex flex-col h-full">
                <ul className="px-4 text-sm font-medium flex-1">
                  {/* {navList.map((item, idx) => (
                                        <li key={idx}>
                                            <Link href={`${item.href}`} className={`${router.pathname == item.href ? "active bg-purple-900 text-white" : ""} relative flex items-center justify-center gap-x-2 text-gray-600 p-2 rounded-lg  active:bg-gray-100 duration-150 group`}
                                            >
                                                <div className="">{item.icon}</div>
                                                <span className="absolute left-14 p-1 px-1.5 rounded-md whitespace-nowrap text-xs text-white bg-gray-800 hidden group-hover:inline-block group-focus:hidden duration-150">
                                                    {item.name}
                                                </span>
                                            </Link>
                                        </li>
                                    ))} */}
                  {navList.map((item, index) => {
                    return (
                      <>
                        {item.navType === "clickable" ? (
                          <>
                            <li key={index}>
                              <Link
                                href={`${item.href}`}
                                className={`${
                                  router.pathname == item.href
                                    ? "active bg-purple-900 text-white"
                                    : ""
                                } relative flex items-center justify-center gap-x-2 text-gray-600 p-2 my-3 rounded-lg  active:bg-gray-100 duration-150 group`}
                              >
                                <div className="">{item.icon}</div>
                                <span className="absolute left-14 p-1 px-1.5 rounded-md whitespace-nowrap text-xs text-white bg-gray-800 hidden group-hover:inline-block group-focus:hidden duration-150 z-50">
                                  {item.name}
                                </span>
                              </Link>
                            </li>
                          </>
                        ) : (
                          <>
                            <div
                              key={index}
                              onClick={() => toggleDropdown(index)}
                            >
                              <div
                                className={`${
                                  router.pathname == item.href
                                    ? "active bg-purple-900 text-white"
                                    : ""
                                } relative flex items-center justify-center gap-x-2 text-gray-600 p-2 my-3 rounded-lg  active:bg-gray-100 duration-150 group`}
                              >
                                <div className="">{item.icon}</div>
                                <span className="absolute left-14 p-1 px-1.5 rounded-md whitespace-nowrap text-xs text-white bg-gray-800 hidden group-hover:inline-block group-focus:hidden duration-150 z-50">
                                  {item.name}
                                </span>
                              </div>
                            </div>
                            {item.open && (
                              <ul className="ml-6z-10 bg-white  shadow-md rounded-lg mt-2">
                                {item.navChilds?.map((navItem, childIndex) => (
                                  <li key={childIndex}>
                                    <Link href={navItem.navLink}>
                                      <div className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                                        <span className="mr-3">
                                          {navItem.icon}
                                        </span>
                                        <span className="absolute left-14 p-1 px-1.5 rounded-md whitespace-nowrap text-xs text-white bg-gray-800 hidden group-hover:inline-block group-focus:hidden duration-150">
                                          {navItem.itemName}
                                        </span>
                                      </div>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </>
                        )}
                      </>
                    );
                  })}
                </ul>
                
              </div>
            </div>
          </nav>
        </>
      )}
    </>
  );
};

export default PortalSidebar;
