import React, { useContext, useEffect, useRef, useState } from "react";
import Message from "./Message";
import { ChatsContext } from "../context/ChatContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { v4 as uuid } from "uuid";
import { useSelector } from "react-redux";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  // const { data } = useContext(ChatsContext);
  const data = useSelector((state) => state.auth);
  useEffect(() => {
    if (data.chatId !== null) {
      const unSub = onSnapshot(doc(db, "cahts", data?.chatId), (doc) => {
        doc.exists() && setMessages(doc.data().message);
      });
      return async () => {
        unSub();
      };
    }
  }, [data.chatId]);

  return (
    <div className="messages">
      {messages?.map((m) => (
        <Message message={m} key={uuid()} />
      ))}
    </div>
  );
};

export default Messages;
