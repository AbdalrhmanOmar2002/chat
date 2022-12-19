import React, { useContext } from "react";
import Cam from "../images/cam.png";
import Add from "../images/add.png";
import More from "../images/more.png";
import Messages from "./Messages";
import Input from "./Input";
import { ChatsContext } from "./../context/ChatContext";
import { useSelector } from "react-redux";

const Chat = () => {
  // const { data } = useContext(ChatsContext);
  const data = useSelector((state) => state.auth);
  console.log(!!data.chatId);

  return (
    <>
      {!!data.chatId ? (
        <div className="chat">
          <div className="chatInfo">
            <span>{data.user?.displayName}</span>
            <div className="chatIcons">
              <img src={Cam} alt="" />
              <img src={Add} alt="" />
              <img src={More} alt="" />
            </div>
          </div>
          <Messages />
          <Input />
        </div>
      ) : (
        <div className="nullChat">
          <div className="chatBody">
            <div className="cont">
              <h1>Chat X</h1>
              <h1>···</h1>
              <h1>Select a User</h1>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chat;
