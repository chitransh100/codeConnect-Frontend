import axios from "axios";
import { useState } from "react";
import { BaseURL } from "../constant";
import { useNavigate } from "react-router";

const BioData = ({ user }) => {
  const [toggle, setToggle] = useState(false);
  const [userData, setUserData] = useState(user);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "skills") {
      // Split by both commas and spaces, then trim and filter empty entries
      const skillsArray = value
        .split(/[, ]+/) // Split by comma or space
        .map((skill) => skill.trim()) // Trim spaces around skills
        .filter((skill) => skill); // Remove any empty strings

      setUserData({ ...userData, [name]: skillsArray });
    } else {
      setUserData({ ...userData, [name]: value });
    }
  };

  const handleDone = async () => {
    try {
      const response = await axios.patch(
        `${BaseURL}/profile/edit`,
        {
          name: userData.name,
          age: userData.age,
          sex: userData.sex,
          skills: userData.skills, // skills will be sent as an array
        },
        { withCredentials: true }
      );
      console.log(response.data);
      setToggle(false); // Disable edit mode after successful update
    } catch (error) {
      console.error("Error updating profile:", error.response);
    }
  };

  return (
    <div className="bg-base-200 flex items-center justify-center">
      <div className="hero-content flex-col lg:flex-row-reverse">
        {toggle && (
          <div className="flex flex-row items-center">
            <div className="card bg-base-200 w-96 shadow-xl h-full max-h-[540px]">
              <figure className="">
                <img
                  src={userData.photourl || "https://via.placeholder.com/150"}
                  alt="Profile"
                />
              </figure>
              <div className="card-body ">
                <ul>
                  <li className="card-title">
                    {userData.name}, {userData.age}
                  </li>
                  <li>{userData.sex}</li>
                  <li>
                    Skill Set:{" "}
                    {userData.skills?.map((skill, index) => (
                      <span
                        className="badge badge-accent badge-sm mx-2"
                        key={index}
                      >
                        {skill}{" "}
                      </span>
                    ))}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
        <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
          <div className="flex card-body w-96 max-h-[625px] overflow-auto [scrollbar-width:none] [-ms-overflow-style:none]">
            <div className="form-control flex flex-row mb-4 justify-between">
              <label className="label ">
                <span className="label-text">Name: </span>
              </label>
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleInputChange}
                placeholder="First Name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control flex flex-row mb-4 justify-between">
              <label className="label ">
                <span className="label-text">Age</span>
              </label>
              <input
                type="number"
                name="age"
                value={userData.age}
                onChange={handleInputChange}
                placeholder="Age"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control flex flex-row mb-4 justify-between">
              <label className="label">
                <span className="label-text">Sex</span>
              </label>
              <input
                type="text"
                name="sex"
                value={userData.sex}
                onChange={handleInputChange}
                placeholder="Sex"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control flex flex-row mb-4 justify-between">
              <label className="label">
                <span className="label-text">PhotoURL</span>
              </label>
              <input
                type="url"
                name="photourl"
                value={userData.photourl}
                onChange={handleInputChange}
                placeholder="PhotoURL"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control flex flex-row mb-4 justify-between">
              <label className="label">
                <span className="label-text">Skills</span>
              </label>
              <textarea
                name="skills"
                // value={userData.skills?.join(", ")} // Join array into comma-separated string for textarea
                onChange={(e) => {
                  const skills = e.target.value
                    .split(/[, ]+/) // Split by spaces or commas
                    .map((skill) => skill.trim()) // Remove any extra spaces around words
                    .filter((skill) => skill); // Remove any empty strings
                  setUserData({ ...userData, skills });
                }}
                className="textarea textarea-bordered w-[215px]"
                placeholder="Skills (comma or space-separated)"
              ></textarea>
            </div>
            {toggle ? (
              <div className="form-control ">
                <button onClick={handleDone} className="btn btn-primary">
                  Done
                </button>
              </div>
            ) : (
              <div className="form-control">
                <button
                  onClick={() => setToggle(true)}
                  className="btn btn-primary"
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BioData;
