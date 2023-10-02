import axios from "axios";
import { useRouter } from "next/router";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Head from "next/head";
import Image from "next/image";

import dynamic from "next/dynamic";

const ReactQuill = dynamic(import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

type FormValues = {
  blog_name: String;
  description: String;
  image: String;
};

const index = () => {
  const [renderApp, setRenderApp] = useState(false);
  const [oldData, setoldData] = useState();
  const [editorText, setEditorText] = useState("");

  const router = useRouter();

  //image
  const [image, setImage] = useState();

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedImage = event.dataTransfer.items[0];
    setImage(droppedImage);
  };
  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    if (selectedImage) {
      setImage(selectedImage);
    }
  };
  const handleDragOver = (event) => {
    event.preventDefault();
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

  const handleBackClick = (e) => {
    e.preventDefault();
    router.push("/admin/blog");
  };
  const loadData = async (id) => {
    console.log("aa", id);
    try {
      const response = await axios.get(
        `http://localhost:8080/api/blogbyid/${id}`
      );
      console.log(response.data.data);
      setoldData(response.data.data);
      setEditorText(response.data.data.description)
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
    console.log("editorText", editorText);

    if (editorText === null) {
      toast.error("Description Cannot be empty", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }

    const editData = new FormData();
    editData.append("blog_name", data.blog_name),
      editData.append("image", image),
      editData.append("description", editorText);

    try {
      const result = await axios.put(
        `http://localhost:8080/api/blog/${router.query.index}`,
        editData
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

        router.push("/admin/blog");
      }
    } catch (err: any) {
      console.log("error", err);
    }
  };

  const modules = {
    toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline"],
      [{ color: ["#e6893c", "#2659a5"] }],
      [{ align: ["", "center", "justify"] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
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
            Edit Blog
          </h1>
          <form
            className="mr-5 ml-5 text-sm bg-white shadow-md rounded-lg px-8 pb-8 mb-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* bank name  */}

            <div>
              <label className="font-medium">Blog Name</label>
              <input
                {...register("blog_name", {
                  required: true,
                })}
                // defaultValue={Defaultvalue}
                type="text"
                placeholder="Blog Name "
                defaultValue={oldData.blog_name}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
              {errors?.blog_name?.type === "required" && (
                <p className="text-red-600 font-main text-sm mt-1">
                  This field is required
                </p>
              )}
            </div>

            {/* //image section */}
            <div className="mb-6">
              <label htmlFor="image" className="block mt-2 mb-2">
                Image
              </label>
              <div className="flex items-center justify-center">
                <label
                  className="flex flex-col border-2 focus:border-[#7065d4] hover:border-[#7065d4] border-dashed w-full h-32 hover:bg-gray-100 group"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  {image ? (
                    <Image
                      src={URL.createObjectURL(image)}
                      alt="Selected thumbnail"
                      className="w-full h-full object-contain"
                      width={100}
                      height={100}
                    />
                  ) : (
                    <Image
                      src={oldData.blog_image}
                      alt="Selected thumbnail"
                      className="w-full h-full object-contain"
                      width={200}
                      height={200}
                    />
                  )}

                  <input
                    id="image"
                    name="image"
                    type="file"
                    className="sr-only"
                    onChange={handleImageChange}
                    accept="image/*"
                  />
                </label>
              </div>
            </div>

            {/* react quill */}

            <div className="flex flex-col mb-5 font-normal font-secondary">
              <label className="text-sm  mb-2" htmlFor="">
                Description
              </label>
              <ReactQuill
                theme="snow"
                // value={editorText}
                onChange={setEditorText}
                modules={modules}
                defaultValue={editorText}
                placeholder="Enter content to be displayed in webpage"
                className="focus:border-[#7065d4] hover:border-[#7065d4]"
              />
            </div>

            <div className="flex gap-5 mt-5 items-center ">
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
                Edit
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
