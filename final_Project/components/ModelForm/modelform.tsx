import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { useAuth } from "../context/AuthProvider";
import { useRouter } from "next/router";

type FormValues = {
  applicant_name: String;
  coapplicant_income: number;
  applicant_income: number;
  loan_amount: number;
  loan_amount_term: number;
  credit_history: number;
  propertyarea: number;
};

const Modelform = () => {
  const auth = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!auth?.user?.token) {
      router.push("/login");
    }
  });
  const [isDependent, setIsDependent] = useState("1");

  const menuItems = [
    {
      name: "Ungraduated",
      value: "0",
    },
    {
      name: "Graduated",
      value: "1",
    },
    // {
    //   name: "+2",
    //   value:"1"
    // },
    // {
    //   name: "Bachelor",
    //   value:"1"
    // },
    // {
    //   name: "Master",
    //   value:"1"
    // },
  ];
  const propertyItems = [
    {
      name: "Urban",
      value: "0",
    },
    {
      name: "Semi Urban",
      value: "1",
    },

    {
      name: "Rural",
      value: "2",
    },
  ];

  const [selectedItem, setSelectedItem] = useState({
    item: null,
    idx: null,
  });

  const [state, setState] = useState(false);
  const [showPop, setShowPop] = useState(false);
  const [gender, setGender] = useState("1");
  const [marry, setMarry] = useState("0");
  const [employed, setEmployed] = useState("1");
  const [education, setEducation] = useState("");
  const [area, setArea] = useState("");
  const [htmlok, setHTML] = useState();
  const [Defaultvalue, setDefaultvalue] = useState("");

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

  // Function to handle the radio button change event
  const handleRadioButtonChange = (event: any) => {
    setIsDependent(event.value);
    // console.log(event.value)
  };
  const radios = [
    {
      name: "Male",
      value: "1",
    },
    {
      name: "Female",
      value: "0",
    },
  ];
  const depend = [
    {
      name: "0",
      value: "0",
    },
    {
      name: "1",
      value: "1",
    },
    {
      name: "2",
      value: "2",
    },
    {
      name: "3",
      value: "3",
    },
    {
      name: "4",
      value: "4",
    },
  ];
  const mysetEducation = (e) => {
    setEducation(e.value);
  };
  const onSubmit: SubmitHandler<FormValues> = async (data: any, e) => {
    console.log("Education", education);
    console.log("Self_Employed", employed);
    console.log("Married", marry);
    console.log("Gender", gender);
    console.log("Dependents", isDependent);
    console.log("ApplicantIncome", data.applicant_income);
    console.log("CoapplicantIncome", data.coapplicant_income);
    console.log("Credit_History", data.credit_history);
    console.log("Loan_Amount_Term", data.loan_amount_term);
    console.log("LoanAmount", data.loan_amount);
    console.log("Property_Area", area);
    e?.preventDefault();
    // const data4 = {
    //   Education: education,
    //   Self_Employed: employed,
    //   Married: marry,
    //   Gender: gender,
    //   Dependents: isDependent,
    //   ApplicantIncome: data.applicant_income,
    //   CoapplicantIncome: data.coapplicant_income,
    //   Credit_History: data.credit_history,
    //   Loan_Amount_Term: data.loan_amount_term,
    //   LoanAmount: data.loan_amount,
    //   Property_Area: area,
    // }
    const formData = new FormData();

    formData.append("Education", education);
    formData.append("Self_Employed", employed);
    formData.append("Married", marry);
    formData.append("Gender", gender);
    formData.append("Dependents", isDependent);
    formData.append("ApplicantIncome", data.applicant_income);
    formData.append("CoapplicantIncome", data.coapplicant_income);
    formData.append("Credit_History", data.credit_history);
    formData.append("Loan_Amount_Term", data.loan_amount_term);
    formData.append("LoanAmount", data.loan_amount);
    formData.append("Property_Area", area);

    const headers = {
      Authorization: `Bearer ${auth?.user?.token}`, // Make sure you have a valid token here.
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/predict",
        formData
      );

      console.log(response.data);
      const h = response.data;
      setHTML(response.data);

      if (h[0] === 1) {
        new Swal(
          "Loan Approved",
          "Congratulations! Your loan has been approved.",
          "success"
        );
      } else {
        new Swal(
          "Loan Not Approved",
          "Sorry, your loan has not been approved.",
          "error"
        );
      }

      const mydata = {
        Education: education,
        Self_Employed: employed,
        Married: marry,
        Gender: gender,
        Dependents: isDependent,
        ApplicantIncome: data.applicant_income,
        CoapplicantIncome: data.coapplicant_income,
        Credit_History: data.credit_history,
        Loan_Amount_Term: data.loan_amount_term,
        LoanAmount: data.loan_amount,
        Property_Area: area,
        Result: h[0],
      };
      try {
        const insert = await axios.post(
          "http://localhost:8080/api/predict",
          mydata,
          { headers: headers }
        );
  
        console.log(insert);
      } catch (error) {
        console.log("API Error:", error);
      }
      setDefaultvalue("");
    } catch (error) {
      console.log("Prediction Error:", error.message);
    }
    
  };
  const handleButtonClick = (h) => {
    console.log(h[0]);
    if (h[0] === 1) {
      new Swal(
        "Loan Approved",
        "Congratulations! Your loan has been approved.",
        "success"
      );
    } else {
      new Swal(
        "Loan Not Approved",
        "Sorry, your loan has not been approved.",
        "error"
      );
    }
  };

  return (
    <>
      <main className="max-w-screen-xl mt-12 mx-auto px-4 md:px-8">
        <div className=" space-y-10 px-4 lg:px-36 text-gray-600  w-full ">
          <div className="text-center">
            <div className="mt-5 space-y-2">
              <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl text-purple-900">
                Loan Approval Prediction Form
              </h3>
            </div>
          </div>
          <div className="bg-white shadow p-4 py-6 sm:p-6 sm:rounded-lg">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label className="font-medium">Applicant Name</label>
                <input
                  {...register("applicant_name", {
                    // required: true,
                  })}
                  value={auth?.user?.firstname + ' ' + auth?.user?.lastname}

                  type="text"
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  
                  disabled
                />
                {errors?.applicant_name?.type === "required" && (
                  <p className="text-red-600 font-main text-sm mt-1">
                    This field is required
                  </p>
                )}
              </div>
              {/* gender */}
              <div>
                <label className="font-medium">Gender</label>
                <div className="mt-2 flex w-full gap-2 md:gap-12  justify-between">
                  {radios.map((item, idx) => (
                    <div key={idx} className="w-full ">
                      <label htmlFor={item.name} className="block relative">
                        <input
                          id={item.name}
                          type="radio"
                          defaultChecked={gender === item.value ? true : false}
                          name="payment"
                          className="sr-only peer"
                          value={item.value}
                          onChange={(e) => setGender(e.target.value)}
                        />
                        <div className="flex  p-4 cursor-pointer rounded-lg border bg-white shadow-sm ring-indigo-600 peer-checked:ring-2 duration-200">
                          <div>
                            <h3 className="leading-none text-gray-800 font-medium ">
                              {item.name}
                            </h3>
                          </div>
                        </div>
                        <div className="absolute top-4 right-4 flex-none flex items-center justify-center w-4 h-4 rounded-full border peer-checked:bg-indigo-600 text-white peer-checked:text-white duration-200">
                          <svg className="w-2.5 h-2.5" viewBox="0 0 12 10">
                            <polyline
                              fill="none"
                              stroke-width="2px"
                              stroke="currentColor"
                              stroke-dasharray="16px"
                              points="1.5 6 4.5 9 10.5 1"
                            ></polyline>
                          </svg>
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              {/* married status */}
              <div className="mt-2">
                <label className="font-medium">Married</label>
                <div className="flex mt-2 text-lg">
                  <div className="">
                    <input
                      type="radio"
                      name="marry"
                      value="1"
                      onChange={(e) => setMarry(e.target.value)}
                      defaultChecked={marry === "1"}
                    />
                    <span className="ml-2">Yes</span>
                  </div>
                  <div className=" ml-4 text-lg">
                    <input
                      type="radio"
                      name="marry"
                      value="0"
                      defaultChecked={marry === "0"}
                      onChange={(e) => setMarry(e.target.value)}
                    />
                    <span className="ml-2">No</span>
                  </div>
                </div>
              </div>
              {/* dependents */}
              <div className="mt-2">
                <label className="font-medium">Dependent</label>
                <div className="label-button flex items-center gap-1 pt-2 rounded-lg ">
                  <Controller
                    name="dependent"
                    control={control}
                    render={({ field }) => (
                      <Select
                        isClearable
                        className="w-full rounded-lg text-xs shadow-sm"
                        options={depend.map((item) => ({
                          value: item.value,
                          label: item.name,
                        }))}
                        {...field}
                        onChange={(e: any) => {
                          handleRadioButtonChange(e);
                        }}
                      />
                    )}
                  />
                </div>
                {/* )} */}
              </div>
              {/* education */}
              <div>
                <label className="font-medium">Education</label>
                <div className="label-button flex items-center gap-1 pt-2 rounded-lg ">
                  <Select
                    // styles={selectStyle}
                    isClearable
                    className="w-full rounded-lg text-xs shadow-sm"
                    options={menuItems.map((item) => ({
                      value: item.value,
                      label: item.name,
                    }))}
                    onChange={(e: any) => {
                      mysetEducation(e);
                    }}
                  />
                </div>
              </div>

              {/* self employed*/}
              <div className="mt-2">
                <label className="font-medium">Self Employed</label>
                <div className="flex mt-2 text-lg">
                  <div className="">
                    <input
                      type="radio"
                      name="Employed"
                      value="1"
                      defaultChecked={employed === "1"}
                      onChange={(e) => setEmployed(e.target.value)}
                    />
                    <span className="ml-2">Yes</span>
                  </div>
                  <div className=" ml-4 text-lg">
                    <input
                      type="radio"
                      name="Employed"
                      value="0"
                      defaultChecked={employed === "0"}
                      onChange={(e) => setEmployed(e.target.value)}
                    />
                    <span className="ml-2">No</span>
                  </div>
                </div>
              </div>
              {/* applicant income */}
              <div>
                <label className="font-medium">Applicant Income</label>
                <input
                  {...register("applicant_income", {
                    required: true,
                  })}
                  defaultValue={Defaultvalue}
                  type="text"
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
                {errors?.applicant_income?.type === "required" && (
                  <p className="text-red-600 font-main text-sm mt-1">
                    This field is required
                  </p>
                )}
              </div>
              {/* cp-applicant income */}
              <div>
                <label className="font-medium">Coapplicant Income</label>
                <input
                  {...register("coapplicant_income", {
                    required: true,
                  })}
                  defaultValue={Defaultvalue}
                  type="text"
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
                {errors?.coapplicant_income?.type === "required" && (
                  <p className="text-red-600 font-main text-sm mt-1">
                    This field is required
                  </p>
                )}
              </div>
              {/* Loan amount */}
              <div>
                <label className="font-medium">Loan amount</label>
                <input
                  {...register("loan_amount", {
                    required: true,
                  })}
                  defaultValue={Defaultvalue}
                  type="text"
                  placeholder="Loan amount "
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
                {errors?.loan_amount?.type === "required" && (
                  <p className="text-red-600 font-main text-sm mt-1">
                    This field is required
                  </p>
                )}
              </div>
              {/* Loan_Amount_Term */}
              <div>
                <label className="font-medium">Loan Amount Term</label>
                <input
                  {...register("loan_amount_term", {
                    required: true,
                  })}
                  defaultValue={Defaultvalue}
                  type="text"
                  placeholder="Terms of loan"
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
                {errors?.loan_amount_term?.type === "required" && (
                  <p className="text-red-600 font-main text-sm mt-1">
                    This field is required
                  </p>
                )}
              </div>
              {/* Credit_History */}
              <div>
                <label className="font-medium">Credit History</label>
                <input
                  {...register("credit_history", {
                    required: true,
                  })}
                  defaultValue={Defaultvalue}
                  type="text"
                  placeholder="Credit history of individual’s repayment of their debts"
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
                {errors?.credit_history?.type === "required" && (
                  <p className="text-red-600 font-main text-sm mt-1">
                    This field is required
                  </p>
                )}
              </div>

              {/* Property_Area */}
              <div>
                <label className="font-medium">Property Area</label>
                <div className="label-button flex items-center gap-1 pt-2 rounded-lg ">
                  <Controller
                    name="propertyarea"
                    control={control}
                    render={({ field }) => (
                      <Select
                        // styles={selectStyle}
                        isClearable
                        className="w-full rounded-lg text-xs shadow-sm"
                        options={propertyItems.map((item) => ({
                          value: item.value,
                          label: item.name,
                        }))}
                        {...field}
                        onChange={(e: any) => {
                          setArea(e.value);
                        }}
                      />
                    )}
                  />
                </div>

                {errors?.propertyarea?.type === "required" && (
                  <p className="text-red-600 font-main text-sm mt-1">
                    This field is required
                  </p>
                )}
              </div>

              <button className=" px-4 py-2 text-white font-medium bg-purple-600 hover:bg-purple-500 active:bg-purple-600 rounded-lg duration-150">
                Predict
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default Modelform;
