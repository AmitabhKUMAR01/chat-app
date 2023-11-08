import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  const user = useSelector((state) => state.Chat.user);
  console.log('Private routes', user);

  if (!user) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};  

export default PrivateRoutes;
