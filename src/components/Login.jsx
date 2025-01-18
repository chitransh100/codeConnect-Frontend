import axios from "axios";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../Utils/userSlice";
import { useNavigate } from "react-router";
import { BaseURL } from "../constant";


const Login = () => {
    const emailRef=useRef(null);
    const passwordRef=useRef(null);
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const handleLogin=async()=>{
        const email=emailRef.current.value;
        const password=passwordRef.current.value;
        // console.log("email "+email+" password: "+password);
        try{
          const res=await axios.post(
            BaseURL+"/login",
            {
              email,
              password
            },
            {withCredentials:true}
          )
          dispatch(addUser(res.data.user));
          // console.log(res.data.user)
        
          navigate("/")
        }catch(err){
          alert(err);
        }
        
    }
  return (
    <div className="flex justify-center item-center my-10">
      <div className="card bg-base-100 w-96 shadow-xl ">
        <div className="card-body flex flex-direction">
          {/* <h2 className="card-title flex justify-center">Login</h2>
          <div className="card-actions justify-cen">
            <button className="btn btn-primary">Login</button>
          </div> */}
          <h2 className="card-title justify-center">Login</h2>
          <label>Email</label>
          <input
            type="text"
            ref={emailRef}
            placeholder="No fake emails, please! 🤔"
            className="input input-bordered input-primary w-full max-w-xs mb-3"
          />
          <label>Password</label>
          <input
            type="password"
            ref={passwordRef}
            placeholder="Don't let anyone peek 👀"
            className="input input-bordered input-primary w-full max-w-xs mb-3"
          />
          <button onClick={handleLogin } className="btn btn-primary justify-center mt-5">Login</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
