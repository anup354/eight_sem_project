import { useForm, Controller, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { useState } from "react";

type FormValues = {
  bank_name: String;
  shortform: String;
  tenure: String;
  interest_rate: String;
};
const index = () => {
  const router = useRouter();
  const [bankError, setBankError] = useState();

  const handleBackClick = (e) => {
    e.preventDefault();
    router.push("/admin/bank");
  };
  const {
    register,
    handleSubmit,
    control,
    setError,
    setValue,
    getValues,
    clearErrors,
    resetField,

    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data: any, e) => {
    // const headers = {
    //   Authorization: `Bearer ${auth?.user?.token}`,
    // };
    const mydata = {
      bank_name: data.bank_name,
      shortform: data.shortform,
      interest_rate: data.interest_rate,
      tenure: data.tenure,
    };
    console.log("adazdz", mydata);

    try {
      const insert = await axios.post(
        "http://localhost:8080/api/bank",
        mydata
        // ,
        // { headers: headers }
      );
      toast.success("Successfully Added");
      router.push("/admin/bank");

      console.log(insert);
    } catch (error) {
      console.log("API Error:", error);
      if (error?.response?.data?.errors?.Bank) {
        setBankError(error?.response?.data?.errors?.Bank?.message);
      }
    }
  };

  return (
    <main className="max-w-screen-xl  mx-auto px-4 md:px-8">
      <div className="space-y-2">
        <h3 className="text-gray-800 text-xl font-bold ">Add Bank</h3>
      </div>
      <ToastContainer />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-5">
        <div>
          <label className="font-medium">Bank Name</label>
          <input
            {...register("bank_name", {
              required: true,
            })}
            // defaultValue={Defaultvalue}
            type="text"
            placeholder="Bank Name "
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          />
          {errors?.bank_name?.type === "required" && (
            <p className="text-red-600 font-main text-sm mt-1">
              This field is required
            </p>
          )}
          {bankError && (
            <p className="text-red-600 font-main text-sm mt-1">{bankError}</p>
          )}
        </div>

        <div>
          <label className="font-medium">Bank ShortForm</label>
          <input
            {...register("shortform", {
              required: true,
            })}
            // defaultValue={Defaultvalue}
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


        <div className="flex gap-5 mt-5 items-center ">
          <button
            onClick={handleBackClick}
            className="bg-gray-500 hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Back
          </button>
          <button className=" px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
            Submit
          </button>
        </div>
      </form>
    </main>
  );
};

index.requiredAuth = true;
export default index;
