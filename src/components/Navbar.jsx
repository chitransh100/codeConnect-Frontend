import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { BaseURL, fallback } from "../constant";
import axios from "axios";
import { deleteUser } from "../Utils/userSlice";
import { addRequests } from "../Utils/requestSlice";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const request = useSelector((store) => store.requests);
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        BaseURL + "/logout",
        {},
        { withCredentials: true }
      );
      dispatch(deleteUser());
      navigate("/login");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <div className="navbar bg-base-200 pt-3">
        <div className="flex-1">
          {user ? (
            <Link to="/" className="btn btn-ghost text-xl">
              CodeConnect
            </Link>
          ) : (
            <Link to="/login" className="btn btn-ghost text-xl">
              CodeConnect
            </Link>
          )}
        </div>

        {user && (
          <>
            {/* Desktop Navigation - Visible on md and larger screens */}
            <div className="hidden md:flex flex-none gap-2">
              <div className="form-control flex-row">
                <div className="connections indicator mr-9">
                  <Link to="/connections">
                    <span className="indicator-item badge">
                      {connections?.length}+ conn..
                    </span>
                    <div className="btn">Connections</div>
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
                  <div className="w-13 rounded-full">
                    <img
                      alt="Profile"
                      src={user.photourl || fallback}
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
                    <a
                      onClick={() =>
                        document.getElementById("my_modal_3").showModal()
                      }
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Mobile Navigation - Visible on smaller screens */}
            <div className="md:hidden flex-none">
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h7"
                    />
                  </svg>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <Link to="/connections" className="justify-between">
                      Connections
                      <span className="badge">{connections?.length}+</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/requests" className="justify-between">
                      Requests
                      <span className="badge badge-secondary">
                        {request?.length}+
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/profile">Profile</Link>
                  </li>
                  <li>
                    <a>Settings</a>
                  </li>
                  <li>
                    <a
                      onClick={() =>
                        document.getElementById("my_modal_3").showModal()
                      }
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </>
        )}

        {/* Logout Modal */}
        <div className="flex justify-center">
          <dialog id="my_modal_3" className="modal">
            <div className="modal-box">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <h3 className="font-bold text-lg">
                ⚠️ Are you sure you want to log out?
              </h3>
              <p className="py-4">
                Logging out means you’ll need to sign back in to access your
                account. We’ll miss you! 🥺
              </p>
              <div>
                <button
                  className="btn btn-outline btn-error justify-end"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          </dialog>
        </div>
      </div>
    </>
  );
};

export default Navbar;