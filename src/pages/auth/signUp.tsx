import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase";
import classes from "./auth.module.css";
import {
  Button,
  Container,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { Google } from "@mui/icons-material";
import axios from "axios";
import Logo from "./logo";
import AppConstants from "../../AppConstants";

const Signup = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [able, setAble] = useState(false);

  const onSignUp = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userEmail,
        password
      );
      const user = userCredential.user;
      const {
        uid,
        email,
        metadata: { creationTime, lastSignInTime },
        providerId,
        stsTokenManager: { accessToken, refreshToken },
      } = user;
      const userInfo = {
        userName,
        email: email,
        creationTime,
        lastSignInTime,
        uid,
        providerId,
        accessToken,
        refreshToken,
      };

      const authorize = getAuth();
      updateProfile(authorize.currentUser, {
        displayName: userName,
      }).catch((Error) => console.log(Error));

      const response = await axios.post(AppConstants.userInfoUrl, userInfo);
      console.log("RESPONSE", response);
      navigate("/regist/login");
    } catch (error) {
      console.error("Error signing up:", error);
      // Handle error here, e.g., show error message to user
    }
  };

  const onGoogle = async (e) => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      // User signed in successfully
      // Redirect or perform additional actions as needed
      console.log("SUCCESSFUL");
    } catch (error) {
      console.error("Error signing in with Google:", error);
      // Handle error here, e.g., show error message to user
    }
  };

  useEffect(() => {
    if (userEmail.length && password.length && userName.length) {
      setAble(true);
    } else setAble(false);
  }, [userEmail, password, userName]);

  return (
    <div className={classes.authMain}>
      <Container className={classes.formContainer}>
        <Logo />
        <p className={classes.formLabel}>Sign Up</p>
        <form className={classes.form}>
          <TextField
            type="text"
            fullWidth
            style={{
              backgroundColor: "#00000000",
              color: "rgb(255, 255, 255)",
              borderRadius: "5px",
            }}
            label="User Name"
            variant="filled"
            placeholder="User Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
          <TextField
            type="email"
            fullWidth
            style={{
              backgroundColor: "#00000000",
              color: "rgb(255, 255, 255)",
              borderRadius: "5px",
            }}
            label="Email Address"
            variant="filled"
            placeholder="Email address"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            required
          />
          <TextField
            type="password"
            fullWidth
            style={{
              backgroundColor: "#00000000",
              color: "rgb(255, 255, 255)",
              borderRadius: "5px",
            }}
            label="Password"
            variant="filled"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            type="submit"
            onClick={onSignUp}
            variant="contained"
            fullWidth
            disabled={!able}
            sx={{ cursor: "pointer" }}
          >
            Sign Up
          </Button>
          <Divider className={classes.divider}>or continue with</Divider>
          <Button
            className={classes.socialButtons}
            variant="contained"
            fullWidth
            startIcon={
              <Google sx={{ width: 30, height: 30, marginRight: 1 }} />
            }
            onClick={onGoogle}
          >
            With Google
          </Button>
          <p className={classes.divider}>
            By signing in or signing up, you agree with our <br />
            <NavLink
              className={classes.fontStyle}
              target="blank"
              to="/Privacy Policy"
            >
              Privacy Policy
            </NavLink>
          </p>
        </form>
        <Typography sx={{ marginTop: 2 }} className={classes.divider}>
          Already have an account?{" "}
          <NavLink to="/regist/login" className={classes.fontStyle}>
            Sign in
          </NavLink>
        </Typography>
      </Container>
    </div>
  );
};

export default Signup;
