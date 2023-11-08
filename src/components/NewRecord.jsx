import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import {
  Modal,  
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Text
} from '@chakra-ui/react'

const NewRecord = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [itemName, setItemName] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [amountPaid, setAmountPaid] = useState("");

  let amountToBePaid = "";
  
  const [dateOfPurchase, setDateOfPurchase] = useState("");
  const [dateOfPayment, setDateOfPayment] = useState("");

  const [paymentHistory, setPaymentHistory] = useState([]);
  const [amountHistory, setAmountHistory] = useState([]);

  const [update, setUpdate] = useState("ADD"); 
  const [visible, setVisible] = useState(false);
  const [disable, setDisable] = useState(false);

  const [addPhoto, setAddPhotos] = useState([]);

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      return;
    }

    setUpdate("UPDATE");
    setDisable(true);
    setVisible(false);

    axios.get("/update/" + id).then((response) => {
      const { data } = response;        
      setName(data.name);
      setPhone(data.phone);
      setAddress(data.address);
      setItemName(data.itemName);
      setTotalAmount(Number(data.totalAmount) - Number(data.amountPaid));      
      setDateOfPayment(data.dateOfPayment);
      setDateOfPurchase(data.dateOfPurchase);      
      setPaymentHistory(data.paymentHistory);     
      setAmountHistory(data.amountHistory);
    });

  }, [id]);

  const { isOpen, onOpen, onClose } = useDisclosure()  
  
  async function sendData(e) {
    e.preventDefault();  
    
    amountToBePaid = Number(totalAmount) - Number(amountPaid); 
    
    setVisible(false)   

    if(dateOfPayment >= dateOfPurchase && phone.toString().length === 10 && amountToBePaid >= 0 && totalAmount >= 0 && amountPaid >= 0){ 

      paymentHistory.push(dateOfPayment);
      amountHistory.push(amountPaid);

      const customerData = {      
        name,
        phone,
        address,
        itemName,
        totalAmount,
        amountPaid,
        amountToBePaid,
        dateOfPayment,
        dateOfPurchase,
        paymentHistory,
        amountHistory,
        addPhoto
    };                 

    if (id) { 
      navigate('/get-all-data');                       
      await axios.put("/update-customer", {
        id, ...customerData
      });                      
    } 
    
    else {
      await axios.post("/add-customer", customerData);        
      navigate('/get-all-data')
    }
    }      
    
    else {
      setVisible(true); 
      onOpen();     
    }
  }

  function redirect(e){
    e.preventDefault();
    navigate('/get-all-data')
  }

  function uploadPhoto(ev) {
    const files = ev.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append('photos', files[i]);
    }
    axios.post('/upload', data, {
      headers: {'Content-type':'multipart/form-data'}
    }).then(response => {
      const {data:filenames} = response;
      setAddPhotos(prev => {
        return [...prev, ...filenames];
      });
    })
  }

  return (
    <>
      <div className="flex justify-center font-bold text-2xl mt-10 text-indigo-600">
        ADD NEW CUSTOMER
      </div>

      <div className="mt-16 px-20 w-full">
        <form className="w-2/3">
          <div className="flex flex-row">
            <div className="w-1/2">
              <label className="text-gray-400">Name:</label>
              <input
                type="text"
                className="border ml-5 border-gray-200 mt-2 outline-blue-500 pl-2 text-gray-500 rounded-md h-8"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="w-1/2 -ml-10">
              <label className="text-gray-400">Phone Number:</label>
              <input
                type="number"
                className="border ml-5 border-gray-200 mt-2 outline-blue-500 pl-2 text-gray-500 rounded-md h-8"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
          </div>
          <br />
          <label className="text-gray-400">Address:</label>
          <input
            type="text"
            className="border ml-5 w-3/4 border-gray-200 mt-2 outline-blue-500 pl-2 text-gray-500 rounded-md h-8"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <br /> <br />
          <label className="text-gray-400">Item Name:</label>
          <input
            type="text"
            className="border border-gray-200 mt-2 outline-blue-500 pl-2 text-gray-500 rounded-md h-8 w-3/4 ml-5"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            required
            disabled={disable}
          />
          <br />
          <br />
          <label className="text-gray-400">Total Amount:</label>
          <input
            type="number"
            className="border border-gray-200 mt-2 outline-blue-500 pl-2 text-gray-500 rounded-md h-8 w-3/4 ml-5"
            value={totalAmount}
            onChange={(e) => setTotalAmount(e.target.value)}
            required
          />
          <br />
          <br />
          <label className="text-gray-400">Amount Paid:</label>
          <input
            type="number"
            className="border border-gray-200 mt-2 outline-blue-500 pl-2 text-gray-500 rounded-md h-8 w-3/4 ml-5"
            value={amountPaid}
            onChange={(e) => setAmountPaid(e.target.value)}
            required
          />
          {Number(totalAmount) < Number(amountPaid) && (
            <div className="text-red-500 text-sm mt-4">
              ** Total Amount should be greater than or equal to Amount Paid
            </div>
          )}
          <br />
          <br />
          <div className="flex flex-row items-center">
            <div>
              <label className="text-gray-400">Amount To Be Paid:</label>
              <input
                type="number"
                className="border border-gray-200 mt-2 outline-blue-500 pl-2 text-gray-500 rounded-md h-8 ml-5"
                value={Number(totalAmount) - Number(amountPaid)}
                required
              />
            </div>
          </div>
          <br />
          <br />
          <label className="text-gray-400">Date of Purchase:</label>
          <input
            type="date"
            className="border border-gray-200 mt-2 outline-blue-500 pl-2 text-gray-500 rounded-md h-8 w-3/4 ml-5"
            value={dateOfPurchase}
            onChange={(e) => setDateOfPurchase(e.target.value)}
            required
            disabled={disable}
          />
          <br />
          <br />
          <label className="text-gray-400">Date of Payment:</label>
          <input
            type="date"
            className="border border-gray-200 mt-2 outline-blue-500 pl-2 text-gray-500 rounded-md h-8 w-3/4 ml-5"
            value={dateOfPayment}
            onChange={(e) => setDateOfPayment(e.target.value)}
            required
          />
          <br />
          <br />
          <label className="bg-white border border-blue-500 text-blue-500 shadow-xl shadow-blue-100 w-44 h-24 font-semibold text-lg flex justify-center items-center hover:text-white hover:bg-gradient-to-r from-cyan-500 to-blue-500 hover:-translate-y-1 hover:transition-all hover:duration-300 cursor-pointer mt-4">
          <input type="file" multiple className="hidden" onChange={uploadPhoto} />
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
          </svg>
          Upload
        </label> 

        <div className="mt-10 flex flex-row w-full flex-wrap">
        {addPhoto.length > 0 && addPhoto.map(link => (
          <div className="h-32 flex relative p-2" key={link}>
            <img className="rounded-2xl w-42 object-cover ml-2 mr-2" src={'http://localhost:8000/'+link} alt=""/>
            </div>
        ))}
        </div>        

          <div className="flex flex-row gap-5 justify-center mt-12">
            <button
              className="bg-blue-500 text-white drop-shadow-2xl w-48 h-12 font-semibold text-xl flex justify-center items-center hover:text-white hover:bg-gradient-to-r from-cyan-500 to-blue-500 hover:shadow-4xl hover:shadow-white hover:-translate-y-1 hover:transition-all hover:duration-300"
              onClick={(e) => {
                sendData(e);                                      
              }}
            >
              {update}
            </button>

            <button      
          className="bg-white border border-blue-500 text-blue-500 shadow-xl shadow-blue-100 w-44 h-12 font-semibold text-lg flex justify-center items-center hover:text-white hover:bg-blue-500 hover:shadow-4xl cursor-pointer hover:shadow-white hover:-translate-y-1 hover:transition-all hover:duration-300" onClick={redirect}
        >
           GO BACK
        </button>
          </div>
        </form>
      </div>
      <br /><br />

      {visible && (
        <>
        <Modal isCentered isOpen={isOpen} onClose={onClose}>      
        <ModalContent bg={"red.600"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
          <ModalCloseButton color={"white"} />
          <ModalBody>
            <Text color={"white"} mt={5} fontSize={20}>Please Fill All The Details Correctly !!!</Text>
            <Text fontWeight={"bold"} fontSize={15} mt={2} mb={2}>Validations To Be Followed:</Text>
            <Text color={"white"}>1. No field should be blank</Text>
            <Text color={"white"}>2. Phone number should have length of 10 numbers</Text>
            <Text color={"white"}>3. No special character allowed</Text>
            <Text color={"white"}>4. Date of Purchase should be same or past date (not more than Date of Payment)</Text>
            <Text color={"white"}>5. Value of Amount should be positive</Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
        </>
      )}
    </>
  );
};

export default NewRecord;
