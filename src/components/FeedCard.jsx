import { BaseURL, fallback } from "../constant";
import axios from "axios";

const FeedCard = ({ feed }) => {
  const { firstName, lastName, age, photoURL, sex, skills, about } = feed;
  const handleSendRequest=async(status)=>{
      try{
          const res=await axios.post(BaseURL+"/request/send/"+status+"/"+toUserID,{},{withCredentials:true});
          console.log(status)
          console.log(feed._id)
          console.log(res);
      }catch(err){

      }
  }

  return (
    <>
      <div className="card bg-base-200 w-96 shadow-xl h-full">
        <figure className="">
          <img src={photoURL || fallback} alt="Shoes" />
        </figure>
        <div className="card-body ">
          <ul>
            <li className="card-title">
              {feed.firstName} {feed.lastName}, {age}
            </li>
            <li>{sex}</li>
            <li>{about}</li>
            <li>
              {skills.map((element, index) => (
                <span key={index}>skill-set: {element} </span>
              ))}
            </li>
          </ul>
          <h2 className=""></h2>
          <p></p>
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
