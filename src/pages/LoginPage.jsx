import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { LoginUser } from "../Redux/ChatSlice";
import Loader from "../components/Loader";

const LoginPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.Chat.user);
  const isLoading = useSelector((state) => state.Chat.isLoading);
  const navigate = useNavigate();
  
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    console.log("i am authenticated", user);
    
    if (user) {
      navigate("/chat");
    }
  }, [user, navigate]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
    console.log(credentials);
  };

  const submitFom = (e) => {
    e.preventDefault();
    dispatch(LoginUser(credentials));
  };

  return (
    <div className="auth--container">
      {!isLoading?<div className="form--wrapper">
        <form onSubmit={(e) => submitFom(e)}>
          <div className="field--wrapper">
            <label>Email</label>
            <input
              type="email"
              name="email"
              required
              placeholder="enter your email"
              value={credentials.email}
              onChange={handleChange}
            />
            <label>Password</label>
            <input
              type="password"
              name="password"
              required
              placeholder="enter your password"
              value={credentials.password}
              onChange={handleChange}
            />
            <input
              type="submit"
              className="btn btn--lg btn--main"
              value="Login"
            />
          </div>
        </form>
        
      </div>:<Loader/>}
    </div>
  );
};

export default LoginPage;
