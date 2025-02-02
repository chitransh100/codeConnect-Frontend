import axios from "axios";
import { BaseURL } from "../constant";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed, deleteFeed } from "../Utils/feedSlice";
import FeedCard from "./FeedCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state

  const fetchFeed = async () => {
    try {
      setError(false);
      setLoading(true); // Start loading
      const res = await axios.get(BaseURL + "/user/feed", { withCredentials: true });
      console.log(res.data);
      dispatch(addFeed(res.data));
    } catch (err) {
      console.log(err.message);
      if (err.message === "Network Error") {
        setError(true);
      }
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleRemove = (id) => {
    dispatch(deleteFeed(id));
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  // Show loading animation while fetching data
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-base-200">
        <span className="loading loading-bars loading-lg"></span>
        <p className="text-gray-500 mt-4">Loading your feed...</p>
      </div>
    );
  }

  // If backend is unreachable
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-base-200">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-gray-700 mb-2">Server Unavailable 🛠️</h1>
          <p className="text-gray-500 mb-6">
            Oops! It looks like our servers are currently down or unreachable. Please check your connection or try again later.
          </p>
          <button onClick={fetchFeed} className="btn btn-primary">
            Retry
          </button>
        </div>
      </div>
    );
  }

  // If feed is empty
  if (feed?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-base-200">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-gray-700 mb-2">No Feed Available 🫤</h1>
          <p className="text-gray-500 mb-6">
            Your feed seems to be empty right now. Once there’s something to show, it’ll appear here!
          </p>
          <button onClick={fetchFeed} className="btn btn-primary">
            Refresh Feed
          </button>
        </div>
      </div>
    );
  }

  // Show feed when data is available
  return (
    <div className="flex justify-center items-center my-[50px]">
      <div className="stack">
        {feed?.map((element) => (
          <FeedCard key={element._id} feed={element} onremove={handleRemove} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
