import { useParams } from "react-router";
import { useState, useRef, useEffect } from "react";
import { createSocketConnection } from "../Utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BaseURL } from "../constant";

const Chat = () => {
  const user = useSelector((store) => store.user);
  const userID = user?._id;
  const { targetUserID } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const socket = useRef(null);
  const [loading,setLoading]=useState(false);

  const sendMessage = () => {
    if (input.trim() && socket.current) {
      socket.current.emit("sendMessage", {
        name: user.name,
        userID,
        targetUserID,
        input,
      });
      setInput("");
    }
  };

  const fetchChat=async()=>{
    
    
    try{
      setLoading(true)
      const chat=await axios.get(BaseURL+"/chat/"+targetUserID,{withCredentials:true});
      setMessages(chat.data.message);

      // setMessages(res.data)
    }catch(err){
      
      console.error(err.message);
    }finally{
      setLoading(false);
    }
  }

  useEffect(()=>{
    fetchChat();
  },[])

  useEffect(() => {
    if (!user) return;

    socket.current = createSocketConnection();

    socket.current.emit("joinChat", { name: user.name, userID, targetUserID });

    socket.current.on("messageReceive", ({ senderID, input }) => {
      setMessages((messages) => [...messages, { senderID , text: input }]);
    });

    return () => {
      socket.current?.disconnect();
    };
  }, [userID, targetUserID]);

  console.log(messages)

  return (
    <div className="h-screen flex justify-center">
      <div className="w-full max-w-md h-[90%] bg-white rounded-2xl shadow-lg flex flex-col">
        <div className="bg-blue-500 text-white p-4 flex items-center justify-between rounded-t-2xl">
          <h1 className="text-lg font-bold">Chat</h1>
        </div>
        {(loading)?(<div className="flex flex-col items-center justify-center h-screen bg-base-200">
        <span className="loading loading-bars loading-lg"></span>
        <p className="text-gray-500 mt-4">Loading your Chats...</p>
      </div>):(<div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages?.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.senderID === userID ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`chat-bubble ${
                  msg.senderID === userID
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-black"
                } p-3 rounded-2xl max-w-xs`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>)}
        
        <div className="bg-gray-100 p-4 flex items-center border-t rounded-b-2xl">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border border-gray-300 rounded-lg p-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
