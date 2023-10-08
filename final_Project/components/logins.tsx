import { SubmitHandler, useForm } from "react-hook-form";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  BsFacebook,
  BsInstagram,
  BsLinkedin,
  BsTwitter,
  BsYoutube,
} from "react-icons/bs";
import { MdOutlineVisibilityOff, MdOutlineVisibility } from "react-icons/md";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "./context/AuthProvider";
type LoginValues = {
  email: string;
  password: string;
};
const Logins = () => {
  const router = useRouter();
  const [isvisible, setIsvisible] = useState("");

  const [errorMessage, setErrorMessage] = useState<String>();

  // useEffect(()=>{
  //   if(localStorage.getItem("token")){
  //     router.push("portal/dashboard");
  //   }
  // },[])

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginValues>();
  const [email, setEmail] = useState<any>({ message: "", success: "" });
  const [password, setPassword] = useState({ message: "", success: "" });
  const auth = useAuth();

  const onSubmitForm: SubmitHandler<LoginValues> = async (data) => {
    const loginForm = {
      email: data.email,
      password: data.password,
    };
    try {
      // const response = await axios.post(
      //   `${auth?.baseURL}/api/login`,
      //   loginForm
      // );
      const response = await axios.post(
        `http://localhost:8080/api/login`,
        loginForm
      );
      
      if (response?.status === 200) {
        console.log(response);
        auth?.login(
          response?.data?.token,
          response?.data?.role,
          response?.data?.firstname,
          response?.data?.lastname
        );

        toast.success("Login Successfull", {
          position: toast.POSITION.TOP_RIGHT,
        });
        if (!response?.data?.role) {
          router.push("/");
        }
        if (response?.data?.role === "ADMIN") {
          router.push("/admin/dashboard");
        }

        // if (response?.data?.setup?.is_email_verify === 1) {
        //   auth?.login(
        //     response?.data?.setup?.account_manager,
        //     response?.data?.setup?.company_name,
        //     response?.data?.setup?.email,
        //     response?.data?.setup?.first_name,
        //     response?.data?.setup?.is_email_verify,
        //     response?.data?.setup?.issetup_complete,
        //     response?.data?.setup?.last_name,
        //     response?.data?.setup?.username,
        //     response?.data?.issetup_complete,
        //     response?.data?.token
        //   );
        // }
      }
    } catch (err: any) {
      if (err?.response?.data?.errors) {
        console.log(err?.response);
        setError("email", {
          type: "custom",
          message: err?.response?.data?.errors?.email?.message,
        });
        setError("password", {
          type: "custom",
          message: err?.response?.data?.errors?.password?.message,
        });
      } else {
        setEmail({
          message: err?.response?.data?.message,
          success: "false",
        });
      }
    }
  };

  return (
    <>
      <Head>
        <title>Login | Loan Predictor</title>
      </Head>
      <ToastContainer />
      {/* <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          className: "",
          duration: 15000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      /> */}
      <div>
        <div className="px-20 max-lg:px-10 max-sm:px-5  py-10">
          <div className="flex max-lg:flex-col ">
            <div className="flex-1  bg-primary rounded-l-md px-10 py-10 text-white">
              <div className="text-4xl font-semibold ">Login</div>
              <div className="py-5">
                Please enter your login details to continue using your account
              </div>
              <div className="">Not member of Loan Predictor</div>
              <Link href="/signup">
                {" "}
                <button className="px-6 py-1 border-2 rounded-md my-5 hover:bg-white hover:text-primary text-lg font-medium">
                  Signup
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
              <form onSubmit={handleSubmit(onSubmitForm)}>
                <div className="z-20 ">
                  {email?.message && (
                    <p
                      className={
                        email?.success === `true`
                          ? " text-sm text-green-400"
                          : "text-sm text-red-500 border-red-400 border bg-red-100  text-center p-2 my-1"
                      }
                    >
                      {email?.message}
                    </p>
                  )}
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
                      message: "Invalid email address",
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
                <div className=" pt-5">
                  <div className="relative">
                    <label htmlFor="password">Password</label> <br />
                    <input
                      minLength={8}
                      type={isvisible ? "text" : "password"}
                      placeholder="Password"
                      {...register("password", {
                        required: "Password is required",
                      })}
                      className={
                        errors?.password
                          ? "text-xs border p-5 rounded mt-3 border-red-600 bg-red-50 w-full   focus:outline-none"
                          : "justify-center items-center border px-4 py-4 w-full rounded-md outline-none text-sm mt-3 focus:ring-1 focus:ring-primary"
                      }
                    />
                    {password?.message && (
                      <p
                        className={
                          password?.success === `true`
                            ? " text-sm text-green-400 ml-2"
                            : "text-sm text-red-400 ml-2"
                        }
                      >
                        {password?.message}
                      </p>
                    )}
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

export default Logins;
