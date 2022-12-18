import React, { useContext, useEffect, useRef, useState } from "react";
import Message from "./Message";
import { ChatsContext } from "../context/ChatContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatsContext);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "cahts", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().message);
    });
    return () => {
      unSub();
    };
  }, [data.chatId]);

  return (
    <div className="messages">
      {messages.map((m) => (
        <Message message={m} key={m.uid} />
      ))}
    </div>
  );
};

export default Messages;
