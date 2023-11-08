import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Tilt from 'react-parallax-tilt'
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    useDisclosure,
    AlertDialogCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
} from '@chakra-ui/react'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'

import nodata from '../images/noData.png'

const Search = () => { 
  const [search, setSearch] = useState("");
  const [storeData, setStoreData] = useState([]);

  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()

  const [modal, setModal] = useState(false);
  const [storeId, setStoreId] = useState('');
  const [interest, setInterest] = useState(false);
  const [month, setMonth] = useState('');
  const [individualShow, setIndividualShow] = useState('');
  const [inputInterest, setInputInterest] = useState('');
  const [calculateInterest, setCalculateInterest] = useState('');
  const [calculateTotal, setCalculateTotal] = useState('');

  const [isEmpty, setIsEmpty] = useState(false);
  const [showNoRecord, setShowNoRecord] = useState(false);

  const navigate = useNavigate();

  let sum = 0;

  useEffect(() => {
    async function getData() {
      const token = await axios.get('/login-token');      
      if(token.data !== ""){              
          setIsEmpty(true);        
      }

      else {
        setIsEmpty(false);
        navigate('/login')
      }
      }          

    getData();   
  }, []);

  async function searchByName(e){
    e.preventDefault();        
    if(search !== ""){
        const response = await axios.post('/search-by-name', {search});      
        if(response.data.length > 0){
          setStoreData(response.data);  
          setShowNoRecord(false);      
        }

        else {
          setShowNoRecord(true);
          setStoreData([])
        }
    }
  }

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null) 

  function showModal(e, _id){
    e.preventDefault();
    setModal(true);
    setStoreId(_id);
    onOpen();    
  }

  function showInterestBox(e, _id){
    e.preventDefault();
    setInterest(true);   
    setIndividualShow(_id);
    onOpen();    
  }

  async function deleteData(e, _id){
    e.preventDefault();
    const { data } = await axios.post('/delete-record', {_id})
    setStoreData(data);
    setModal(false);
  }

  function calculate(e, amount){
    e.preventDefault();
    const rate = amount * inputInterest / 100;
    const formula = amount + rate*month;
    setCalculateInterest(formula - amount);
    setCalculateTotal(formula);
  }

  function showHistoryBox(
    e,
    _id,
    userName,
    payHistory,
    amountHistory,
    tAmount,
    pAmount,
    lAmount,
    iAmount
  ) {
    e.preventDefault();
    setIndividualShow(_id);
    onOpen();

    for (let index = 0; index < amountHistory.length; index++) {
      sum += amountHistory[index];      
    }   

    navigate("/payment-history", {
      state: {
        name: userName,
        payData: payHistory,
        amountData: amountHistory,
        totalAmount: tAmount,
        amountToBePaid: lAmount,
        amountPaid: pAmount,
        initialAmount: iAmount,
        sumA: sum
      },
    });
  }

  return (
    <>

      {isEmpty && (
        <>
        <div className="flex justify-center font-bold text-2xl mt-10 text-indigo-600">
        SEARCH
      </div>

      <form>
      <div className="flex flex-row justify-center mt-8 gap-10">
      <div>
        <input
          type="text"
          value={search}
          placeholder='Search using customer details'
          className="border border-gray-200 w-96 outline-blue-500 pl-4 text-gray-500 rounded-md h-10"
          onChange={(e) => setSearch(e.target.value)}
        />  
        </div>       
        <div>
        <button className='bg-blue-500 text-white drop-shadow-2xl w-32 h-9 font-bold text-md flex justify-center items-center hover:shadow-4xl hover:shadow-white hover:bg-blue-600 hover:-translate-y-1 hover:transition-all hover:duration-300 rounded-lg' onClick={searchByName}>SEARCH</button>              
      </div>
      </div>

      {search === "" && (
      <div className="text-red-500 text-sm mt-4 flex justify-center">
        ** Field can't be blank
      </div>
    )}
      
        </form>

        <div className="flex flex-row gap-x-3 gap-y-8 mt-10 flex-wrap justify-center">
        {storeData !== null && storeData.map((val, index) => {
        return (  
          <Tilt>                   
            <div className="border border-gray-400 py-2 px-4 hover:-translate-y-4 hover:transition-all hover:duration-500 hover:shadow-xl hover:shadow-blue-200 hover:border-gray-200" key={index}>
                <div><span className="font-semibold">Name:</span> {val.name}</div>
                <div><span className="font-semibold">Address:</span> {val.address}</div>
                <div><span className="font-semibold">Phone Number: </span>{val.phone}</div>
                <div><span className="font-semibold">Item: </span>{val.itemName}</div>
                <div><span className="font-semibold">Total Amount: </span>{val.totalAmount}</div>
                <div><span className="font-semibold">Amount Paid: </span>{val.amountPaid}</div>
                <div><span className="font-semibold">Amount Left: </span>{val.amountToBePaid}</div>
                <div><span className="font-semibold">Date of Purchase: </span>{val.dateOfPurchase}</div>
                <div><span className="font-semibold">Date of Payment: </span>{val.dateOfPayment}</div> 

                <div className="flex flex-row gap-6 justify-between px-5 mt-4 mb-3">
                    <div>
                    <Link to={'/update/' + val._id} className='bg-white border rounded-lg text-green-500 drop-shadow-2xl w-24 h-9 font-semibold text-lg flex justify-center items-center hover:text-white hover:bg-gradient-to-r from-green-600 to-green-500 hover:shadow-4xl hover:shadow-white hover:-translate-y-1 hover:transition-all hover:duration-300'>UPDATE</Link>
                    </div>
                    <div>
                    <button className='bg-white border rounded-lg text-red-600 drop-shadow-2xl w-24 h-9 font-semibold text-lg flex justify-center items-center hover:text-white hover:bg-gradient-to-r from-red-500 to-red-600 hover:shadow-4xl hover:shadow-white hover:-translate-y-1 hover:transition-all hover:duration-300' onClick={(e) => showModal(e,val._id)}>DELETE</button>              
                    </div>
                </div>   

                <div className="flex flex-col mt-1 justify-center items-center">
                        <div className="mb-2 mt-1">
                          <button
                            className="bg-white border rounded-lg text-purple-600 w-48 h-9 font-bold text-sm flex justify-center items-center hover:text-white hover:bg-gradient-to-r from-purple-500 to-purple-600 hover:shadow-4xl hover:shadow-white hover:-translate-y-1 hover:transition-all hover:duration-300"
                            onClick={(e) => showInterestBox(e, val._id)}
                          >
                            CALCULATE INTEREST
                          </button>
                        </div>

                        <div className="mb-2">
                          <button
                            className="bg-white border rounded-lg text-orange-500 w-48 h-9 font-bold text-sm flex justify-center items-center hover:text-white hover:bg-gradient-to-r from-orange-500 to-orange-600 hover:-translate-y-1 hover:transition-all hover:duration-300"
                            onClick={(e) =>
                              showHistoryBox(
                                e,
                                val._id,
                                val.name,
                                val.paymentHistory,
                                val.amountHistory,
                                val.totalAmount,
                                val.amountToBePaid,
                                val.amountPaid,
                                val.initialAmount
                              )
                            }
                          >
                            PAYMENT HISTORY
                          </button>
                        </div>
                        </div> 
                
                {interest && (<>
                {individualShow === val._id && (
                  <>
                  <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Interest Calculator</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Principal Amount</FormLabel>
              <Input ref={initialRef} value={val.totalAmount} disabled />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Amount To Be Paid</FormLabel>
              <Input value={val.amountToBePaid} disabled />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Interest Rate <span className="italic text-zinc-500 text-sm">(in percentage)</span></FormLabel>
              <Input value={inputInterest} onChange={(e) => setInputInterest(e.target.value)} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Month</FormLabel>
              <Input value={month} onChange={(e) => setMonth(e.target.value)} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Interest Amount</FormLabel>
              <Input value={calculateInterest} placeholder='Amount will display here' disabled />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Total Amount</FormLabel>
              <Input value={calculateTotal} placeholder='Total Amount will display here' disabled />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={(e) => calculate(e,val.amountToBePaid)}>
              Calculate
            </Button>
            <Button onClick={onClose}>Back</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
                  </>
                )}              
      </>)}
            </div> 
            </Tilt>            
        )        
      })}      

      {modal && <>
        <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Delete Record?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure, you want to delete the record. <span className="font-bold">This change is permanent and you will not get this <br /> record back.</span>
          </AlertDialogBody>
          <AlertDialogFooter>
          <button ref={cancelRef} onClick={onClose} className='bg-white border rounded-lg text-green-500 drop-shadow-2xl w-16 h-9 font-semibold text-lg flex justify-center items-center hover:text-white hover:bg-green-500 mr-5 hover:shadow-4xl hover:shadow-white hover:transition-all hover:duration-300'>NO</button>          
          <button onClick={(e) => deleteData(e,storeId)} className='bg-white border rounded-lg text-red-500 drop-shadow-2xl w-16 h-9 font-semibold text-lg flex justify-center items-center hover:text-white hover:bg-red-500 hover:shadow-4xl hover:shadow-white hover:transition-all hover:duration-300'>YES</button>    
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      </>}
      </div>
      <br /><br /><br />
        </>
      )}      

      {showNoRecord && (
        <>
        <div>
            <div className="flex justify-center items-center flex-col">
              <img src={nodata} alt="" className="w-1/5 h-1/5 opacity-40 -mt-16" />              
              <h1 className="text-lg text-center font-bold mt-4 text-blue-500">No Records Found !! <br />Try searching using other name</h1>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Search;
