import React, { useEffect, useState } from "react";
import axios from "axios";

const Summary = () => {
  const [storeData, getStoreData] = useState([]);
  let tAmountArray = [];
  let tSum = 0;
  let pSum = 0;
  let lSum = 0;
  let pAmountArray = [];
  let lAmountArray = [];
  const [tAmount, setTAmount] = useState(0);  
  const [pAmount, setPAmount] = useState(0);  
  const [lAmount, setLAmount] = useState(0);  
  const [disable, disabled] = useState(false);

  useEffect(() => {
    async function coming(){
        const response = await axios.post("/get-all-records");
        getStoreData(response.data);                     
    }
    
    coming();
  }, [])

  async function getData(e) {
    e.preventDefault();        
    storeData.map((val) => {
        tAmountArray.push(val.totalAmount);
        pAmountArray.push(val.amountPaid);
        lAmountArray.push(val.amountToBePaid);
      }); 
      for (let index = 0; index < tAmountArray.length; index++) {
        tSum += tAmountArray[index];
        pSum += pAmountArray[index];
        lSum += lAmountArray[index];
      } 
      setTAmount(tSum);    
      setPAmount(pSum);
      setLAmount(lSum);
      disabled(true);
  }

  function clear(e){
    e.preventDefault();
    tSum = 0;
    setTAmount(tSum);
    pSum = 0;
    setPAmount(pSum);
    lSum = 0;
    setLAmount(lSum);
    disabled(false);
  }

  return (
    <>
      <div className="flex justify-center font-bold text-2xl mt-10 text-indigo-600">
        FULL YEAR SUMMARY (2023-2024)
      </div>

      <div className="flex justify-center mt-8">
        <form>         
          <div>
            <label className="block text-gray-400">
              Total Amount (of goods sold):
            </label>
            <input
              type="text"
              className="border border-gray-200 mt-2 outline-blue-500 pl-2 text-gray-500 rounded-md h-8"            
              disabled
              value={tAmount}
            />
          </div>
          <div>
            <label className="block text-gray-400 mt-3">Amount Received:</label>
            <input
              type="number"
              className="border border-gray-200 mt-2 outline-blue-500 pl-2 text-gray-500 rounded-md h-8"
              value={pAmount}             
              disabled
            />
          </div>                  

          <div className="grid grid-cols-2 gap-12 mt-3">
            <div>
              <label className="block text-gray-400">Amount Pending:</label>
              <input
                type="number"
                className="border border-gray-200 mt-2 outline-blue-500 pl-2 text-gray-500 rounded-md h-8" 
                value={lAmount}                            
                disabled
              />
            </div>
          </div>

          <div className="flex flex-row gap-x-5 justify-center mt-7">
          <button
              className="bg-white border border-blue-500 text-blue-500 shadow-xl shadow-blue-100 w-40 h-12 font-semibold text-lg flex justify-center items-center hover:text-white hover:bg-gradient-to-r from-cyan-500 to-blue-500 hover:shadow-4xl hover:shadow-white hover:-translate-y-1 hover:transition-all hover:duration-300"
              onClick={getData} disabled={disable}
            >
              GET DATA
            </button>
            <button
              className="bg-white border border-blue-500 text-blue-500 shadow-xl shadow-blue-100 w-40 h-12 font-semibold text-lg flex justify-center items-center hover:text-white hover:bg-gradient-to-r from-cyan-500 to-blue-500 hover:shadow-4xl hover:shadow-white hover:-translate-y-1 hover:transition-all hover:duration-300" onClick={clear}           
            >
              CLEAR
            </button>            
          </div>
        </form>
      </div>
    </>
  );
};

export default Summary;
