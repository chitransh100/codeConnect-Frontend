import { useParams } from "react-router";
import { useState } from "react";
import { createSocketConnection } from "../Utils/socket";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Chat = () => {
  const user = useSelector((store) => store.user);
  const userID = user?._id;
  const { targetUserID } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const socket=createSocketConnection();
  const sendMessage = () => {
    // if (input.trim()) {
    //   setMessages([
    //     ...messages,
    //     { text: input, sender: user.name },
    //   ]);
      setInput("");
    // }
    socket.emit("sendMessage",{name:user.name,  userID, targetUserID, input})
    console.log(messages)
  };


  useEffect(() => {
    if (!user) {
      return;
    }
    //whenever the chat loads it creates a socet connection
    const socket = createSocketConnection();
    //socket contains the socket instance created by the server or the client
    socket.emit("joinChat", {
      name:user.name, userID, targetUserID });
    //this emmit an event called join chat
    socket.on("messageReceive",({name,input})=>{
        console.log(name+" has send "+input)
        setMessages((messages)=>[...messages,{sender:name,text:input}])
        console.log(messages)
    })
    return () => {
      //just clean the socket beacuse it causes loose sockets
      socket.disconnect();
    };
  }, [userID, targetUserID]);
  //whenever mu userID or targetuserID changes call the useEffect !!

  return (
    <div className="h-screen flex justify-center">
      {/* Chat Container */}
      <div className="w-full max-w-md h-[90%] bg-white rounded-2xl shadow-lg flex flex-col">
        {/* Header */}
        <div className="bg-blue-500 text-white p-4 flex items-center justify-between rounded-t-2xl">
          <h1 className="text-lg font-bold">Chat with {targetUserID}</h1>
          <span className="text-sm">Online</span>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages?.map((msg,index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === user.name ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`chat-bubble ${
                  msg.sender === user.name
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-black"
                } p-3 rounded-2xl max-w-xs`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
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
