import React, { useEffect } from "react";
import { useState } from "react";
import FormContainer from "../components/FormContainer";
import { Link, redirect, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userAction";
import Message from "../components/Message";
import Loader from "../components/Loader";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  return (
    <FormContainer>
      <div className="formWrapper">
        <h1>Sign in</h1>
        {error && <Message className="errorMessage">{error}</Message>}
        {loading && <Loader />}
        <form onSubmit={submitHandler} className="registerForm">
          <div className="registerInputField">
            <label htmlFor="email">Email Address</label>
            <input
              className="registerInput"
              type="email"
              name="email"
              id="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
            />
          </div>

          <div className="registerInputField">
            <label htmlFor="password">Password</label>
            <input
              className="registerInput"
              type="password"
              name="password"
              id="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your Password"
            />
          </div>
          <button type="submit" className="btn-register">
            Sign In
          </button>
        </form>
        <div className="toggleUser">
          New Customer ?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Register
          </Link>
        </div>
      </div>
    </FormContainer>
  );
};

export default LoginPage;
