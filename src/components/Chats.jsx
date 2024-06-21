import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
import axios from "axios";
import { auth } from "./firebase";
import { useAuth } from "../contexts/AuthContext";
import process from "process";


const Chats = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  const logoutHandler = async () => {
    await auth.signOut();
    navigate("/");
  };

  const getFile = async (url) => {
    const response = await fetch(url);
    const data = await response.blob();
    return new File([data], "userPhoto.jpg", { type: "image/jpeg" });
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }

    const projectID = process.env.REACT_APP_CHAT_ENGINE_ID;
    const privateKey = process.env.REACT_APP_CHAT_ENGINE_PRIVATE_KEY;

    axios
      .get("https://api.chatengine.io/users/me/", {
        headers: {
          "project-id": "06c3b048-66b2-4e3e-8949-591bae706576",
          "user-name": user.email,
          "user-secret": user.uid,
        },
      })
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        let formdata = new FormData();
        formdata.append("email", user.email);
        formdata.append("username", user.email);
        formdata.append("secret", user.uid);

        getFile(user.photoURL).then((avatar) => {
          formdata.append("avatar", avatar, avatar.name);

          axios
            .post("https://api.chatengine.io/users/", formdata, {
              headers: {
                "private-key":"a5843456-48ca-4921-a749-179e86aac5e4"
              },
            })
            .then(() => setLoading(false))
            .catch((error) => console.log(error));
        });
      });
  }, [user, navigate]);

  // if (!user || loading) return <div>Loading...</div>;

  return (
    <div className="chats-page">
      <div className="nav-bar">
        <div className="logo-tab">TalkByte</div>
        <div className="logout-tab" onClick={logoutHandler}>
          Logout
        </div>
      </div>

      <ChatEngine
        height="calc(100vh - 66px)"
        projectID="06c3b048-66b2-4e3e-8949-591bae706576"
        userName={user.email}
        userSecret={user.uid}
      />
    </div>
  );
};

export default Chats;
