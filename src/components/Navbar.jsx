import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { BaseURL, fallback } from "../constant";
import axios from "axios";
import { deleteUser } from "../Utils/userSlice";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.post(BaseURL + "/logout",{}, {
        withCredentials: true,
      });
      dispatch(deleteUser());
      navigate("/login");
    } catch (err) {
      console.log(err.message);
    }
  };
  //the cookie in from the application will be gone 
  // console.log(user)
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">
            CodeConnect
          </Link>
        </div>
        {user && (
          <div className="flex-none gap-2">
            <div className="form-control">
              {/* <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto"
            /> */}
              <p>Welcome, {user.firstName}</p>
            </div>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={user.photoURL || fallback}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default Navbar;
