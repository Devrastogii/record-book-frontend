import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Home = () => {

  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      const token = await axios.get('/login-token');     
      if(token.data !== ""){
        setShow(true);
      }

      else {
        navigate('/login');
      }
      }          

    getData();   
  }, []);

  return (
    <>
    
    {show && (
      <>
      <div className='w-full flex flex-col h-96 justify-center items-center'>
            <div className='font-bold text-3xl'>Welcome To The Record Book</div>
            <div className='mt-1'>Your one stop solution to record booking</div>
            <div className='flex flex-col justify-center items-center mt-12 gap-8'>
                <div>
                    <Link to={'/add-new-user'} className='bg-white border border-blue-500 text-blue-500 shadow-xl shadow-blue-100 w-60 h-12 font-semibold text-lg flex justify-center items-center hover:text-white hover:bg-gradient-to-r from-cyan-500 to-blue-500 hover:shadow-4xl hover:shadow-white hover:-translate-y-1 hover:transition-all hover:duration-300'>ADD NEW CUSTOMER</Link>
                </div>
                <div><Link to={'/get-all-data'} className='bg-white border border-blue-500 text-blue-500 shadow-xl shadow-blue-100 w-32 h-12 font-semibold text-lg flex justify-center items-center hover:text-white hover:bg-gradient-to-r from-cyan-500 to-blue-500 hover:shadow-4xl hover:shadow-white hover:-translate-y-1 hover:transition-all hover:duration-300'>GET DATA</Link></div>
            </div>            
        </div>
      </>
    )}        
    </>
  )
}

export default Home
