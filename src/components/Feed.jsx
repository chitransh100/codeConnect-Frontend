import axios from "axios";
import { BaseURL } from "../constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed,deleteFeed } from "../Utils/feedSlice";
import FeedCard from "./FeedCard";

const Feed=()=>{
    const dispatch=useDispatch();
    const feed=useSelector((store)=>store.feed);
    console.log(feed)
    const fetchFeed=async()=>{
        try{
            const res=await axios.get(BaseURL+"/user/feed",{withCredentials:true})
            console.log(res.data)
            dispatch(addFeed(res.data));
            
        }catch(err){
            console.log(err.message)
        }
        
    }
    const handleRemove = (id) => {
      dispatch(deleteFeed(id));
    };
  useEffect(()=>{
      fetchFeed()
  },[])
    if (feed?.length === 0) {
        return (
          <div className="flex flex-col items-center justify-center h-screen bg-base-200">
            <div className="text-center max-w-md">
              <h1 className="text-2xl font-bold text-gray-700 mb-2">No Feed Available 🫤</h1>
              <p className="text-gray-500 mb-6">
                Your feed seems to be empty right now. Once there’s something to show, it’ll appear here!
              </p>
              <button
                onClick={fetchFeed}
                className="btn btn-primary"
              >
                Refresh Feed
              </button>
            </div>
          </div>
        );
      }
      
    
    


    return (feed?.length>0)?(<div className="flex justify-center items-center my-[50px] ">
        <div className="stack ">
       { feed && (feed.map((element, index) => (
      <FeedCard key={element._id} feed={element} onremove={handleRemove} />
    )))}
    </div>
    </div>):(<h1>NO feed found</h1>)
    
}

export default Feed;