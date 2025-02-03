import axios from "axios";
import { useRef, useState } from "react";
import { BaseURL } from "../constant";

const Signup = ({ setSignup }) => {
  const NameRef = useRef();
  const AgeRef = useRef();
  const EmailRef = useRef();
  const PasswordRef = useRef();
  const SkillsRef = useRef();
  const PhotoRef = useRef();
  const [selectedSex, setSelectedSex] = useState(""); // Use state for dropdown selection

  const handleSignup = async () => {
    const splitStringToArray = (inputString) =>
      inputString.split(/[\s,]+/).filter((item) => item.trim() !== "");

    const name = NameRef.current.value;
    const age = AgeRef.current.value;
    const email = EmailRef.current.value;
    const password = PasswordRef.current.value;
    const skilltext = SkillsRef.current.value;
    const photourl = PhotoRef.current.value;
    const sex = selectedSex; // Use selectedSex from state

    if (!name || !age || !sex || !email || !password || !photourl) {
      alert("Please fill in all required fields.");
      return;
    }

    const skills = splitStringToArray(skilltext);

    try {
      const res = await axios.post(
        BaseURL + "/signup",
        { name, age, sex, email, password, skills, photourl },
        { withCredentials: true }
      );
      console.log(res);
      if (res.status === 200) {
        alert("Signup successful!");
        setSignup(false); // Redirect to signin
      }
    } catch (error) {
      alert("Signup failed: " + error.message);
    }
  };

  return (
    <div className="bg-base-200 flex items-center justify-center">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left lg:mr-8">
          <h1 className="text-5xl font-bold">Signup now!</h1>
          <p className="py-6">
            We're excited to have you on board. Sign up now to unlock all the
            features and start your journey with us. Let’s get started! 🚀
            <br />
            You have to SignIn again after signup
            <br />
            Already have an account?{" "}
            <a
              onClick={() => {
                setSignup(false);
              }}
              className="cursor-pointer"
            >
              SignIn here 👈
            </a>
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
          <div className="card-body max-h-[625px] overflow-auto [scrollbar-width:none] [-ms-overflow-style:none]">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                ref={NameRef}
                placeholder="First Name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Age</span>
              </label>
              <input
                type="number"
                ref={AgeRef}
                placeholder="Age"
                className="input input-bordered"
                required
              />
            </div>
            {/* Dropdown for Sex */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Sex</span>
              </label>
              <div className="dropdown w-full">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn input input-bordered w-full text-left"
                >
                  {selectedSex || "Select Sex"}
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100 rounded-box z-10 w-full p-2 shadow"
                >
                  {["male", "female", "other"].map((sex) => (
                    <li key={sex}>
                      <a onClick={() => setSelectedSex(sex)}>{sex}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                ref={EmailRef}
                placeholder="Email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">PhotoURL</span>
              </label>
              <input
                type="url"
                ref={PhotoRef}
                placeholder="PhotoURL"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                ref={PasswordRef}
                placeholder="Password"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Skills</span>
              </label>
              <textarea
                ref={SkillsRef}
                className="textarea textarea-bordered"
                placeholder="Skills"
              ></textarea>
            </div>
            <div className="form-control mt-6">
              <button onClick={handleSignup} className="btn btn-primary">
                Signup
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
