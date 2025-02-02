import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BaseURL } from "../constant";
import { addConnections } from "../Utils/connectionsSlice";
import ConnectionCard from './ConnectionCard'
import { useState } from "react";

const Connections=()=>{

    const dispatch=useDispatch();
    const [loading,setLoading]=useState(false)
    const fetchConnections=async()=>{
        try{
            setLoading(true);
            const res=await axios.get(BaseURL+"/user/connections",{withCredentials:true})
            console.log(res.data.data)
            dispatch(addConnections(res.data.data))
            console.log(res.data.data);

        }catch(err){
            console.log(err.message)
        }finally{
          setLoading(false);
        }
    }
    const connections=useSelector((store)=>store.connections)
    console.log(connections)

    useEffect(()=>{
        fetchConnections()
    },[])

    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center h-screen bg-base-200">
          <span className="loading loading-bars loading-lg"></span>
          <p className="text-gray-500 mt-4">Loading your Connections...</p>
        </div>
      );
    }

    if (connections?.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-screen bg-base-200">
          <div className="text-center max-w-md">
            <h1 className="text-2xl font-bold text-gray-700 mb-2">No Connections Found 🫤</h1>
            <p className="text-gray-500 mb-6">
              It seems like you haven't made any connections yet. Once you do, they’ll appear here!
            </p>
            <button
              onClick={fetchConnections}
              className="btn btn-primary"
            >
              Refresh Connections
            </button>
          </div>
        </div>
      );
    }
    

    return<div>
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
{connections?.map((connections) => (
        <ConnectionCard key={connections._id} connections={connections} />
      ))}
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
}

export default Connections;