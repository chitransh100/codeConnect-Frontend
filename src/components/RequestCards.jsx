import axios from "axios";
import { BaseURL, fallback } from "../constant";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeRequest } from "../Utils/requestSlice";

const RequestCards = ({ fromUser, requestID }) => {
  const dispatch=useDispatch()
  if(!requestID){
    console.error("requestID is missing")
    return;
  }
  const handleRequest = async (status) => {

    try {
      const res = await axios.post(`${BaseURL}/request/review/${status}/${requestID}`, {}, { withCredentials: true }); // 
      // Handle the response if needed
      dispatch(removeRequest(requestID));
    } catch (error) {
      console.error("Error making request:", error);
    }
  };

  return (
    <>
      <tr>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src={fromUser?.photourl || fallback}
                  alt="Avatar Tailwind CSS Component"
                />
              </div>
            </div>
            <div>
              <div className="font-bold">{fromUser?.name}</div>
              <div className="text-sm opacity-50">{fromUser?.sex} | {fromUser?.age}</div>
            </div>
          </div>
        </td>
        <td>
          {fromUser?.skills.map((element, index) => (
            <React.Fragment key={index}>
              <span className="badge badge-ghost badge-sm">{element}</span>
              {(index + 1) % 3 === 0 && <br />}
            </React.Fragment>
          ))}
          <br />
        </td>
        <td><button className="btn btn-ghost btn-xs">Details</button></td>
        <td><button onClick={() => {handleRequest("accepted"); }} className="btn btn-outline btn-success">Accept</button></td>
        <th>
          <button onClick={() => {  handleRequest("rejected"); }} className="btn btn-outline btn-error">Reject</button>
        </th>
      </tr>
    </>
  );
};

export default RequestCards;
