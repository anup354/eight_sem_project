
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "../context/AuthProvider";

function RequireAuth({ children }: { children: JSX.Element }) {
  const { user, loader } = useAuth();
  const router = useRouter();
// console.log(user,"aa")
  useEffect(() => {
    if (!loader) {
      if (JSON.stringify(user) === "{}") {
        router.push("/login");
      } else if (user === undefined) {
        router.push("/login");
      }
    }
  }, [user, loader]);

  if (loader) {
    return <>{/* loader */}</>;
  }

  if (!loader && user !== undefined) {
    console.log(children)
    return <>{children}</>;
    
  }

  return null;
}
export default RequireAuth;
