import PortalNav from "./portalSide";
import PortalTop from "./portalTop";

function Layout({ children }:any) {
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