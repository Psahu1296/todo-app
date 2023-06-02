import React, { useContext, useEffect, useState } from "react";
import "./components.css";
import { UserContext } from "./UserProvider";
import { useNavigate } from "react-router-dom";

const UserDetails = {
  user: "coder.dev@gmail.com",
  password: "Abcd1234",
};

const Login = () => {
  const { username, password, updatePassword, updateUsername } = useContext(UserContext);
  const [signError, setSignError] = useState<string>("");
  const navigate = useNavigate();

  const changeHandler =
    (setState: (args: string) => void) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSignError("")
      return setState(event.target.value);
    };

  const signInHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      if (username === UserDetails.user && password === UserDetails.password) {
        localStorage.setItem("token", JSON.stringify(UserDetails));
        navigate("/");
        return;
      }
      setSignError("Username or password is incorrect")
      console.log("failed");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  });

  return (
    <div className="wrapper">
      <div className="container">
        <h2 className="title">Sign In</h2>
        <div className="tag">
          <label>UserName</label>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => changeHandler(updateUsername)(e)}
          />
        </div>
        <div className="tag">
          <label>Password</label>
          <input
            type="text"
            placeholder="Password"
            value={password}
            onChange={(e) => changeHandler(updatePassword)(e)}
          />
        </div>
        <p className="error" style={{visibility: signError? 'visible': 'hidden'}}>*{signError}</p>
        <button onClick={signInHandler}>Sign In</button>
      </div>
    </div>
  );
};

export default Login;
