import { useDispatch, useSelector } from "react-redux"
import TableCards from "./TableCards"
import { useEffect } from "react"
import axios from "axios"
import { BaseURL } from "../constant"
import { addRequests } from "../Utils/requestSlice"

const Requests=()=>{

    const dispatch=useDispatch();
    const fetchRequest = async () => {
        try{
          const res=await axios.get(BaseURL+"/user/requests/received",{withCredentials:true});
          dispatch(addRequests(res.data));
        }catch(err){
          console.log(err.message)
        }
      }
    const requests=useSelector((store)=>store.requests)
    useEffect(()=>{
        fetchRequest();
    },[])

    
    return <div>
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
    {requests?.map((request) => (
            <TableCards key={request._id} fromUser={request.fromUserID} />
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
export default Requests