import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {


     if (!sessionStorage.getItem("loggedOut")) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");


    // 🔥 Dispatch custom storage event to update Nav bar
    window.dispatchEvent(new Event("storage"));

    toast.success("User logged out. Please login again");
    sessionStorage.setItem("loggedOut", "true");
    navigate("/login");
     }
  
  }, []);

  return null;
};

export default Logout;
