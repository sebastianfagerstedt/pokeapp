import React, { useState } from "react";
import { registerAPI } from "../api";
import RegisterView from "./RegisterView";

export default function RegisterPresenter({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const register = async () => {
    try {
      const result = await registerAPI({
        username,
        password,
        firstname,
        lastname,
        email,
      });

      return result;
    } catch (e) {
      console.log(e);
      return {
        error: true,
        msg: e.response.data["msg"],
        status: e.response.data.status,
      };
    }
  };

  const handleRegisterUser = () => {
    const result = register();

    navigation.navigate("Login", {});
  };

  const handleGoBack = () => {
    navigation.navigate("Login", {});
  };

  return (
    <RegisterView
      handleRegisterUser={handleRegisterUser}
      handleGoBack={handleGoBack}
      username={username}
      password={password}
      email={email}
      firstname={firstname}
      lastname={lastname}
      setEmail={setEmail}
      setFirstname={setFirstname}
      setLastname={setLastname}
      setUsername={setUsername}
      setPassword={setPassword}
    ></RegisterView>
  );
}
