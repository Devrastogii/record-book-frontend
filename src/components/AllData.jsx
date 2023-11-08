import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Tilt from 'react-parallax-tilt'
import { motion } from "framer-motion";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  AlertDialogCloseButton,
} from "@chakra-ui/react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";

import nodata from '../images/noData.png'

const AllData = () => {
  const [storeData, setStoreData] = useState([]);
  const [modal, setModal] = useState(false);
  const [storeId, setStoreId] = useState("");
  const [interest, setInterest] = useState(false);
  const [month, setMonth] = useState("");
  const [individualShow, setIndividualShow] = useState("");
  const [inputInterest, setInputInterest] = useState("");
  const [calculateInterest, setCalculateInterest] = useState("");
  const [calculateTotal, setCalculateTotal] = useState("");
  
  const [isEmpty, setIsEmpty] = useState(false);

  const [head, setHead] = useState("")

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const navigate = useNavigate();

  let sum = 0;

  useEffect(() => {
    async function getData() {
      const token = await axios.get('/login-token');      
      // console.log(token.data[0].token);  
      if(token.data !== ""){
        const response = await axios.post("/get-all-records");
        if (response.data.length !== 0) {
          setStoreData(response.data);
          setIsEmpty(false);
          setHead("GET ALL ENTRIES")         
        } else {
          setIsEmpty(true);
          setHead("");
        }
      }

      else {
        navigate('/login')
      }
      }          

    getData();   
  }, []);

  function showInterestBox(e, _id) {
    e.preventDefault();
    setInterest(true);
    setIndividualShow(_id);
    onOpen();
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

  function showModal(e, _id) {
    e.preventDefault();
    setModal(true);
    setStoreId(_id);
    onOpen();
  }

  async function deleteData(e, _id) {
    e.preventDefault();
    const { data } = await axios.post("/delete-record", { _id });
    setStoreData(data);
    setModal(false);
  }

  function calculate(e, amount) {
    e.preventDefault();
    const rate = amount * inputInterest / 100;
    const formula = amount + rate*month;
    setCalculateInterest(formula - amount);
    setCalculateTotal(formula);
  }

  return (
    <>

    {!isEmpty && (
      <>
      <motion.div animate={{opacity: 1}} initial={{opacity: 0}} transition={{duration: 1.5}} className="flex justify-center font-bold text-2xl mt-10 text-indigo-600">
        {head}
      </motion.div>

      <motion.div animate={{opacity: 1}} initial={{opacity: 0}} transition={{duration: 1.5}} className="flex gap-x-3 gap-y-8 mt-10 flex-wrap justify-center">
        {storeData !== null &&
          storeData.map((val, index) => {
            return (
              <Tilt>
              <motion.div
                className="border border-gray-400 py-2 px-4 hover:-translate-y-4 hover:transition-all hover:duration-500 hover:shadow-xl hover:shadow-blue-200 hover:border-gray-200"
                key={index}
                id={index}
                initial={{opacity: 0, translateX: -100}}
                animate={{opacity: 1, translateX: 0}}
                transition={{duration: 0.6, delay:index*0.5}}
              >
                <div>
                  <span className="font-semibold">Name:</span> {val.name}
                </div>
                <div>
                  <span className="font-semibold">Address:</span> {val.address}
                </div>
                <div>
                  <span className="font-semibold">Phone Number: </span>
                  {val.phone}
                </div>
                <div>
                  <span className="font-semibold">Item: </span>
                  {val.itemName}
                </div>
                <div>
                  <span className="font-semibold">Total Amount: </span>
                  {val.totalAmount}
                </div>
                <div>
                  <span className="font-semibold">Amount Paid: </span>
                  {val.amountPaid}
                </div>
                <div>
                  <span className="font-semibold">Amount Left: </span>
                  {val.totalAmount - val.amountPaid}
                </div>
                <div>
                  <span className="font-semibold">Date of Purchase: </span>
                  {val.dateOfPurchase}
                </div>
                <div>
                  <span className="font-semibold">Date of Payment: </span>
                  {val.dateOfPayment}
                </div>
                <div className="flex flex-row gap-6 justify-between px-5 mt-4 mb-3">
                  <div>
                    <Link
                      to={"/update/" + val._id}
                      className="bg-white border rounded-lg text-green-500 drop-shadow-2xl w-24 h-9 font-semibold text-lg flex justify-center items-center hover:text-white hover:bg-gradient-to-r from-green-600 to-green-500 hover:shadow-4xl hover:shadow-white hover:-translate-y-1 hover:transition-all hover:duration-300"
                    >
                      UPDATE
                    </Link>
                  </div>
                  <div>
                    <button
                      className="bg-white border rounded-lg text-red-600 drop-shadow-2xl w-24 h-9 font-semibold text-lg flex justify-center items-center hover:text-white hover:bg-gradient-to-r from-red-500 to-red-600 hover:shadow-4xl hover:shadow-white hover:-translate-y-1 hover:transition-all hover:duration-300"
                      onClick={(e) => showModal(e, val._id)}
                    >
                      DELETE
                    </button>
                  </div>
                </div>{" "}                
         
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
                                

                {interest && (
                  <>
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
                                <Input
                                  ref={initialRef}
                                  value={val.totalAmount}
                                  disabled
                                />
                              </FormControl>

                              <FormControl mt={4}>
                                <FormLabel>Amount To Be Paid</FormLabel>
                                <Input value={val.amountToBePaid} disabled />
                              </FormControl>

                              <FormControl mt={4}>
                                <FormLabel>
                                  Interest Rate{" "}
                                  <span className="italic text-zinc-500 text-sm">
                                    (in percentage)
                                  </span>
                                </FormLabel>
                                <Input
                                  value={inputInterest}
                                  onChange={(e) =>
                                    setInputInterest(e.target.value)
                                  }
                                />
                              </FormControl>

                              <FormControl mt={4}>
                                <FormLabel>Month</FormLabel>
                                <Input
                                  value={month}
                                  onChange={(e) => setMonth(e.target.value)}
                                />
                              </FormControl>

                              <FormControl mt={4}>
                                <FormLabel>Interest Amount</FormLabel>
                                <Input
                                  value={calculateInterest}
                                  placeholder="Amount will display here"
                                  disabled
                                />
                              </FormControl>

                              <FormControl mt={4}>
                                <FormLabel>Total Amount</FormLabel>
                                <Input
                                  value={calculateTotal}
                                  placeholder="Total Amount will display here"
                                  disabled
                                />
                              </FormControl>
                            </ModalBody>

                            <ModalFooter>
                              <Button
                                colorScheme="blue"
                                mr={3}
                                onClick={(e) =>
                                  calculate(e, val.amountToBePaid)
                                }
                              >
                                Calculate
                              </Button>
                              <Button onClick={onClose}>Back</Button>
                            </ModalFooter>
                          </ModalContent>
                        </Modal>
                      </>
                    )}
                  </>
                )}
              </motion.div>
              </Tilt>
            );
          })}

        {modal && (
          <>
            <AlertDialog
              motionPreset="slideInBottom"
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
                  Are you sure, you want to delete the record.{" "}
                  <span className="font-bold">
                    This change is permanent and you will not get this <br />{" "}
                    record back.
                  </span>
                </AlertDialogBody>
                <AlertDialogFooter>
                  <button
                    ref={cancelRef}
                    onClick={onClose}
                    className="bg-white border rounded-lg text-green-500 drop-shadow-2xl w-16 h-9 font-semibold text-lg flex justify-center items-center hover:text-white hover:bg-green-500 mr-5 hover:shadow-4xl hover:shadow-white hover:transition-all hover:duration-300"
                  >
                    NO
                  </button>
                  <button
                    onClick={(e) => deleteData(e, storeId)}
                    className="bg-white border rounded-lg text-red-500 drop-shadow-2xl w-16 h-9 font-semibold text-lg flex justify-center items-center hover:text-white hover:bg-red-500 hover:shadow-4xl hover:shadow-white hover:transition-all hover:duration-300"
                  >
                    YES
                  </button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </>
        )}
      </motion.div>
      
      <div className="flex flex-row gap-5 justify-center mt-4">
        <Link
        to={'/add-new-user'}
          className="bg-white border border-blue-500 text-blue-500 shadow-xl shadow-blue-100 w-60 h-12 font-semibold text-lg flex justify-center items-center hover:text-white hover:bg-gradient-to-r from-cyan-500 to-blue-500 hover:shadow-4xl hover:shadow-white hover:-translate-y-1 hover:transition-all hover:duration-300 mt-4 cursor-pointer"
        >
           ADD NEW CUSTOMER
        </Link>
        <Link
        to={'/search'}
          className="bg-white border border-blue-500 text-blue-500 shadow-xl shadow-blue-100 w-60 h-12 font-semibold text-lg flex justify-center items-center hover:text-white hover:bg-gradient-to-r from-cyan-500 to-blue-500 hover:shadow-4xl hover:shadow-white hover:-translate-y-1 hover:transition-all hover:duration-300 mt-4 cursor-pointer"
        >
           SEARCH ENTRY
        </Link>
        <Link
        to={'/summary'}
          className="bg-white border border-blue-500 text-blue-500 shadow-xl shadow-blue-100 w-60 h-12 font-semibold text-lg flex justify-center items-center hover:text-white hover:bg-gradient-to-r from-cyan-500 to-blue-500 hover:shadow-4xl hover:shadow-white hover:-translate-y-1 hover:transition-all hover:duration-300 mt-4 cursor-pointer"
        >
           SUMMARY
        </Link>
      </div>
      </>
    )}      

      {/* If array is empty */}

      {isEmpty && (
        <>
          <div>
            <div className="flex justify-center items-center flex-col">
              <h1 className="text-3xl font-bold -mt-12 text-blue-500">No Records Added !!</h1>
              <img src={nodata} alt="" className="w-2/6 h-2/6 opacity-40 mt-8" />
              <div>
                    <Link to={'/add-new-user'} className='bg-white border border-blue-500 text-blue-500 shadow-xl shadow-blue-100 w-60 h-12 font-semibold text-lg flex justify-center items-center hover:text-white hover:bg-gradient-to-r from-cyan-500 to-blue-500 hover:shadow-4xl hover:shadow-white hover:-translate-y-1 hover:transition-all hover:duration-300 mt-4'>ADD NEW CUSTOMER</Link>
                </div>
            </div>
          </div>
        </>
      )}             

      <br />
    </>
  );
};

export default AllData;
