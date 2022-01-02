import { io } from "socket.io-client";

const socket = user =>
  new io(process.env.REACT_APP_SERVER_URL, {
    autoConnect: false,
    withCredentials: true,
    auth: {
      token: user.token,
    },
  });

export default socket;
