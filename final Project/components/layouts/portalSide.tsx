import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';




const Sidebar = () => {
    const [navList, setNavList] = useState([
        {
            navType: "clickable",
            href: '/admin/dashboard',
            name: 'Dashboard',
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M4 13h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1zm-1 7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v4zm10 0a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v7zm1-10h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1z"/></svg>,

        },
        {
            navType: 'clickable',
            name: 'Prediction',
            href: "/admin/prediction",
            open: false,
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M7 22q-.825 0-1.413-.588T5 20V10q0-.825.588-1.413T7 8h10q.825 0 1.413.588T19 10v10q0 .825-.588 1.413T17 22H7Zm5-1.5q.425 0 .713-.288T13 19.5V19h-2v.5q0 .425.288.713T12 20.5ZM11 18h2q0-.575.388-1.137t.862-1.175q.475-.613.863-1.276T15.5 13q0-1.45-1.025-2.475T12 9.5q-1.45 0-2.475 1.025T8.5 13q0 .75.388 1.413t.862 1.274q.475.613.863 1.176T11 18ZM6 6.5q0-.625.438-1.063T7.5 5h9q.625 0 1.063.438T18 6.5H6Zm1-3q0-.625.438-1.063T8.5 2h7q.625 0 1.063.438T17 3.5H7Z"/></svg>
        },
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

    const navsFooter = [
        {
            navType: "clickable",
            href: 'javascript:void(0)',
            name: 'Help',
            icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
            </svg>,
        },
        {
            navType: "clickable",
            href: '/portal/setting',
            name: 'Settings',
            icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>,
        },
        {
            navType: "clickable",
            href: '/login',
            name: 'Logout',
            icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
            </svg>,

        }
    ]

    const profileRef = useRef()

    const [isProfileActive, setIsProfileActive] = useState(false)

    const [sideBar, setSideBar] = useState(true);

    const handleSide = () => {
        setSideBar(!sideBar);
    }
    useEffect(() => {
        const handleProfile = (e) => {
            if (profileRef.current && !profileRef.current.contains(e.target)) setIsProfileActive(false)
        }
        document.addEventListener('click', handleProfile)
    }, [])

    const [dropdownOpen, setDropdownOpen] = useState(false)


    const toggleDropdown = (index) => {
        setNavList((prevState) => {
            const newState = prevState.map((item, i) => {
                if (i === index) {
                    return { ...item, open: !item.open };
                } else if (item.navType === 'dropdown') {
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
                <nav className=" h-screen space-y-8 z-[999]">
                    <div className="flex flex-col relative w-full bg-white h-full border-r">
                        <div className="absolute top-4 -right-3" onClick={handleSide}>
                            <div className=" bg-gradient-to-r from-purple-900 to-purple-800 cursor-pointer rounded-full h-7 w-7 flex justify-center items-center text-white">
                                <AiOutlineLeft />
                            </div>
                        </div>
                        <div className='h-20 flex font-bold text-3xl items-center px-8'>
                            Loan Prediction
                        </div>
                        <div className="flex-1  flex flex-col h-full">
                            <div className="div h-[65%] overflow-y-scroll">

                                <ul className={`was pl-4 text-sm font-medium flex-1 gap-y-3  overflow-y-hidden`}>
                                    {navList.map((item, index) => {
                                        return (
                                            <>
                                                {item.navType === "clickable" ? (
                                                    <>
                                                        <li key={index}>
                                                            <Link href={`${item.href}`} className={`${router.pathname == item.href ? "active bg-purple-800 text-white" : ""} flex items-center gap-x-2 text-base text-gray-500 my-3 p-2 rounded-lg pr-16 py-3  duration-150 mx-4`}>
                                                                <div className="">{item.icon}</div>
                                                                {item.name}
                                                            </Link>
                                                        </li>
                                                    </>
                                                ) : (
                                                    <>
                                                        <div key={index} onClick={() => toggleDropdown(index)}>
                                                            <div className={`${router.pathname == item.href ? "active bg-purple-900 text-white" : ""} flex items-center gap-x-2 text-base text-gray-500 my-3 p-2 rounded-lg  pr-16 py-3 duration-150 mx-4`}>
                                                                <div className="">{item.icon}</div>
                                                                {item.name}
                                                            </div>
                                                        </div>
                                                        {item.open && (
                                                            <ul className="ml-6 z-10 bg-white rounded-lg">
                                                                {item.navChilds?.map((navItem, childIndex) => (
                                                                    <li key={childIndex}>
                                                                        <Link href={navItem.navLink}>
                                                                            <div className={`flex items-center text-sm text-gray-500 my-1 gap-x-2 rounded-lg  pr-16 py-3 duration-150 `}>
                                                                                <span className="">{navItem.icon}</span>
                                                                                {navItem.itemName}
                                                                            </div>
                                                                        </Link>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        )}
                                                    </>
                                                )
                                                }
                                            </>
                                        );
                                    })}
                                </ul>
                            </div>
                            <div className='fixed bottom-0 left-0'>
                                <ul className="px-4 pb-4 text-sm font-medium bg-white">
                                    {navsFooter.map((item, idx) => (
                                        <li key={idx}>
                                            <Link href={item.href} className="flex items-center gap-x-2 text-gray-600 p-2 rounded-lg  hover:bg-gray-50 active:bg-gray-100 duration-150" onClick={item.onClick}>
                                                <div className="text-gray-500">{item.icon}</div>
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                                <div className="py-4 px-4 border-t">
                                    <div className="flex items-center gap-x-4">
                                        <div>
                                            <span className="block text-gray-700 text-sm font-semibold">Anup Kasula</span>
                                            <Link
                                                href="javascript:void(0)"
                                                className="block mt-px text-gray-600 hover:text-indigo-600 text-xs"
                                            >
                                                View profile
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav >
            ) : (
                <>
                    <nav className=" w-20  h-full border-r bg-white space-y-8 z-[999]">
                        <div className="flex flex-col top-0 right-0 h-full relative">
                            <div className="absolute top-4 -right-3" onClick={handleSide}>
                                <div className=" bg-gradient-to-r from-purple-900 to-purple-800 rounded-full cursor-pointer h-7 w-7 flex justify-center items-center text-white">
                                    <AiOutlineRight />
                                </div>
                            </div>
                            <div className='h-20 flex font-bold text-3xl items-center px-8'>
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
                                                            <Link href={`${item.href}`} className={`${router.pathname == item.href ? "active bg-purple-900 text-white" : ""} relative flex items-center justify-center gap-x-2 text-gray-600 p-2 my-3 rounded-lg  active:bg-gray-100 duration-150 group`}>
                                                                <div className="">{item.icon}</div>
                                                                <span className="absolute left-14 p-1 px-1.5 rounded-md whitespace-nowrap text-xs text-white bg-gray-800 hidden group-hover:inline-block group-focus:hidden duration-150 z-50">
                                                                    {item.name}
                                                                </span>
                                                            </Link>
                                                        </li>
                                                    </>
                                                ) : (
                                                    <>
                                                        <div key={index} onClick={() => toggleDropdown(index)}>
                                                            <div className={`${router.pathname == item.href ? "active bg-purple-900 text-white" : ""} relative flex items-center justify-center gap-x-2 text-gray-600 p-2 my-3 rounded-lg  active:bg-gray-100 duration-150 group`}>
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
                                                                                <span className="mr-3">{navItem.icon}</span>
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
                                <div className='fixed bottom-0 left-0'>
                                    <ul className="px-4 pb-4 flex flex-col text-sm font-medium">
                                        {navsFooter.map((item, idx) => (
                                            <button key={idx}>
                                                <Link href={`${item.href}`} className="relative flex items-center justify-center gap-x-2 text-gray-600 p-2 rounded-lg  hover:bg-gray-50 active:bg-gray-100 duration-150 group" onClick={item.onClick}>
                                                    <div className="text-gray-500">{item.icon}</div>
                                                    <span className="absolute left-14 p-1 px-1.5 rounded-md whitespace-nowrap text-xs text-white bg-gray-800 hidden group-hover:inline-block group-focus:hidden duration-150">
                                                        {item.name}
                                                    </span>
                                                </Link>
                                            </button>
                                        ))}
                                    </ul>
                                    <div className="relative flex py-4 px-4 border-t">

                                        {isProfileActive && (
                                            <div className="absolute bottom-4 left-20 w-64 rounded-lg bg-white shadow-md border text-sm text-gray-600">
                                                <div className="p-2">
                                                    <span className="block text-gray-500/80 p-2">anup@gmail.com</span>
                                                    <Link href="javascript:void(0)" className="block w-full p-2 text-left rounded-md hover:bg-gray-50 active:bg-gray-100 duration-150">
                                                        Status
                                                    </Link>
                                                    <button className="block w-full p-2 text-left rounded-md hover:bg-gray-50 active:bg-gray-100 duration-150">
                                                        Logout
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>
                </>
            )}
        </>
    );
};

export default Sidebar;