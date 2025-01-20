import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BaseURL } from "../constant";
import { useSelect } from "@heroui/react";
import { addConnections } from "../Utils/connectionsSlice";
import TableCards from "./TableCards";
import ConnectionCard from "./connectionCard";

const Connections=()=>{

    const dispatch=useDispatch();
    const fetchConnections=async()=>{
        try{
            const res=await axios.get(BaseURL+"/user/connections",{withCredentials:true})
            dispatch(addConnections(res.data.data));

        }catch(err){
            console.log(err.message)
        }
    }
    const connections=useSelector((store)=>store.connections)
    console.log(connections)

    useEffect(()=>{
        fetchConnections()
    },[])

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