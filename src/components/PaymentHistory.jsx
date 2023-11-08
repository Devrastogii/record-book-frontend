import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const PaymentHistory = () => {
  const location = useLocation();

  const [complete, setComplete] = useState(false);

  const storePayData = location.state.payData;
  const storeAmountData = location.state.amountData;
  const tAmount = location.state.initialAmount;
  const sum = location.state.sumA;

  useEffect(() => {
    if(tAmount == sum){
      setComplete(true);
    }
  },[])

  return (
    <>
      <div className="flex justify-center font-semibold text-2xl mt-7">
        Payment History For {location.state.name}
      </div>

      <div className="flex justify-center font-semibold text-xl mt-8">
        Total Amount: ₹{tAmount}
      </div>

      <div className="flex justify-center">
        <div className="text-center mt-8 grid grid-cols-3 border border-black w-1/2 p-2">
          <div>
            <h1 className="mb-2 text-lg font-semibold">S.No</h1>
            {storePayData !== null &&
              storePayData.map((val, index) => {
                return (
                  <>
                    {(index + 1) % 2 !== 0 && (
                      <p className="text-gray-600 bg-gray-100 mb-2">
                        {index + 1}
                      </p>
                    )}

                    {(index + 1) % 2 === 0 && (
                      <p className="text-gray-600 bg-gray-200 mb-2">
                        {index + 1}
                      </p>
                    )}
                  </>
                );
              })}

            <p className="text-gray-600 bg-gray-100 mb-2 font-bold">TOTAL</p>
            <p className="text-gray-600 bg-gray-100 mb-2 font-bold">DUE</p>
          </div>
          <div>
            <h1 className="mb-2 text-lg font-semibold">DATE OF PAYMENT</h1>
            {storePayData !== null &&
              storePayData.map((val, index) => {
                return (
                  <>
                    {index % 2 === 0 && (
                      <p className="text-gray-600 bg-gray-100 mb-2">{val}</p>
                    )}

                    {index % 2 !== 0 && (
                      <p className="text-gray-600 bg-gray-200 mb-2">{val}</p>
                    )}
                  </>
                );
              })}

            <p className="text-gray-600 bg-gray-100 mb-2 font-bold">-</p>
            <p className="text-gray-600 bg-gray-100 mb-2 font-bold">-</p>
          </div>
          <div>
            <h1 className="mb-2 text-lg font-semibold">AMOUNT</h1>
            {storeAmountData !== null &&
              storeAmountData.map((val, index) => {
                return (
                  <>
                    {index % 2 === 0 && (
                      (val !== null && (
                        <p className="text-gray-600 bg-gray-100 mb-2">₹{val}</p>
                      ))                      
                    )}

                    {index % 2 !== 0 && (
                      (val !== null && (
                        <p className="text-gray-600 bg-gray-200 mb-2">₹{val}</p>
                      )) 
                    )}
                  </>
                );
              })}

            <p className="text-gray-600 bg-gray-100 mb-2 font-bold">₹{sum}</p>
            <p className="text-gray-600 bg-gray-100 mb-2 font-bold">
              ₹{tAmount - sum}
            </p>
          </div>
        </div>
      </div>

      {complete && (
        <>
        <div className="flex justify-center mt-4">
        <button      
          className="bg-white border border-blue-500 text-blue-500 shadow-xl shadow-blue-100 w-60 h-12 font-semibold text-lg flex justify-center items-center hover:text-white hover:bg-gradient-to-r from-cyan-500 to-blue-500 hover:shadow-4xl hover:shadow-white hover:-translate-y-1 hover:transition-all hover:duration-300 mt-4 cursor-default"
        >
           🎉 MONEY RECEIVED 🎉
        </button>
      </div>
        </>
      )}      
    </>
  );
};

export default PaymentHistory;
