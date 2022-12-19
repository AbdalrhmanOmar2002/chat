import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "./../context/Auth";
import { ChatsContext } from "./../context/ChatContext";
import { useSelector } from "react-redux";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const data = useSelector((state) => state.auth);
  // console.log(data);
    const ref = useRef();
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  return (
    <div ref={ref} className={`message ${message.senderId === currentUser.uid && "owner"}`}>
      <div className="messageInfo">
        <img src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL} alt="" />
        <span>just now</span>
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
};

export default Message;
