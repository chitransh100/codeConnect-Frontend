import { useDispatch } from "react-redux";
import { BaseURL, fallback } from "../constant";
import axios from "axios";
import {deleteFeed} from "../Utils/feedSlice"
import Loading from "./Loading";

const FeedCard = ({ feed, onremove }) => {
  const dispatch=useDispatch();
  const { name, age, photourl, sex, skills } = feed;
  // console.log(feed.name, age, photourl, sex, skills)
  
  const handleSendRequest=async(status)=>{
      try{
          const res=await axios.post(BaseURL+"/request/send/"+status+"/"+feed._id,{},{withCredentials:true});
          dispatch(deleteFeed(feed._id))
          if(!res)
          {
            console.log("Request failed");
            return;
          }
          onremove(feed._id);
      }catch(err){
        console.log(err.message)
      }

  }

  return (
    <>
      <div className="card bg-base-200 w-96 shadow-xl h-full max-h-[540px]">
        <figure className="">
          <img src={photourl || fallback} alt="Shoes" />
        </figure>
        <div className="card-body ">
          <ul>
            <li className="card-title">
              {name}, {age}
            </li>
            <li>{sex}</li>
            <li>
              Skill set: 
              {skills.map((element, index) => (
                <span className="badge badge-accent badge-sm mx-2" key={index}> {element} </span>
              ))}
            </li>
          </ul>
          <div className="flex justify-center space-x-20">
          <div className="card-actions ">
            <button onClick={()=>{handleSendRequest("ignored")}} className="btn btn-info ">Ignore</button>
          </div>
          <div className="card-action justify-end">
          <button className="btn btn-success " onClick={()=>{handleSendRequest("intrested")}}>Intrested</button>
          </div>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default FeedCard;
