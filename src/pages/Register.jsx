import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RegisterUser } from "../Redux/ChatSlice";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const RegisterPage = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password1: "",
    password2: "",
  });
  const user = useSelector((state) => state.Chat.user);
  const isLoading = useSelector((state) => state.Chat.isLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleRegister(e, credentials) {
    e.preventDefault();
    dispatch(RegisterUser(credentials));
  }
  if (user) {
    navigate("/chat");
  }

  const handleInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setCredentials({ ...credentials, [name]: value });
  };

  return (
    <div className="auth--container">
      {!isLoading ? (
        <div className="form--wrapper">
          <form
            onSubmit={(e) => {
              handleRegister(e, credentials);
            }}
          >
            <div className="field--wrapper">
              <label>Name:</label>
              <input
                required
                type="text"
                name="name"
                value={credentials.name}
                placeholder="Enter your name..."
                onChange={(e) => {
                  handleInputChange(e);
                }}
                className="bg-transparent outline-none "
              />
            </div>

            <div className="field--wrapper">
              <label>Email:</label>
              <input
                required
                type="email"
                name="email"
                placeholder="Enter your email..."
                value={credentials.email}
                onChange={(e) => {
                  handleInputChange(e);
                }}
              />
            </div>

            <div className="field--wrapper">
              <label>Password:</label>
              <input
                required
                type="password"
                name="password1"
                placeholder="Enter a password..."
                value={credentials.password1}
                onChange={(e) => {
                  handleInputChange(e);
                }}
              />
            </div>

            <div className="field--wrapper">
              <label>Confirm password:</label>
              <input
                required
                type="password"
                name="password2"
                placeholder="Comfirm your password..."
                value={credentials.password2}
                onChange={(e) => {
                  handleInputChange(e);
                }}
              />
            </div>

            <div className="field--wrapper">
              <input
                className="btn btn--lg btn--main"
                type="submit"
                value="Register"
              />
            </div>
          </form>

          <p className="text-green-400 cursor-none">
            Already have an account?  <Link className="text-rose-500 hover:text-white font-semibold  hov" to="/login">Login</Link> 
          </p>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default RegisterPage;
