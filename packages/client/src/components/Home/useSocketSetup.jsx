import { useContext, useEffect } from "react";
import socketConn from "../../socket";
import { AccountContext } from "../AccountContext";

const useSocketSetup = (setFriendList, setMessages) => {
  const { setUser, user } = useContext(AccountContext);
  useEffect(() => {
    const socket = socketConn(user);
    socket.connect();
    socket.on("friends", friendList => {
      setFriendList(friendList);
    });
    socket.on("messages", messages => {
      setMessages(messages);
    });
    socket.on("dm", message => {
      setMessages(prevMsgs => [message, ...prevMsgs]);
    });
    socket.on("connected", (status, username) => {
      setFriendList(prevFriends => {
        return [...prevFriends].map(friend => {
          if (friend.username === username) {
            friend.connected = status;
          }
          return friend;
        });
      });
    });
    socket.on("connect_error", () => {
      setUser({ loggedIn: false });
    });
    return () => {
      socket.off("connect_error");
      socket.off("connected");
      socket.off("friends");
      socket.off("messages");
      socket.off("dm");
    };
  }, [setUser, setFriendList, setMessages, user]);
};

export default useSocketSetup;
