import { useForm, Controller, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

import { useRouter } from "next/router";
const ReactQuill = dynamic(import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

type FormValues = {
  blog_name: String;
  description: String;
  image: String;
};
const index = () => {
  const [image, setImage] = useState();
  const [editorText, setEditorText] = useState(null);

  const router = useRouter();
  // const [categoryNameError, setBlogNameError] = useState();

  //image
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
    handleSubmit,
    control,
    setError,
    setValue,
    getValues,
    clearErrors,
    resetField,

    formState: { errors },
  } = useForm<FormValues>();

  const handleBackClick = (e) => {
    e.preventDefault();
    router.push("/admin/blog");
  };

  const onSubmit: SubmitHandler<FormValues> = async (data: any, e) => {
    // const headers = {
    //   Authorization: `Bearer ${auth?.user?.token}`,
    // };
    console.log("editorText", editorText);
    if (editorText === null) {
      toast.error("Description Cannot be empty", {
        position: toast.POSITION.TOP_RIGHT,
      });
      // toast.error("Description Cannot be empty");
    }
    if (!image) {
      toast.error("Please add image", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return false;
    }

    const mydata = new FormData();
    mydata.append("blog_name", data.blog_name),
      mydata.append("description", editorText),
      mydata.append("image", image);

    try {
      const insert = await axios.post(
        "http://localhost:8080/api/blog",
        mydata
        // ,
        // { headers: headers }
      );
      toast.success("Successfully Added");
      router.push("/admin/blog");

      console.log(insert);
    } catch (error) {
      console.log("API Error:", error);
      // if (error?.response?.data?.errors?.CategoryName) {
      //   setBlogNameError(error?.response?.data?.errors?.Bank?.message);
      // }
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
    <main className="max-w-screen-xl  mx-auto px-4 md:px-8">
      <div className="space-y-2">
        <h3 className="text-gray-800 text-xl font-bold ">Add Blog</h3>
      </div>
      <ToastContainer />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-5">
        <div>
          <label className="font-medium">Blog Name</label>
          <input
            {...register("blog_name", {
              required: true,
            })}
            // defaultValue={Defaultvalue}
            type="text"
            placeholder="Blog Name "
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
          <label htmlFor="image" className="block font-medium mt-2 mb-2">
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
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  className="flex flex-col items-center justify-center mt-5"
                >
                  <svg
                    className="w-10 h-10 text-gray-400 group-hover:text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    ></path>
                  </svg>
                  <p className="lowercase  text-sm text-gray-400 group-hover:text-blue-500 pt-1 tracking-wider">
                    Drag and drop an image file here, or click to select a file
                  </p>
                </div>
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
            value={editorText}
            onChange={setEditorText}
            modules={modules}
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
