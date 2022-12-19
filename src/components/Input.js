import React, { useContext, useEffect, useState } from "react";
import Img from "../images/img.png";
import Attach from "../images/attach.png";
import { AuthContext } from "../context/Auth";
import { ChatsContext } from "../context/ChatContext";
import { Timestamp, arrayUnion, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";
import SendIcon from "@mui/icons-material/Send";
import { Button, Divider } from "@mui/material";

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const [images, setImages] = useState([]);
  const [imageURLs, setlmageURLs] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const data = useSelector((state) => state.auth);

  const handleSend = async () => {
    if (!!text === true || !!img === true) {
      if (img) {
        const storageRef = ref(storage, uuid());
        const uploadTask = uploadBytesResumable(storageRef, img);
        uploadTask.on(
          (error) => {
            // setErr(true);
          },
          async () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
              await updateDoc(doc(db, "cahts", data.chatId), {
                message: arrayUnion({
                  img: downloadURL,
                  id: uuid(),
                  text,
                  senderId: currentUser.uid,
                  date: Timestamp.now(),
                }),
              });
            });
          }
        );
      } else {
        await updateDoc(doc(db, "cahts", data.chatId), {
          message: arrayUnion({
            id: uuid(),
            text,
            senderId: currentUser.uid,
            date: Timestamp.now(),
          }),
        }).catch((err) => {
          console.log(err.message);
        });
      }

      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });

      await updateDoc(doc(db, "userChats", data.user.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });

      setText("");
      setImg(null);
      setlmageURLs([]);
      setImages([]);
    }
  };

  const hanleUplode = (e) => {
    setImg(e.target.files[0]);
    setImages([...e.target.files]);
  };
  console.log(img);

  useEffect(() => {
    if (images.length < 1) return;
    const newImageURLs = [];
    images.forEach((image) => newImageURLs.push(URL.createObjectURL(image)));
    setlmageURLs(newImageURLs);
  }, [images]);

  return (
    <div className="input">
      {!!img && (
        <div className="after">
          <img src={imageURLs[0]} alt="" />
        </div>
      )}
      <input type="text" placeholder="Type something" value={text} onChange={hanleUplode} />
      <div className="send">
        <input
          type="file"
          style={{ display: "none" }}
          id="file1"
          onChange={(e) => console.log(e.target.files[0])}
        />
        <label htmlFor="file1">
          <img src={Attach} alt="" />
        </label>

        <input type="file" style={{ display: "none" }} id="file" name="img" accept="image/*" onChange={hanleUplode} />
        <label htmlFor="file">
          <img src={Img} alt="" />
        </label>
        <Divider orientation="vertical" flexItem />
        <Button>
          <SendIcon sx={{ color: "#8da4f1", fontSize: 30 }} onClick={handleSend} />
        </Button>
      </div>
    </div>
  );
};

export default Input;
