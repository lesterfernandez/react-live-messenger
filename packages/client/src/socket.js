import { io } from "socket.io-client";

const socket = new io("http://localhost:4000", {
  autoConnect: false,
  withCredentials: true,
});

export default socket;
