import PortalNav from "../layout/portalSide";
import PortalTop from "../layout/portalTop";

function LayoutA({ children }) {
  return (
    <>
      <div className="min-h-screen flex flex-col overflow-hidden  bg-white">
        <div className="bg-white top-0">
          <div className="flex ">
            <PortalNav />
            <div className="flex-grow relative  ">
              <div className=" w-full overflow-y-scroll h-screen">
                <PortalTop />
                <main className="w-full p-10 mt-12">
                  {children}
                </main>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

LayoutA.requiredAuth = true;
export default LayoutA;
