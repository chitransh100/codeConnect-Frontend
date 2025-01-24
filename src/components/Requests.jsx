import { useDispatch, useSelector } from "react-redux";
import RequestCards from "./RequestCards";
import { useEffect } from "react";
import axios from "axios";
import { BaseURL } from "../constant";
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
    return <div className="flex flex-col items-center justify-center h-screen bg-base-200">
    <div className="text-center max-w-md">
      
      <h1 className="text-2xl font-bold text-gray-700 mb-2">No Requests Found 🫤</h1>
      <p className="text-gray-500 mb-6">
        It seems like you haven't received any requests yet. Once you do, they’ll appear here!
      </p>
      <button
        onClick={fetchRequest}
        className="btn btn-primary"
      >
        Refresh
      </button>
    </div>
  </div>
  }


  return (
    <div >
      <div className="overflow-x-auto max-h-full">
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
