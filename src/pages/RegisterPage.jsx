import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../actions/userAction";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userRegister = useSelector((state) => state.userRegister);
  const { error, loading, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password != confirmPassword) {
      setMessage("*Password Do not match!Try again");
    } else {
      dispatch(register(name, email, password));
    }
  };
  return (
    <FormContainer>
      <div className="formWrapper">
        <h1>Register</h1>
        {message && <Message className="successMessage">{message}</Message>}
        {error && <Message className="errorMessage">{error}</Message>}
        {loading && <Loader />}
        <form onSubmit={submitHandler} className="registerForm">
          <div className="registerInputField">
            <label htmlFor="name">Name</label>
            <input
              className="registerInput"
              type="text"
              name="name"
              id="name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Your name"
            />
          </div>

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

          <div className="registerInputField">
            <label htmlFor="ConfirmPassword">Confirm Password</label>
            <input
              className="registerInput"
              type="password"
              name="ConfirmPassword"
              id="ConfirmPassword"
              value={confirmPassword}
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
            />
          </div>
          <button type="submit" className="btn-register">
            Register
          </button>
        </form>
        <div className="toggleUser">
          Already Have an accont?{" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Login
          </Link>
        </div>
      </div>
    </FormContainer>
  );
};

export default RegisterPage;
