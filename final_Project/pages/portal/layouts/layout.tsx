import { useEffect } from "react";
import PortalNav from "./portalSide";
import PortalTop from "./portalTop";
import { useAuth } from "../context/AuthProvider";
import { useRouter } from "next/router";

function Layout({ children }: any) {
  const auth = useAuth();
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push("/");
    }
  });

  return (
    <>
      <div className="min-h-screen flex flex-col bg-white">
        <div className=" flex flex-col">
          <div className="flex">
            <div className="bg-white top-0 z-[999]">
              <PortalTop />
              <PortalNav />
            </div>
            <main className=" max-h-[100vh] flex-1 pt-24 pl-10 overflow-y-scroll bg-white ">
              {children}
            </main>
          </div>
        </div>
      </div>
    </>
  );
}

export default Layout;
