import { io } from "socket.io-client";
import { BaseURL } from "../constant";

export const createSocketConnection=()=>{
    return io(BaseURL)
    //method for connecting to a Socket.IO server.
//     The function returns the Socket instance created by io(BaseURL).
// This instance can be used to listen for or emit events between the client and server.
}