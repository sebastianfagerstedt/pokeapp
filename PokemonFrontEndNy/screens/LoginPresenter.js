import React, { useState } from "react";
import { loginAPI } from "../api";
import LoginView from "./LoginView";
import { useDispatch } from "react-redux";
import { setToken } from "../slices/authSlice";

export default function LoginPresenter({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Authentication
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const result = await loginAPI({ username, password });
      dispatch(
        setToken({
          accessToken: result.data.access,
          refreshToken: result.data.refresh,
          isAuthenticated: true,
        })
      );
    } catch (error) {
      const status = error.response.status;
      if (status === 503 || status === 404) setErrorMessage("Server Error");
      else if (status === 400 || status === 401) {
        setErrorMessage("Wrong Username or Password");
      }
    }
  };

  const handleGoToRegister = () => {
    navigation.navigate("Register", {});
  };

  return (
    <LoginView
      handleLogin={handleLogin}
      handleGoToRegister={handleGoToRegister}
      username={username}
      password={password}
      setUsername={setUsername}
      setPassword={setPassword}
      errorMessage={errorMessage}
    ></LoginView>
  );
}
