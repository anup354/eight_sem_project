import axios from "axios";
import { useRouter } from "next/router";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Head from "next/head";

type FormValues = {
  bank_name: String;
  shortform: String;
  tenure: String;
  interest_rate: String;
};

const index = () => {
  const [renderApp, setRenderApp] = useState(false);
  const [oldData, setoldData] = useState();

  const router = useRouter();

  const handleBackClick = (e) => {
    e.preventDefault();
    router.push("/admin/bank");
  };

  const {
    register,
    setError,
    handleSubmit,
    reset,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormValues>();

  const loadData = async (id) => {
    console.log("aa", id);
    try {
      const response = await axios.get(
        `http://localhost:8080/api/bankbyid/${id}`
      );
      console.log(response.data.data);
      setoldData(response.data.data);
      setRenderApp(true);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (router.isReady) {
      loadData(router.query.index);
    }
  }, [router.isReady, router.query.index]);

  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    const mydata = {
      bank_name: data.bank_name,
      shortform: data.shortform,
      interest_rate: data.interest_rate,
      tenure: data.tenure,
    };
    try {
      const result = await axios.put(
        `http://localhost:8080/api/bank/${router.query.index}`,
        mydata
        // ,
        // {
        //   headers: {
        //     "Content-Type": "application/json",
        //     Authorization: `Bearer ${auth?.user?.token}`,
        //   },
        // }
      );

      if (result.status === 200) {
        toast.success("Page Successfully Updated", {
          position: toast.POSITION.TOP_RIGHT,
        });

        router.push("/admin/bank");
      }
    } catch (err: any) {
      console.log("error", err);
    }
  };

  return (
    <>
      {renderApp && (
        <div className=" min-h-screen">
          <Head>
            <title>Edit | Loan Prediction</title>
          </Head>
          <ToastContainer />
          <h1 className="text-xl font-bold text-gray-800 mb-6 pt-1 pl-10  ">
            Edit Bank
          </h1>
          <form
            className="mr-5 ml-5 text-sm bg-white shadow-md rounded-lg px-8 pb-8 mb-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* bank name  */}

            <div>
              <label className="font-medium">Bank Name</label>
              <input
                {...register("bank_name", {
                  required: true,
                })}
                // defaultValue={Defaultvalue}
                type="text"
                placeholder="Bank Name "
                defaultValue={oldData.bank_name}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
              {errors?.bank_name?.type === "required" && (
                <p className="text-red-600 font-main text-sm mt-1">
                  This field is required
                </p>
              )}
            </div>

            {/* shortform */}
            <div>
              <label className="font-medium">Bank ShortForm</label>
              <input
                {...register("shortform", {
                  required: true,
                })}
                defaultValue={oldData?.shortform}
                type="text"
                placeholder="Bank ShortForm"
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
              {errors?.shortform?.type === "required" && (
                <p className="text-red-600 font-main text-sm mt-1">
                  This field is required
                </p>
              )}
            </div>

            <div>
              <label className="font-medium">Bank Interest Rate</label>
              <input
                {...register("interest_rate", {
                  required: true,
                })}
                defaultValue={oldData?.interest_rate}

                // defaultValue={Defaultvalue}
                type="text"
                placeholder="Bank Interest Rate"
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
              {errors?.interest_rate?.type === "required" && (
                <p className="text-red-600 font-main text-sm mt-1">
                  This field is required
                </p>
              )}
            </div>

            <div>
              <label className="font-medium">Tenure</label>
              <input
                {...register("tenure", {
                  required: true,
                })}
                defaultValue={oldData?.tenure}

                // defaultValue={Defaultvalue}
                type="text"
                placeholder="Bank Interest Rate"
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
              {errors?.tenure?.type === "required" && (
                <p className="text-red-600 font-main text-sm mt-1">
                  This field is required
                </p>
              )}
            </div>

            <div className="flex mt-5 items-center gap-5">
              <button
                onClick={handleBackClick}
                className="bg-gray-500 hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Back
              </button>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Edit section
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

index.requiredAuth = true;

export default index;
