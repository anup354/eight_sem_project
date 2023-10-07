import React, { useState, useEffect, useMemo, useRef } from "react";
import { useCallback } from "react";
import axios from "axios";
import { useTable, usePagination, useFilters } from "react-table";
import { MdAdd, MdAddAPhoto, MdCheckBox } from "react-icons/md";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { RxDoubleArrowLeft, RxDoubleArrowRight } from "react-icons/rx";

import { useRouter } from "next/router";

import Image from "next/image";
import { CSVLink } from "react-csv";
import { AiOutlineDownload, AiOutlineEdit } from "react-icons/ai";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { MdOutlinePictureAsPdf, MdOutlineDeleteForever } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { asString } from "html2canvas/dist/types/css/types/color";
import { format } from "date-fns";

import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import Head from "next/head";
import { useAuth } from "../context/AuthProvider";

const AdminPrediction = () => {
  const [search, setSearch] = useState("");
  const [loan, setloan] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(2);
  const [pageIndexs, setPageIndex] = useState([]);
  const [column, setColumn] = useState([]);
  const [showOption, setShowOption] = useState(false);
  const [renderapp, setRenderapp] = useState(false);
  const [showEmail, setShowEmail] = useState(true);
  const [show, setShow] = useState(false);
  const [deletingItemId, setDeletingItemId] = useState(null);
  const [clickedRow, setClickedRow] = useState(null);
  const optionsRef = useRef(null);
  const [token, setToken] = useState("");
  const [edit, setEdit] = useState("");
  const dropdownRef = useRef(null);

  const generatePDF = () => {
    const input = document.getElementById("pdf-content");

    html2canvas(input).then((canvas) => {
      const pdf = new jsPDF("p", "pt", "A4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const ratio = canvasWidth / canvasHeight;
      let pageData = canvas.toDataURL("image/png", 1.0);
      pdf.addImage(pageData, "PNG", 0, 0, pageWidth, pageWidth / ratio);
      pdf.save("predictiondata.pdf");
    });
  };

  // useEffect(() => {
  //   const token=(localStorage.getItem("token"))
  //   if(token) {

  //     setToken(token);
  //   }
  // }, []);

  //handle close model
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowOption(false);
    }
  };

  function handleAddClick() {
    router.push("/herosection/addherosection");
  }
  const handleEditClick = async (e, slug) => {
    e.preventDefault();
    router.push(`/admin/view/${slug}`);
    console.log("hello id", slug);
  };

  const handleClick = (rowId) => {
    if (rowId === clickedRow) {
      setClickedRow(null);
    } else {
      setClickedRow(rowId);
    }
  };
  // const handleClickOutside = (event) => {
  //   if (optionsRef.current && !optionsRef.current.contains(event.target)) {
  //     setClickedRow(null);
  //   }
  // };

  // useEffect(() => {
  //   document.addEventListener("click", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("click", handleClickOutside);
  //   };
  // }, [optionsRef.current]);

  const columns = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "predict_id",
      },
      {
        Header: "Name",
        accessor: (row) => `${row.firstName} ${row.lastName}`,
      },
      {
        Header: "Education",
        accessor: "Education",
      },

      {
        Header: "Self_Employed",
        accessor: "Self_Employed",
      },
      {
        Header: "Married",
        accessor: "Married",
      },
      {
        Header: "Gender",
        accessor: "Gender",
      },
      {
        Header: "ApplicantIncome",
        accessor: "ApplicantIncome",
      },
      {
        Header: "CoapplicantIncome",
        accessor: "CoapplicantIncome",
      },
      {
        Header: "Dependents",
        accessor: "Dependents",
      },
      {
        Header: "Credit_History",
        accessor: "Credit_History",
      },
      {
        Header: "Loan_Amount_Term",
        accessor: "Loan_Amount_Term",
      },
      {
        Header: "LoanAmount",
        accessor: "LoanAmount",
      },
      {
        Header: "Property_Area",
        accessor: "Property_Area",
      },
      {
        Header: "Result",
        accessor: "Result",
      },
      // {
      //   Header: "ADDED DATE",
      //   accessor: "added_date",
      //   Cell: ({ value }) => {
      //     const formattedDate = format(new Date(value), "yyyy-MM-dd");
      //     return <div>{formattedDate}</div>;
      //   },
      // },

      {
        Header: "Action",
        accessor: "action",
        Cell: ({ row }) => {
          const [isOpen, setIsOpen] = useState(false);

          const toggleDropdown = () => setIsOpen(!isOpen);
          useEffect(() => {
            document.addEventListener("mousedown", handleClickOutsides);
            return () => {
              document.removeEventListener("mousedown", handleClickOutsides);
            };
          }, []);

          const handleClickOutsides = (event) => {
            if (
              optionsRef.current &&
              !optionsRef.current.contains(event.target)
            ) {
              setIsOpen(false);
            }
          };
          return (
            <>
              <Head>
                <title>Admin | Prediction</title>
              </Head>
              <div className="relative ">
                <button
                  className="text-grey bg-white justify-center w-9 h-9 grid place-items-center rounded-full hover:bg-gray-200 text-lg leading-5 font-medium hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-200 active:text-gray-800 transition duration-150 ease-in-out"
                  onClick={toggleDropdown}
                >
                  <BiDotsVerticalRounded />
                  {/* {row.original.action} */}
                </button>
                {isOpen && (
                  <div
                    className="absolute z-[999] bg-white right-10 mt-2 shadow-md"
                    ref={optionsRef}
                  >
                    <div
                      onClick={(e) =>
                        handleEditClick(e, row.original.predict_id)
                      }
                      className="flex items-center justify-center px-4 py-2 text-sm  text-green-700 hover:bg-green-200  focus:outline-none focus:bg-green-100 focus:text-gray-900"
                    >
                      <div className="pr-3 pt-0.5">
                        <AiOutlineEdit />
                      </div>
                      <button className="text-sm mr-3">View</button>
                    </div>
                    <button
                      onClick={() =>
                        Swal.fire({
                          title: "Are you sure?",
                          text: "You will be able to revert this!",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "Confirm",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            handleDeleteClick(row.original.predict_id);
                          }
                        })
                      }
                      className=""
                    >
                      <div
                        // className="flex pt-2 cursor-pointer pb-1 px-10 hover:bg-red-200 text-red-500"
                        className="flex items-center justify-center px-4 py-2 text-sm  text-red-500 hover:bg-red-200  focus:outline-none focus:bg-red-100 focus:text-red-900"
                      >
                        <div className="pr-3 pt-0.5">
                          <MdOutlineDeleteForever />
                        </div>
                        <button>Delete</button>
                      </div>
                    </button>
                    {/* <div
                              onClick={() => handleDeleteClick(row.original.id)}
                              className="flex pt-2 cursor-pointer pb-1 px-10 hover:bg-red-200 text-red-500"
                            >
                              <div className="pr-3 pt-0.5">
                                <MdOutlineDeleteForever />
                              </div>
                              <button>Delete</button>
                            </div> */}
                  </div>
                )}
              </div>
            </>
          );
        },
      },
    ],
    []
  );
  const auth = useAuth();
  console.log(auth.token);
  const csvLink = {
    filename: "csvFile.csv",
    Header: "columns",
    data: loan,
  };
  const loadHerosection = useCallback(async () => {
    try {
      const headers = {
        Authorization: `Bearer ${auth?.token}`,
      };
      const response = await axios.get(
        `http://localhost:8080/api/predict`
        // `${BaseUrl}api/v1/herosection`
        // , {headers}
      );
      console.log("aa", response);

      const column = response.data.column;
      setColumn(column);

      setloan(response.data.data);
      setRenderapp(true);
    } catch (error) {
      console.log(error);
    }
  }, [setColumn, setloan, token]);

  const [tree, setTree] = useState(false);
  // const [data2, setData2] = useState(null)

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const [response1, response2] = await Promise.all([
  //       fetch('/api/data1'),
  //       fetch('/api/data2')
  //     ])

  //     const data1 = await response1.json()
  //     const data2 = await response2.json()

  //     setData1(data1)
  //     setData2(data2)
  //   }

  //   fetchData()
  // }, [])

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/predict/${id}`);
      loadHerosection();
      toast.success("Successfully deleted");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete");
    }
  };

  const totalItems = loan.length;

  const router = useRouter();

  useEffect(() => {
    loadHerosection();
  }, [loadHerosection]);

  const data = useMemo(() => {
    return loan.filter((loan) =>
      loan.firstName.toLowerCase().includes(search.toLowerCase())
    );
  }, [loan, search]);

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: rowsPerPage },
    },
    useFilters,
    usePagination
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    pageOptions,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    state,
    setFilter,
    gotoPage,
    allColumns,
  } = tableInstance;
  const { pageIndex, pageSize } = state;
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    setFilter("predict_id", value);
  };
  const handlePageChange = (e) => {
    const page = e.target.value ? Number(e.target.value) - 1 : 0;
    setPageIndex(pageIndexs);
    gotoPage(page);
  };

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
  };

  const handleIconClick = () => {
    setShowOption(!showOption);
  };

  // const handleClick = () => {
  //   setShow(!show);
  // };

  useEffect(() => {
    tableInstance.setPageSize(rowsPerPage);
  }, [tableInstance, rowsPerPage]);

  return (
    <>
      {renderapp && (
        <div className="container-fluid bg-light ml-5  mb-10 max-h-[500vh]  max-w-fit">
          <Head>
            <title>Predict Data | Prediction</title>
          </Head>
          <div className="container pt-5  " style={{}}>
            <div className="grid grid-cols-2 text-black">
              <div className="text-xl ">Loan Prediction Data</div>
            </div>
            <ToastContainer />
            <div className="shadow-lg border bg-white p-3 mb-5 bg-dark  rounded-lg mt-4 mr-10 text-xs">
              <div className="text-black flex justify-between w-full">
                <div className="mt-3 ml-2">
                  <label className="block font-medium text-gray-700 mb-2">
                    Status:
                  </label>

                  <div className="flex">
                    <div className="mt-2 ml-5">
                      <label htmlFor="rowsPerPage">Show</label>
                      <select
                        className="bg-white outline-none border-none"
                        name="rowsPerPage"
                        id="rowsPerPage"
                        value={rowsPerPage}
                        onChange={handleRowsPerPageChange}
                      >
                        <option value={2}>2</option>
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={34}>34</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex mt-4">
                  <input
                    type="text"
                    className=" bg-white rounded-md p-2 h-10 border-2 focus:border-hero focus:outline-none"
                    placeholder="Search..."
                    onChange={handleSearchChange}
                    value={search}
                    style={{ width: "180px" }}
                  />
                  <span
                    className="pr-5 pt-2 ml-2 text-hero"
                    style={{ fontSize: "24px" }}
                  >
                    {" "}
                    <div />
                    <div className="relative " ref={dropdownRef}>
                      <div onClick={handleIconClick}>
                        <BiDotsVerticalRounded />
                      </div>
                      {showOption && (
                        <div className="absolute z-[90] shadow-md bg-white w-60 right-0 top-10 rounded-md text-black">
                          <div className="max-h-36 overflow-y-scroll ">
                            {allColumns.map((column) => {
                              return (
                                <div key={column.id}>
                                  <label className="inline-flex items-center text-xs pt-2 pb-4">
                                    <input
                                      type="checkbox"
                                      id={column.id}
                                      {...column.getToggleHiddenProps()}
                                      className="mx-4 align-middle"
                                      unchecked={showEmail}
                                    />
                                    {column.Header}
                                  </label>
                                </div>
                              );
                            })}
                          </div>

                          <div className="pt-1 text-xs">
                            <hr />

                            <button
                              className=" flex pt-3 ml-4"
                              onClick={generatePDF}
                            >
                              <span className="text-xl">
                                <MdOutlinePictureAsPdf />
                              </span>
                              <span className="pl-2">Download as Pdf </span>
                            </button>
                          </div>
                          <div className="pt-5 pb-3 text-xs pl-4 ">
                            <CSVLink {...csvLink} className="flex ">
                              <span className="text-xl">
                                <AiOutlineDownload />
                              </span>
                              <span className="pt-1 pl-2">
                                Download as CSV{" "}
                              </span>
                            </CSVLink>
                          </div>
                        </div>
                      )}
                    </div>
                  </span>
                </div>
              </div>
              <div className=" overflow-x-scroll z-0 ">
                <table
                  className="mt-3 ps-5 table w-full text-xs  "
                  {...getTableProps()}
                  id="pdf-content"
                >
                  <thead>
                    {headerGroups.map((headerGroup) => (
                      <tr
                        key={headerGroup.id} // <-- add a unique "key" prop
                        className="text-center bg-gray-20 border-b border-gray-300 "
                        style={{ color: "#7e7d8c" }}
                        {...headerGroup.getHeaderGroupProps()}
                      >
                        {headerGroup.headers.map((column) => (
                          <th
                            key={column.id} // <-- add a unique "key" prop
                            className="p-3 text-center text-grey font-medium"
                            {...column.getHeaderProps()}
                          >
                            {column.render("Header")}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>

                  <tbody {...getTableBodyProps()}>
                    {page.map((row) => {
                      prepareRow(row);
                      return (
                        <tr
                          key={row.id} // <-- add a unique "key" prop
                          onClick={() => handleClick(row.id)}
                          className=" text-center border-b border-gray-300 ; text-black "
                          {...row.getRowProps()}
                        >
                          {/* <td className="text-red-500">{row.original.id}</td>  */}

                          {row.cells.map((cell) => {
                            return (
                              <td
                                key={cell.getCellProps().key}
                                className="p-3"
                                {...cell.getCellProps()}
                              >
                                {cell.render("Cell")}
                                {/* {console.log(cell.render("Cell"))} */}
                              </td>
                            );
                          })}

                          <td>
                            <div className="">{row.action}</div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-between">
                <div className="outer text-black mt-5 flex text-xs">
                  <span className=" p-2 pt-3">
                    Page{pageIndex + 1} of {pageOptions.length}
                    <span className="pl-3">|</span>
                  </span>
                  <span>
                    Go to page:{""}
                    <input
                      className="bg-white border-gray-400 border rounded-md h-10 focus:outline-none ml-2 pl-2"
                      style={{ width: "50px" }}
                      onChange={handlePageChange}
                      defaultValue={
                        pageIndexs.reduce((sum, value) => sum + value, 0) + 1
                      }
                      type="number"
                    />
                  </span>
                  <p className="text-black pt-3 pl-2">Total: {totalItems}</p>
                </div>

                <div className="  mt-6 text-white flex ">
                  <div>
                    <button
                      className={
                        canPreviousPage
                          ? "bg-[#3f4385] rounded-full h-auto p-1 mr-2 mt-2"
                          : "bg-[#888ee4] rounded-full h-auto p-1 mr-2 mt-2"
                      }
                      onClick={() => previousPage()}
                      disabled={!canPreviousPage}
                    >
                      <RxDoubleArrowLeft />
                    </button>
                  </div>
                  <button
                    className={
                      canPreviousPage
                        ? "bg-[#3f4385] border-2 rounded-lg h-auto p-2 mr-2 text-center  text-xs "
                        : "bg-[#888ee4] border-2 rounded-lg h-auto p-2 mr-2 text-center  text-xs "
                    }
                    onClick={() => previousPage()}
                    disabled={!canPreviousPage}
                  >
                    Previous
                  </button>
                  <button
                    className={
                      canNextPage
                        ? "bg-[#3f4385] rounded-lg h-8 p-2 mr-2 text-center mt-0.5 text-xs"
                        : "bg-[#888ee4] rounded-lg h-8 p-2 mr-2 text-center mt-0.5 text-xs"
                    }
                    onClick={() => nextPage()}
                    disabled={!canNextPage}
                  >
                    Next
                  </button>
                  <div>
                    <button
                      onClick={() => nextPage()}
                      className={
                        canNextPage
                          ? " bg-[#3f4385]  rounded-full h-auto p-1 mr-2 mt-2"
                          : " bg-[#888ee4] rounded-full h-auto p-1 mr-2 mt-2"
                      }
                    >
                      <RxDoubleArrowRight />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminPrediction;
