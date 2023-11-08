import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Alert, AlertIcon, AlertTitle } from "@chakra-ui/react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dialogBox, showDialogBox] = useState(false);
  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      const tokenDoc = await axios.get('/login-token');   
      if(tokenDoc.data === ""){
        setShow(true);        
      }

      else {
        navigate('/account');   
      }
      }          

    getData();   
  }, []);

  async function loginform(e) {
    e.preventDefault();

    if (email !== "" && password !== "") {
      await axios.post("/user-login", { email, password });
      showDialogBox(false);
      navigate('/');
    } else {
      showDialogBox(true);
    }
  }  

  return (
    <>

    {show && (
      <>
      <div className="flex justify-center font-bold text-2xl mt-10 text-indigo-600">
        LOG IN
      </div>

      <div className="flex justify-center mt-8 w-full">
        <form className="w-1/2" onSubmit={loginform}>
          <label className="block mt-3 text-gray-400">Email Address:</label>
          <input
            type="email"
            className="border border-gray-200 mt-2 w-11/12 outline-blue-500 pl-2 text-gray-500 rounded-md h-8"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {email === "" && (
            <div className="mt-2 text-sm text-red-500">
              ** Email can't be blank
            </div>
          )}
          <div>
            <label className="block text-gray-400 mt-5">Password:</label>
            <input
              type="password"
              className="border border-gray-200 mt-2 outline-blue-500 pl-2 text-gray-500 rounded-md h-8 w-11/12"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {password === "" && (
            <div className="mt-2 text-sm text-red-500">
              ** Password can't be blank
            </div>
          )}

          <div className="flex justify-center mt-8">
            <button className="bg-white border border-blue-500 text-blue-500 shadow-xl shadow-blue-100 w-40 h-12 font-semibold text-lg flex justify-center items-center hover:text-white hover:bg-gradient-to-r from-cyan-500 to-blue-500 hover:shadow-4xl hover:shadow-white hover:-translate-y-1 hover:transition-all hover:duration-300">
              LOGIN
            </button>
          </div>

          <div className="flex justify-center mt-4">
            <h1 className="text-sm">
              New Here?{" "}
              <Link
                to={"/new-user-register"}
                className="text-blue-500 text-sm font-bold underline"
              >
                SIGN UP
              </Link>
            </h1>
          </div>
        </form>
      </div>

      {dialogBox && (
        <>
          <div className="flex justify-center items-center mt-2">
            <div className="w-1/4">
              <Alert status="error">
                <AlertIcon />
                <AlertTitle>Please fill the required fields!</AlertTitle>
              </Alert>
            </div>
          </div>
        </>
      )}
      </>
    )}      
    </>
  );
};

export default Login;
