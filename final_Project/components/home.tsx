import house from "../public/images/house.jpg";
import Image from "next/image";
import Head from "next/head";
import React, { useState } from 'react';

const Home = () => {
  const [isLearnMoreOpen, setLearnMoreOpen] = useState(false);

  const toggleLearnMore = () => {
    setLearnMoreOpen(!isLearnMoreOpen);
  };
  return (
    <div>
      <Head>
        <title>Home | Loan Predictor</title>
      </Head>
      <section className="py-14">
        <div className="max-w-screen-xl mx-auto md:px-8">
          <div className="items-center gap-x-12 sm:px-4 md:px-0 lg:flex">
            <div className="flex-1 sm:hidden lg:block">
              {/* <img src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80" className="md:max-w-lg sm:rounded-lg" alt="" /> */}
              <Image
                src='https://imgnew.outlookindia.com/uploadimage/library/16_9/16_9_2/IMAGE_1651483122.webp'
                width={450}
                height={450}
                className="w-full"
                alt="img"
              />
            </div>
            <div className="max-w-xl px-4 space-y-3 mt-6 sm:px-0 md:mt-0 lg:max-w-2xl">
  <h3 className="text-indigo-600 font-semibold">
    Loan Approval Prediction System{" "}
  </h3>
  <p className="mt-3 text-gray-600">
    Loan Approval Prediction System, Use this system to predict whether your loan will be Approved or not. Give your feedback for the if you encounter any error.{" "}
  </p>
  <a
    href="javascript:void(0)"
    className="inline-flex gap-x-1 items-center text-indigo-600 hover:text-indigo-500 duration-150 font-medium"
    onClick={toggleLearnMore}
  >
    Learn more
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={`w-5 h-5 ${isLearnMoreOpen ? 'rotate-180' : ''}`}
    >
      <path
        fillRule="evenodd"
        d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
        clipRule="evenodd"
      />
    </svg>
  </a>
  {isLearnMoreOpen && (
    <div className="mt-3 text-gray-600">
     A loan prediction system is important because it helps financial institutions assess and minimize risks, make informed lending decisions, and allocate resources efficiently, ultimately promoting financial stability.
    </div>
  )}
  {isLearnMoreOpen && (
    <div className="mt-3 text-gray-600">
     Loan prediction systems can be used by banks, credit unions, and financial institutions to evaluate loan applicants' creditworthiness and make informed lending decisions.
    </div>
  )}
</div>

          </div>
        </div>
      </section>

      {/* featured section */}
      <section className="py-14">
        <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
          <div className="relative max-w-2xl mx-auto sm:text-center">
            <div className="relative z-10">
              <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
                Features
              </h3>
            </div>
            <div
              className="absolute inset-0 max-w-xs mx-auto h-44 blur-[118px]"
              style={{
                background:
                  "linear-gradient(152.92deg, rgba(192, 132, 252, 0.2) 4.54%, rgba(232, 121, 249, 0.26) 34.2%, rgba(192, 132, 252, 0.1) 77.55%)",
              }}
            ></div>
          </div>
          <div className="relative mt-12">
            <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <li className="bg-white space-y-3 p-4 border rounded-lg">
                <div className="text-indigo-600 pb-3">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                  </svg>
                </div>
                <h4 className="text-lg text-gray-800 font-semibold">
                  Easy to use
                </h4>
                <p>
                  {` Easy to use tool, simply put some features and get to know
                  whether you'll get an Approval or not.`}
                </p>
              </li>
              <li className="bg-white space-y-3 p-4 border rounded-lg">
                <div className="text-indigo-600 pb-3">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="6" cy="6" r="3"></circle>
                    <circle cx="6" cy="18" r="3"></circle>
                    <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"></path>
                  </svg>
                </div>
                <h4 className="text-lg text-gray-800 font-semibold">
                  Only Numerical
                </h4>
                <p>{'Put only Numerical in the features.'}</p>
              </li>
              <li className="bg-white space-y-3 p-4 border rounded-lg">
                <div className="text-indigo-600 pb-3">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <h4 className="text-lg text-gray-800 font-semibold">
                  Accuracy
                </h4>
                <p>
                  {`It also has good Accuracy that makes good prediction using low
                  error.`}
                </p>
              </li>
              <li className="bg-white space-y-3 p-4 border rounded-lg">
                <div className="text-indigo-600 pb-3">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7"></path>
                  </svg>
                </div>
                <h4 className="text-lg text-gray-800 font-semibold">Model</h4>
                <p>{`Tested on various model, but choosen, Random Forest. `}</p>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
