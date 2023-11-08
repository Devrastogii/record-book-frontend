import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import { Alert, AlertIcon, AlertTitle } from "@chakra-ui/react";

const Signup = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");

  const [dialogBox, showDialogBox] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      const tokenDoc = await axios.get('/login-token');   
      if(tokenDoc.data !== ""){
        alert('Already logged in !!!');    
        navigate('/account')    
      }      
      }          

    getData();   
  }, []);
 
  async function userRegistration(e) {
    e.preventDefault();
    try {
      if (
        name !== "" &&
        phone !== "" &&
        email !== "" &&
        password !== "" &&
        cpassword !== "" &&
        password === cpassword &&
        phone.length === 10
      ) {
        
        const res = await axios.post("/register", {
          name,
          phone,
          email,
          password,
        });

        if(res.data !== "Account already present !! Please login"){
            navigate('/');
            showDialogBox(false);         
        }
        
        else {
          alert('"Account already present !! Please login')
        }
        
      }

      else {
        showDialogBox(true);
      }
    } catch (error) {
      console.log(error);
      alert("Registration failed");
    }
  }

  return (
    <>
      <div className="flex justify-center font-bold text-2xl mt-10 text-indigo-600">
        SIGN UP
      </div>

      <div className="flex justify-center mt-8">
        <form onSubmit={userRegistration}>
          <div className="grid grid-cols-2 gap-12">
            <div>
              <label className="block text-gray-400">Name:</label>
              <input
                type="text"
                className="border border-gray-200 mt-2 outline-blue-500 pl-2 text-gray-500 rounded-md h-8"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {name === "" && (
                <div className="mt-2 text-sm text-red-500">
                  ** Name can't be blank
                </div>
              )}
            </div>
            <div>
              <label className="block text-gray-400">Phone Number:</label>
              <input
                type="number"
                className="border border-gray-200 mt-2 outline-blue-500 pl-2 text-gray-500 rounded-md h-8"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}               
              />
              {phone === "" && (
                <div className="mt-2 text-sm text-red-500">
                  ** Phone Number can't be blank
                </div>
              )}
            </div>
          </div>
          <label className="block mt-3 text-gray-400">Email Address:</label>
          <input
            type="email"
            className="border border-gray-200 mt-2 w-full outline-blue-500 pl-2 text-gray-500 rounded-md h-8"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {email === "" && (
            <div className="mt-2 text-sm text-red-500">
              ** Email can't be blank
            </div>
          )}
          <div className="grid grid-cols-2 gap-12 mt-3">
            <div>
              <label className="block text-gray-400">Password:</label>
              <input
                type="password"
                className="border border-gray-200 mt-2 outline-blue-500 pl-2 text-gray-500 rounded-md h-8"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-400">Confirm Password:</label>
              <input
                type="password"
                className="border border-gray-200 mt-2 outline-blue-500 pl-2 text-gray-500 rounded-md h-8"
                value={cpassword}
                onChange={(e) => setCPassword(e.target.value)}
              />
            </div>
          </div>

          {password !== cpassword && (
            <div className="mt-2 text-sm text-red-500">
              ** Passwords do not match
            </div>
          )}

          <div className="flex justify-center mt-8">
            <button                   
              className="bg-white border border-blue-500 text-blue-500 shadow-xl shadow-blue-100 w-40 h-12 font-semibold text-lg flex justify-center items-center hover:text-white hover:bg-gradient-to-r from-cyan-500 to-blue-500 hover:shadow-4xl hover:shadow-white hover:-translate-y-1 hover:transition-all hover:duration-300"
            >
              REGISTER
            </button>
          </div>

          <div className="flex justify-center mt-2">
            <h1 className='text-sm'>Existing User? <Link to={'/login'} className='text-blue-500 text-sm font-bold underline'>LOG IN</Link></h1>
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
  );
};

export default Signup;
