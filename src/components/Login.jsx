import axios from "axios";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../Utils/userSlice";
import { useNavigate } from "react-router";
import { BaseURL } from "../constant";
import Signup from "./Signup";

const Login = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signup, setSignup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // State for error messages

  const handleLogin = async () => {
    setError(""); // Clear previous errors
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!email || !password) {
      setError("Email and password are required!"); // Validate inputs
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${BaseURL}/login`,
        { email, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.user));
      navigate("/");
    } catch (err) {
      if (err.message==="Network Error") {
        setError("Server is unreachable! Please try again later.");
      } else if (err.response.status === 401) {
        setError("Invalid email or password!");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return signup ? (
    <Signup setSignup={setSignup} />
  ) : (
    <div className="flex justify-center items-center my-10">
      <div className="card bg-base-100 w-96 shadow-xl">
        <div className="card-body flex flex-col">
          <h2 className="card-title justify-center">Login</h2>
          
          <label>Email</label>
          <input
            type="text"
            ref={emailRef}
            placeholder="Enter your email"
            className="input input-bordered input-primary w-full max-w-xs mb-3"
            disabled={loading}
            onChange={() => setError("")} // Clear error when user types
          />
          
          <label>Password</label>
          <input
            type="password"
            ref={passwordRef}
            placeholder="Enter your password"
            className="input input-bordered input-primary w-full max-w-xs mb-3"
            disabled={loading}
            onChange={() => setError("")} // Clear error when user types
          />

          {/* Display error message */}
          {error && (
            <p className="text-red-500 text-sm text-center mb-3">{error}</p>
          )}

          {/* Show loading animation when logging in */}
          {loading ? (
            <div className="flex justify-center mt-5">
              <span className="loading loading-bars loading-lg"></span>
            </div>
          ) : (
            <button
              onClick={handleLogin}
              className="btn btn-primary justify-center mt-5"
              disabled={loading}
            >
              Login
            </button>
          )}

          <div>
            New user?{" "}
            <a onClick={() => setSignup(true)} className="cursor-pointer">
              Signup
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
