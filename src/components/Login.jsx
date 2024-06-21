import React from "react";
import { Button } from "antd";
import {
  GoogleOutlined,
  FacebookOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  auth,
  googleProvider,
  facebookProvider,
  signInWithPopup,
  fetchSignInMethodsForEmail,
  linkWithCredential,
  EmailAuthProvider,
} from "./firebase";

const Login = () => {
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log(result.user);
    } catch (error) {
      if (error.code === "auth/account-exists-with-different-credential") {
        const email = error.customData.email;
        const pendingCredential = error.credential;

        const signInMethods = await fetchSignInMethodsForEmail(auth, email);
        if (signInMethods.length) {
          const provider =
            signInMethods[0] === "password"
              ? EmailAuthProvider
              : new auth.providers[signInMethods[0]]();

          const userCredential = await signInWithPopup(auth, provider);

          await linkWithCredential(userCredential.user, pendingCredential);
        }
      } else {
        console.error(error);
      }
    }
  };

  const handleFacebookLogin = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      console.log(result.user);
    } catch (error) {
      if (error.code === "auth/account-exists-with-different-credential") {
        const email = error.customData.email;
        const pendingCredential = error.credential;

        const signInMethods = await fetchSignInMethodsForEmail(auth, email);
        if (signInMethods.length) {
          // Existing sign-in method (assuming first method in array)
          const provider =
            signInMethods[0] === "password"
              ? EmailAuthProvider
              : new auth.providers[signInMethods[0]]();
          const userCredential = await signInWithPopup(auth, provider);
          await linkWithCredential(userCredential.user, pendingCredential);
        }
      } else {
        console.error(error);
      }
    }
  };

  return (
      <div id="login-page">
        <div id="login-card">
          <h2>
            <UserOutlined />
            Login To TalkByte!
          </h2>
          <Button
            className="login-button google"
            icon={<GoogleOutlined />}
            onClick={handleGoogleLogin}
          >
            Login with Google
          </Button>
          <Button
            className="login-button facebook"
            icon={<FacebookOutlined />}
            onClick={handleFacebookLogin}
          >
            Login with Facebook
          </Button>
        </div>
      </div>
  );
};

export default Login;
