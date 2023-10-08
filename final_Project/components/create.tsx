import { useForm, SubmitHandler } from "react-hook-form";
import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  BsFacebook,
  BsInstagram,
  BsLinkedin,
  BsTwitter,
  BsYoutube,
} from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdOutlineVisibilityOff, MdOutlineVisibility } from "react-icons/md";
import axios from "axios";
type FormValues = {
  firstname: String;
  lastname: String;
  email: String;
  password: String;
  confirmPassword: String;
};
const Create = () => {
  const router = useRouter();

  const [isvisible, setIsvisible] = useState(false);
  const [email, setEmail] = useState("");
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const [signup_email, setSignup_email] = useState({
    message: "",
    success: "",
  });
  const [signup_new_password, setSignup_new_password] = useState({
    message: "",
    success: "",
  });
  const [signup_confirm_password, setSignup_confirm_password] = useState({
    message: "",
    success: "",
  });

  const onSubmit: SubmitHandler<FormValues> = async (data: any, e) => {
    const data2={
      "firstName":data.firstname,
      "lastName":data.lastname,
      "email":data.email,
      "password":data.password,
      "confirmpassword":data.confirmPassword
    }
    // console.log(data2);
    try {
      const response=await axios.post("http://localhost:8080/api/register",data2)
      if (response?.status === 200) {
        console.log(response);
        toast.success("Successfully Register", {
          position: toast.POSITION.TOP_RIGHT,
        });
        router.push("/login");
      }
      
    } catch (err) {
      console.log(err?.response?.data?.errors);
      if (err?.response?.data?.errors) {
        console.log(err?.response);
        setError("email", {
          type: "custom",
          message: err?.response?.data?.errors?.email?.message,
        });
        setError("signup_new_password", {
          type: "custom",
          message: err?.response?.data?.errors?.password?.message,
        });
        setError("signup_confirm_password", {
          type: "custom",
          message: err?.response?.data?.errors?.confrimpassword?.message,
        });
        console.log(err?.response?.data?.errors);
      } else {
        setSignup_email({
          message: err?.response?.data?.message,
          success: "false",
        });
        setSignup_new_password({
          message: err?.response?.data?.message,
          success: "false",
        });
        setSignup_confirm_password({
          message: err?.response?.data?.message,
          success: "false",
        });
      }
    }
  };

  return (
    <>
      <Head>
        <title>Sign Up | Loan Predictor</title>
      </Head>
      <ToastContainer />
      <div>
        <div className="px-20 max-lg:px-10 max-sm:px-5  py-10">
          <div className="flex max-lg:flex-col ">
            <div className="flex-1  bg-purple-600 rounded-l-md px-10 py-10 text-white">
              <div className="text-4xl font-semibold ">Sign up</div>
              <div className="py-5">Sign up to create your account</div>
              <div className="">Already member of Loan Predictor</div>
              <Link href="/login">
                {" "}
                <button className="px-6 py-1 border-2 rounded-md my-5 hover:bg-white hover:text-primary text-lg font-medium">
                  Login
                </button>
              </Link>
              {/* <div className="">New here ? Join softsaro</div>
           <Link href="/signup">  <button className="px-6 py-1 border-2 rounded-md my-5 hover:bg-white hover:text-primary text-lg font-medium">
                Sign up
              </button></Link>  */}
              <div className=" flex gap-10  text-hero text-slate-200 pt-5">
                <Link href="https://www.facebook.com/softsaronepal">
                  {" "}
                  <BsFacebook />
                </Link>
                <Link href="https://www.instagram.com/softsaronepal/">
                  <BsInstagram />
                </Link>
                <Link href="https://www.linkedin.com/company/softsaronepal/">
                  <BsLinkedin />
                </Link>
                <Link href="https://twitter.com/softsaronepal">
                  <BsTwitter />
                </Link>
              </div>
            </div>
            <div className="flex-1 py-10 px-8 border-2 rounded-r-md">
              {errorMessage && (
                <div className="text-red-500 p-3 border mb-5 border-red-500 bg-red-50 ">
                  {errorMessage}
                </div>
              )}
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex justify-between gap-5">
                  <div className="w-full">
                    <label htmlFor="firstname" className="mt-10">
                      Firt Name
                    </label>{" "}
                    <br />
                    <input
                      type="text"
                      placeholder="firstname"
                      {...register("firstname", {
                        required: "Firstname is required",
                      })}
                      className={
                        errors?.firstname
                          ? "text-xs border p-5 rounded mt-3 border-red-600 bg-red-50 w-full   focus:outline-none"
                          : "justify-center items-center border px-4 py-4 w-full rounded-md outline-none text-sm mt-3  focus:ring-1 focus:ring-primary"
                      }
                    />
                    {errors.firstname && (
                      <span className="text-red-500 text-sm">
                        {errors.firstname.message}
                      </span>
                    )}
                  </div>
                  <div className="w-full">
                    <label htmlFor="lastname" className="mt-10">
                      Last Name
                    </label>{" "}
                    <br />
                    <input
                      type="text"
                      placeholder="lastname"
                      {...register("lastname", {
                        required: "Lastname is required",
                      })}
                      className={
                        errors?.lastname
                          ? "text-xs border p-5 rounded mt-3 border-red-600 bg-red-50 w-full   focus:outline-none"
                          : "justify-center items-center border px-4 py-4 w-full rounded-md outline-none text-sm mt-3  focus:ring-1 focus:ring-primary"
                      }
                    />
                    {errors.lastname && (
                      <span className="text-red-500 text-sm">
                        {errors.lastname.message}
                      </span>
                    )}
                  </div>
                </div>
                <label htmlFor="email" className="mt-10">
                  Email
                </label>{" "}
                <br />
                <input
                  type="email"
                  placeholder="Email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Please enter a valid email address",
                    },
                  })}
                  className={
                    errors?.email
                      ? "text-xs border p-5 rounded mt-3 border-red-600 bg-red-50 w-full   focus:outline-none"
                      : "justify-center items-center border px-4 py-4 w-full rounded-md outline-none text-sm mt-3  focus:ring-1 focus:ring-primary"
                  }
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">
                    {errors.email.message}
                  </span>
                )}
                {signup_email?.message && (
                    <p
                      className={
                        signup_email?.success === `true`
                          ? " text-sm text-green-400 ml-2"
                          : "text-xs text-red-400 ml-2 my-2"
                      }
                    >
                      {signup_email?.message}
                    </p>
                  )}
                  
                <div className=" pt-5">
                  <div className="relative">
                    <label htmlFor="password">Password</label> <br />
                    <input
                      minLength={8}
                      type={isvisible ? "text" : "password"}
                      placeholder="Password"
                      {...register("password", {
                        required: "Password is required",
                        pattern: {
                          value:
                            /^(?=.*[\d])(?=.*[!@#$%^&*])[\w!@#$%^&*]{6,50}$/,
                          message:
                            "Password must have atleast 8 characters and contain a special character",
                        },
                      })}
                      className={
                        errors?.password
                          ? "text-xs border p-5 rounded mt-3 border-red-600 bg-red-50 w-full   focus:outline-none"
                          : "justify-center items-center border px-4 py-4 w-full rounded-md outline-none text-sm mt-3 focus:ring-1 focus:ring-primary"
                      }
                    />
                    
                    <div
                      className="absolute top-14 right-4 cursor-pointer"
                      onClick={() => setIsvisible(!isvisible)}
                    >
                      {isvisible ? (
                        <span className="">
                          <MdOutlineVisibility />
                        </span>
                      ) : (
                        <span className="">
                          <MdOutlineVisibilityOff />
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                {errors.password && (
                  <span className="text-red-500 text-sm">
                    {errors.password.message}
                  </span>
                )}
                {signup_new_password?.message && (
                      <p
                        className={
                          signup_new_password?.success === `true`
                            ? " text-sm text-green-400 ml-2"
                            : "text-sm text-red-400 ml-2 my-2"
                        }
                      >
                        {signup_new_password?.message}
                      </p>
                    )}






                <div className=" pt-5">
                  <div className="relative">
                    <label htmlFor="confirmPassword">Confirm Password</label>{" "}
                    <br />
                    <input
                      minLength={8}
                      type={isConfirmVisible ? "text" : "password"}
                      placeholder="Confirm Password"
                      {...register("confirmPassword", {
                        required: "Confirm Password is required",
                        validate: (val: any) => {
                          if (watch("password") != val) {
                            return "Your password do not match";
                          }
                        },
                      })}
                      className={
                        errors?.confirmPassword
                          ? "text-xs border p-5 rounded mt-3 border-red-600 bg-red-50 w-full   focus:outline-none"
                          : "justify-center items-center border px-4 py-4 w-full rounded-md outline-none text-sm mt-3 focus:ring-1 focus:ring-primary"
                      }
                    />
                    {signup_confirm_password?.message && (
                      <p
                        className={
                          signup_confirm_password?.success === `true`
                            ? " text-sm text-green-400 ml-2"
                            : "text-sm text-red-400 ml-2 my-2"
                        }
                      >
                        {signup_confirm_password?.message}
                      </p>
                    )}
                    <div
                      className="absolute top-14 right-4 cursor-pointer"
                      onClick={() => setIsConfirmVisible(!isConfirmVisible)}
                    >
                      {isConfirmVisible ? (
                        <span className="">
                          <MdOutlineVisibility />
                        </span>
                      ) : (
                        <span className="">
                          <MdOutlineVisibilityOff />
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                {errors.confirmPassword && (
                  <span className="text-red-500 text-sm">
                    {errors.confirmPassword.message}
                  </span>
                )}
                <Link href="">
                  <div className="underline text-xs py-5 text-primary text-center">
                    Having trouble logging in?
                  </div>
                </Link>
                <button
                  className="w-full font-medium text-lg text-white bg-purple-600 py-3 rounded-md hover:bg-white hover:text-primary border hover:border-primary"
                  type="submit"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Create;
