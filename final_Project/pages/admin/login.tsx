import React, { useState, useRef, useEffect } from 'react';
import loginImage from '../public/images/login.jpeg';
import { useForm, SubmitHandler } from "react-hook-form";
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Login.module.css'
import axios from 'axios';
import { useAuth } from '../../components/context/AuthProvider';
import { useRouter } from 'next/router';
import Head from 'next/head';

type FormValues = {
    login_email: string;
    login_password: string;
}
const Login = () => {
    const { register, handleSubmit, setError, formState: { errors } } = useForm<FormValues>();
    const [errorMessage, setErrorMessage] = useState<String>();
    const [isWaiting, setIsWaiting] = useState<boolean>(false);
    const auth = useAuth();
    const router = useRouter();
    const onSubmit: SubmitHandler<FormValues> = async (data: { login_email: any; login_password: any; }) => {
        console.log(data)
        try {
            setIsWaiting(true)
            const response = await axios.post(`http://localhost:8080/api/login`, {
                email: data.login_email,
                password: data.login_password
            })
            setIsWaiting(false)
            if (response?.status === 200) {
                console.log(response?.data);
                // localStorage.setItem('token', response?.data?.token)
                auth?.login(response?.data?.user, response?.data?.token)
                // auth?.login(response?.data?.user, response?.data?.token, response?.data?.permission)
                router.push('/dashboard')
            }
            console.log(response)
        } catch (err: any) {
            console.log(err)
            setIsWaiting(false)
            setError('login_email', { type: 'custom', message: err?.response?.data?.message });
            // setErrorMessage(err?.response?.data?.message)
            // console.log(err?.response?.data?.message)
        }
    }
    return (
        <>
        <Head><title>Softsaro | Login</title></Head>
            <div className="pt-5 bg-background w-full grid place-items-center h-screen">
                <div className="">
                    <p className='text-3xl font-semibold text-center'>Softsaro Admin</p>
                    <form onSubmit={handleSubmit(onSubmit)} className='relative bg-white' action="">
                        <div className="border mt-4 p-10 rounded w-96">
                            {/* <div className="absolute w-full h-full -z-10 bg-red-50 top-0 right-0"></div> */}
                            {errors?.login_email?.type === "custom" && <p className="text-sm mx-auto p-3 mt-1 text-red-500 bg-red-50 my-4 border border-red-500">{errors?.login_email?.message}</p>}
                            <div className="flex flex-col">
                                <label className='mb-2 text-sm' htmlFor="email">Email</label>
                                <input
                                    id='email'
                                    type="text"
                                    {...register("login_email", { required: "Email is required.", pattern: { value: /^\S+@\S+$/, message: 'Please enter valid email' }, })}
                                    className={
                                        errors?.login_email
                                            ? "text-xs rounded py-4 px-2 border-red-600 border  form-control bg-red-50 flex-grow"
                                            : "text-xs rounded  border py-4 px-2 form-control flex-grow focus:border-purple-500"
                                    }
                                    placeholder='Email'
                                />
                            </div>
                            {errors?.login_email?.type === "pattern" && <p className="text-sm mt-1 w-72 mx-auto text-red-500 rounded-lg">Enter a valid email</p>}
                            {
                                errors?.login_email?.type === "custom" && <p className="text-sm mt-1 w-72 mx-auto text-red-500 rounded-lg">{errors?.login_email?.message}</p>
                            }
                            {errors?.login_email?.type === "required" && <p className="text-sm mt-1 w-72 mx-auto text-red-500 rounded-lg">Email is required</p>}
                            <div className="flex flex-col mt-4">
                                <label className='mb-2 text-sm' htmlFor="email">Password</label>
                                <input
                                    id='email'
                                    type="password"
                                    {...register("login_password", { required: "Password is required.", })}
                                    className={
                                        errors?.login_password
                                            ? "text-xs rounded py-4 px-2 border-red-600 border  form-control bg-red-50 flex-grow"
                                            : "text-xs rounded  border py-4 px-2 form-control flex-grow focus:border-purple-500"
                                    }
                                    placeholder='Password'
                                />
                            </div>
                            {errors?.login_password?.type === "required" && <p className="text-sm mt-1 w-72 mx-auto text-red-500 rounded-lg">Password is required</p>}
                            {isWaiting ?
                                <div className="text-center mt-3">

                                    <button
                                        type="button"
                                        disabled
                                        className={` uppercase text-md px-6 py-1 w-72 h-10 inline-flex cursor-pointer select-none appearance-none items-center justify-center space-x-2 rounded border border-blue-700 text-sm font-medium text-white transition hover:border-blue-800 hover:bg-blue-800 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:pointer-events-none bg-blue-600 disabled:opacity-75`}>
                                        <svg className="h-4 w-4 animate-spin" viewBox="3 3 18 18">
                                            <path
                                                className="fill-blue-800"
                                                d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"></path>
                                            <path
                                                className="fill-blue-100"
                                                d="M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z"></path>
                                        </svg>
                                        <span>Loading...</span>
                                    </button>
                                </div>
                                :
                                <div className='text-center pb-20 mt-10'>
                                    <button type="submit" className={`${styles.directing_btn}  text-white uppercase  font-medium text-md mt-5 px-6 py-1 w-72 h-10 rounded`}>
                                        Login
                                    </button>
                                </div>
                            }

                            {/* <div className="text-center">
                        <p className="uppercase mt-2">Or</p>
                    </div> */}
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login