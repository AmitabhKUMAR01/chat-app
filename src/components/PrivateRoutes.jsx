import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  const user = useSelector((state) => state.Chat.user);
  console.log('Private routes', user);

  if (!user) {
    return <Navigate to="/login" />; // Redirect to the login page if the user is not authenticated
  }

  // Only render the chat component if the user is authenticated
  return <Outlet />;
};  

export default PrivateRoutes;
