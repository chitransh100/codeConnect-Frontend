import axios from "axios";
import { BaseURL } from "../constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../Utils/feedSlice";
import { useSelect } from "@heroui/react";
import FeedCard from "./FeedCard";

const Feed=()=>{
    const dispatch=useDispatch();
    const feed=useSelector((store)=>store.feed);
    console.log(feed)
    const fetchFeed=async()=>{
        try{
            const res=await axios.get(BaseURL+"/user/feed",{withCredentials:true})
            dispatch(addFeed(res.data));
            
        }catch(err){
            console.log(err.message)
        }
        
    }
    useEffect(()=>{
        fetchFeed()
    },[])
    


    return <div className="flex justify-center items-center my-[50px]">
       { feed && (feed.map((element, index) => (
      <FeedCard key={element._id} feed={element} />
    )))}
    </div>
}

export default Feed;