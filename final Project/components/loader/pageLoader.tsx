import { useEffect } from "react";
// import "../../../styles/global.css";

const PageLoader = () => {
  useEffect(() => {
    document.body.classList.add("loading");
    return () => {
      document.body.classList.remove("loading");
    };
  }, []);
  return (
    <div className="fixed inset-0 flex items-center z-[999] justify-center bg-[#ffffffb6] dark:bg-[#000000b6] backdrop-blur-sm">
      <div className="z-10 h-[10%] w-[10%]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="203px"
          height="203px"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid"
          className="h-full w-full"
        >
          <path
            fill="none"
            stroke="#005583"
            stroke-width="8"
            stroke-dasharray="212.9688104248047 43.62011779785155"
            d="M24.3 30C11.4 30 5 43.3 5 50s6.4 20 19.3 20c19.3 0 32.1-40 51.4-40 C88.6 30 95 43.3 95 50s-6.4 20-19.3 20C56.4 70 43.6 30 24.3 30z"
            stroke-linecap="round"
          >
            <animate
              attributeName="stroke-dashoffset"
              repeatCount="indefinite"
              dur="1.4492753623188404s"
              keyTimes="0;1"
              values="0;256.58892822265625"
            ></animate>
          </path>
        </svg>
      </div>
    </div>
  );
};

export default PageLoader;