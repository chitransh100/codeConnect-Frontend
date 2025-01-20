import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { BaseURL, fallback } from "../constant";
import axios from "axios";
import { deleteUser } from "../Utils/userSlice";
import { addRequests } from "../Utils/requestSlice";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const request = useSelector((store) => store.requests);
  const connections = useSelector((store)=>store.connections)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        BaseURL + "/logout",
        {},
        {
          withCredentials: true,
        }
      );
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
      <div className="navbar bg-base-200 pt-3">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">
            CodeConnect
          </Link>
        </div>
        {user && (
          <div className="flex-none gap-2 ">
            <div className="form-control flex-row">
              <div className="connections indicator mr-9 ">
                <Link to="/connections">
                <span className="indicator-item badge">{connections?.length}+ conn..</span>
                <div className="btn">
                  Connections
                </div>
                </Link>

              </div>
              <div className="notifications requests mr-10">
                <div className="indicator">
                  <span className="indicator-item badge badge-secondary">
                    {request?.length}+
                  </span>
                  <Link to="/requests">
                    <button className="btn">Requests 🤝</button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-13 rounded-full ">
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
                  {/* <a onClick={handleLogout}>Logout</a> */}
                  {/* You can open the modal using document.getElementById('ID').showModal() method */}
                  <a
                    className=""
                    onClick={() =>
                      document.getElementById("my_modal_3").showModal()
                    }
                  >
                    Logout
                  </a>
                  <div className="flex justify-center ">
                    <dialog id="my_modal_3" className="modal">
                      <div className="modal-box">
                        <form method="dialog">
                          {/* if there is a button in form, it will close the modal */}
                          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                            ✕
                          </button>
                        </form>
                        <h3 className="font-bold text-lg ">
                          ⚠️ Are you sure you want to log out?
                        </h3>
                        <p className="py-4">
                          Logging out means you’ll need to sign back in to
                          access your account. We’ll miss you! 🥺
                        </p>
                        <div>
                          <button
                            className="btn btn-outline btn-error justify-end"
                            onClick={handleLogout}
                          >
                            Logout{" "}
                          </button>
                        </div>
                      </div>
                    </dialog>
                  </div>
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
