import { Outlet, useNavigate } from "react-router";
import Navbar from "./Navbar";
import { BaseURL } from "../constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../Utils/userSlice";
import Footer from "./Footer";

//as soon as i logged in i got the token of the user now the token contains the id of the user and throught this the userAuth will verify the user in the /profile/view and will give us the user data from that
//through this the problem of redux store which was being emptied after every refreseh will get the user info directly from the token
//no need to login again and again until the token expires.
const Body = () => {
  const userData = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchUser = async () => {
    try {
      if (userData) {
        return;
        //if the user if not present then only make this api call
        //to optimise the api calls
      }
      const res = await axios.get(BaseURL + "/profile/view", {
        withCredentials: true,
      });
      //   console.log(res.data);
      dispatch(addUser(res.data));
    } catch (err) {
      if (err.status === 401) {
        navigate("/login"); //as we dont have token then just go to login page for that
      }
      console.log(err.message);
    } //in case if the token is not present then the backend will give a error that token is not valid and catch will catch it and show to the user
    //this will dispatch the user in the redux
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  );
};

export default Body;
