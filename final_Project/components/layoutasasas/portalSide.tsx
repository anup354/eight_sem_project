import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import softsaro from "../../public/images/money.svg";
import logoSmall from "../../public/images/money.svg";
import Image from "next/image";
import { useAuth } from "../context/AuthProvider";


const Sidebar = () => {
  const [bigNav, setBigNav] = useState(true);
  const before_ = useRouter().pathname;
  const location = before_;
  // const location = before_.slice(1).split("/")[1];
  const [showNav, setShowNav] = useState(true);
  const [dropDown, setDropDown] = useState(false);
  // Test
  const auth = useAuth();
  useEffect(() => {
    if (location === "login") {
      setShowNav(false);
    } else {
      setShowNav(true);
    }
  }, [location]);

  // useEffect(() => {

  // }, [])

  const [navList, setNavList] = useState([
    {
      navType: "clickable",
      navLink: "/admin/dashboard",
      iconName: "dashboard",
      name: "Dashboard",
      permissionName: "Dashboard",
    },
    {
      navType: "clickable",
      navLink: "/admin/prediction",
      iconName: "batch_prediction",
      name: "Prediction",
      permissionName: "Dashboard",
    },
    // {
    //   navType: "clickable",
    //   navLink: "subscription",
    //   iconName: "subscriptions",
    //   name: "Subscription",
    //   permissionName: "Dashboard",
    // },

    // {
    //   navType: "dropdown",
    //   navLink: "",
    //   iconName: "settings",
    //   open: false,
    //   name: "Settings",
    //   permissionName: "Setting",
    //   navChilds: [
    //     // {
    //     //     navType: "clickable",
    //     //     navLink: "setting/countries",
    //     //     iconName: "person_add",
    //     //     name: "Countries",
    //     // },
    //     {
    //       navType: "clickable",
    //       navLink: "setting/advertiser-wallets",
    //       iconName: "wallet",
    //       name: "Advertiser Wallets",
    //       permissionName: "Advertiser Wallets",

    //     },
    //     {
    //       navType: "clickable",
    //       navLink: "setting/pages",
    //       iconName: "auto_stories",
    //       name: "Pages",
    //       permissionName: "Pages",

    //     },
    //     {
    //       navType: "clickable",
    //       navLink: "setting/publisher-wallets",
    //       iconName: "account_balance_wallet",
    //       name: "Publisher Wallets",
    //       permissionName: "Publisher Wallets",

    //     },
    //     {
    //       navType: "clickable",
    //       navLink: "setting/billing",
    //       iconName: "receipt_long",
    //       name: "Billing Profile",
    //       permissionName: "Billing Profile",
    //     },
    //     {
    //       navType: "clickable",
    //       navLink: "setting/groups",
    //       iconName: "group",
    //       name: "Groups",
    //       permissionName: "Groups",
    //     },
    //     {
    //       navType: "clickable",
    //       navLink: "setting/default",
    //       iconName: "toggle_off",
    //       name: "Default Setting",
    //       permissionName: "Default Setting",

    //     },
    //   ],
    // },



    // {
    //   navType: "dropdown",
    //   navLink: "",
    //   iconName: "subscriptions",
    //   name: "Products",
    //   // permissionName: "Blogs",
    //   open: false,

    //   navChilds: [
    //     {
    //       navType: "clickable",
    //       navLink: "/portal/allproducts",
    //       iconName: "lan",
    //       name: "All Products",
    //       permissionName: "Dashboard",
    //     },
    //     // {
    //     //   navType: "clickable",
    //     //   navLink: "client",
    //     //   iconName: "hub",
    //     //   name: "Clients",
    //     //   permissionName: "Dashboard",
    //     // },

    //     // {
    //     //   navType: "clickable",
    //     //   navLink: "testimonials",
    //     //   iconName: "contact_support",
    //     //   name: "Testimonials",
    //     //   permissionName: "Dashboard",
    //     // },
    //   ],
    // },
    // {
    //   navType: "clickable",
    //   navLink: "/portal/dashboard",
    //   iconName: "",
    //   name: "Invoice",
    //   permissionName: "Dashboard",
    // },



    // {
    //   navType: "dropdown",
    //   navLink: "",
    //   iconName: "history_edu",
    //   name: "Blogs",
    //   // permissionName: "Blogs",
    //   open: false,
    //   navChilds: [
    //     {
    //       navType: "clickable",
    //       navLink: "/blogs",
    //       iconName: "view_list",
    //       name: "All Blogs",
    //       // permissionName: "All Blogs",
    //     },

    //     {
    //       navType: "clickable",
    //       navLink: "/blogs/categories",
    //       iconName: "list_alt_add",
    //       name: "Blog Categories",
    //       // permissionName: "Blog Categories",
    //     },
    //   ],
    // },
  ]);
  return (
    <div className="relative">
      {showNav && (
        <div
          className={
            bigNav
              ? "side-nav transition ease-in-out duration-1000 w-64"
              : "side-nav transition ease-in-out duration-1000 w-24"
          }
        >
          <div
            className={
              bigNav
                ? "bg-white px-8  py-6 border-r-2 overflow-y-scroll  h-screen overflow-x-hidden  border-green-50"
                : "bg-white py-6 border-r-2 min-h-full border-green-50 overflow-y-scroll overflow-x-hidden h-screen"
            }
          >
            <nav>
              <div className="navbar">
                <div className="relative">
                  <Link
                    href={"/"}
                    className="nav-logo flex justify-center items-center"
                  >
                    {bigNav ? (
                      <div
                        className={
                          "logo-text ml-1 pt-5 font-bold w-16 font-secondary text-2xl block"
                        }
                      >
                        <Image
                          width={200}
                          height={200}
                          src={softsaro}
                          alt="Company Logo"
                        />
                      </div>
                    ) : (
                      <div
                        className={
                          "logo-text ml-1  pt-5 font-bold font-secondary text-2xl block"
                        }
                      >
                        <Image
                          width={50}
                          height={50}
                          src={logoSmall}
                          alt="Company Logo"
                        />
                      </div>
                    )}
                  </Link>
                  <div
                    onClick={() => {
                      setBigNav(!bigNav);
                    }}
                    className={
                      bigNav
                        ? "nav-toggler absolute -top-5 -right-7 bg-white w-8 h-8  grid items-center rounded-full shadow-lg p-1 cursor-pointer "
                        : "nav-toggler absolute -top-5 -right-0 bg-white w-8 h-8  grid items-center rounded-full shadow-lg p-1 cursor-pointer"
                    }
                  >
                    <span
                      className={
                        bigNav
                          ? "material-symbols-outlined transition ease-in-out duration-500"
                          : "material-symbols-outlined rotate-180  transition ease-in-out duration-500"
                      }
                    >
                      filter_list
                    </span>
                  </div>
                </div>

                <div className="navbar-content mt-14 ">
                  <ul
                    className={
                      bigNav
                        ? "text-sm text-grey font-secondary font-light"
                        : "text-sm text-grey font-secondary font-light px-2"
                    }
                  >
                    {navList.map((nav, index) => (
                      <>
                        {nav.navType === "clickable" ? (
                          <>
                            {/* {auth?.permission.includes(nav?.permissionName) && ( */}
                            {console.log(nav.navLink)}
                            {console.log(location)}
                            <Link
                              href={`/${nav.navLink}`}
                              className={
                                // location === `${navChild.navLink}`
                                // ? "flex  bg-primary justify-start my-2 py-3  text-white rounded-lg items-center"
                                location === `${nav.navLink}`
                                  ? "flex  bg-primary justify-start my-2 py-3  text-white rounded-lg items-center"
                                  : "flex my-2 py-3 rounded-lg items-center"
                              }
                            >
                              <div
                                className={bigNav ? "flex text-sm" : "flex "}
                                title={nav.name}
                              >
                                <span className="material-symbols-outlined ml-5 mr-2">
                                  {nav.iconName}
                                </span>
                                <span
                                  className={
                                    bigNav ? "block text-sm" : "hidden"
                                  }
                                >
                                  {nav.name}
                                </span>
                              </div>
                            </Link>
                          </>
                        ) : (
                          <>
                            {/* {auth?.permission.includes(nav?.permissionName) && ( */}
                            <>
                              <div
                                className={
                                  !nav.open
                                    ? "flex flex-col my-2 py-3 "
                                    : "flex flex-col my-0 mt-2 py-0 pt-3"
                                }
                              >
                                {/* {auth?.permission.includes(
                                    nav?.permissionName
                                  ) && ( */}
                                <button
                                  onClick={() => {
                                    let newState = [...navList];
                                    newState[index].open =
                                      !newState[index].open;
                                    setNavList(newState);
                                  }}
                                  className={
                                    !nav.open === false
                                      ? "flex w-full justify-start  rounded-lg items-center relative dropdown-navbar dropOpen"
                                      : "flex w-full justify-start  rounded-lg items-center relative dropdown-navbar"
                                  }
                                >
                                  <div
                                    className={bigNav ? "flex " : "flex "}
                                    title={nav.name}
                                  >
                                    <span className="material-symbols-outlined ml-5 mr-2">
                                      {nav.iconName}
                                    </span>
                                    <span
                                      className={bigNav ? "block " : "hidden"}
                                    >
                                      {nav.name}
                                    </span>
                                  </div>
                                </button>
                                {/* // )} */}
                                <div className="">
                                  <div
                                    className={
                                      nav.open === false
                                        ? "animated-dropdown "
                                        : " ml-3 pl-5  bg-gray-50"
                                    }
                                  >
                                    {nav?.navChilds?.map((navChild, index) => (
                                      <>
                                        {/* {auth?.permission.includes(
                                              navChild.permissionName
                                            ) && ( */}
                                        <Link
                                          key={index}
                                          href={`/${navChild.navLink}`}
                                          className={
                                          // location === `${navChild.navLink}`
                                          // ? "flex  bg-primary justify-start my-2 py-3  text-white rounded-lg items-center"

                                          // location === `${navChild.navLink}`
                                          //     ? "flex  bg-primary justify-start my-2 py-3  text-white rounded-lg  items-center"
                                          //     : "flex my-2 py-3  justify-center rounded-lg items-center"

                                          bigNav
                                            ? "flex my-2 py-3 rounded-lg items-center text-sm"
                                            : "flex my-2 py-3 rounded-lg justify-center items-center text-sm"
                                          }
                                         
                                        >
                                          <div
                                            className={
                                              bigNav
                                                ? "flex text-xs px-2"
                                                : "flex  text-center"
                                            }
                                            title={navChild.name}
                                          >
                                            <span
                                              className={
                                                bigNav
                                                  ? "material-symbols-outlined mr-2 md"
                                                  : "material-symbols-outlined   text-2xl "
                                              }
                                            >
                                              {navChild.iconName}
                                            </span>
                                            <span
                                              className={
                                                bigNav
                                                  ? "block text-sm"
                                                  : "hidden"
                                              }
                                            >
                                              {navChild.name}
                                            </span>
                                          </div>
                                        </Link>
                                        {/* )} */}
                                      </>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </>
                            {/* )} */}
                          </>
                        )}
                      </>
                    ))}
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
