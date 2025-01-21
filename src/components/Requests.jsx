import { useDispatch, useSelector } from "react-redux";
import RequestCards from "./RequestCards";
import { useEffect } from "react";
import axios from "axios";
import { BaseURL } from "../constant";
import Message from "./Message";
import { addRequests } from "../Utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();

  const fetchRequest = async () => {
    try {
      const res = await axios.get(BaseURL + "/user/requests/received", { withCredentials: true });
      dispatch(addRequests(res.data));
    } catch (err) {
      console.log(err.message);
    }
  };

  
  useEffect(() => {
    fetchRequest();
  }, []);

  const requests = useSelector((store) => store.requests);
  console.log(requests)
  

  if(!requests){
    return
  }
  if(requests?.data?.length===0){
    return<h1>No Request Found</h1>
  }


  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Skills</th>
              <th>Details</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          {requests && (requests?.map((request) => (
              <RequestCards requestID={request._id} key={request._id} fromUser={request.fromUserID} />
            )))}
          </tbody>
          {/* foot */}
          <tfoot>
            <tr>
              {/* <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th> */}
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default Requests;
