import React, { useEffect, useState } from "react";
import { Avatar, Wrap, WrapItem } from "@chakra-ui/react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Account = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [show, setShow] = useState(false);
  const [disable, setDisable] = useState(true);
  const [edit, setEdit] = useState("EDIT");

  const [id, setid] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      const tokenDoc = await axios.get("/login-token");

      if (tokenDoc.data !== "") {
        setName(tokenDoc.data[0].name);
        setPhone(tokenDoc.data[0].phone);
        setEmail(tokenDoc.data[0].email);
        setid(tokenDoc.data[0]._id);
        setShow(true);

      } else {
        navigate("/login");
      }
    }

    getData();
  }, []);

  async function editDetails(e) {
    e.preventDefault();
  }

  async function editBtn(e) {
    e.preventDefault();
    setDisable(!disable);
    setEdit("SAVE");
    await axios.put("/update-user-details", { id, name, phone, email });
  }

  return (
    <>
      {show && (
        <>
          <div className="flex flex-col justify-center w-full items-center mt-1">
            <form onSubmit={editDetails} className="w-1/2">
              <div className="mt-6 border-t-4 border-t-blue-500 border-b-4 border-b-blue-500 w-full shadow-lg shadow-indigo-200">
                <div className="flex flex-col justify-center items-center mt-5">
                  <Wrap>
                    <WrapItem>
                      <Avatar
                        size="2xl"
                        name="Kola Tioluwani"
                        src="https://bit.ly/tioluwani-kolawole"
                      />{" "}
                    </WrapItem>
                  </Wrap>
                </div>
                <div className="mt-3 font-semibold text-center">{name}</div>

                <div className="flex lg:flex-row gap-5 justify-center mt-6 md:flex-col sm:flex-col items-center xs:flex-col">
                  <div>
                    <label className="text-black">Name:</label> <br />
                    <input
                      type="text"
                      className="border border-gray-200 mt-2 outline-blue-500 pl-2 text-gray-500 rounded-md h-8"
                      disabled={disable}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-black">Phone Number:</label> <br />
                    <input
                      type="number"
                      className="border border-gray-200 mt-2 outline-blue-500 pl-2 text-gray-500 rounded-md h-8"
                      disabled={disable}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex lg:flex-row gap-5 lg:ml-28 mt-6 md:flex-col sm:flex-col items-center xs:flex-col">
                  <div className="lg:ml-2">
                    <label className="text-black">Email:</label> <br />
                    <input
                      type="email"
                      className="border border-gray-200 mt-2 outline-blue-500 pl-2 text-gray-500 rounded-md h-8"
                      disabled={disable}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div></div>
                </div>

                <div className="flex justify-end mr-32 mb-4">
                  <button
                    className="bg-white border border-blue-500 text-blue-500 w-24 h-8 font-semibold text-lg flex justify-center items-center hover:text-white hover:bg-blue-500 hover:-translate-y-1 hover:transition-all hover:duration-300"
                    onClick={editBtn}
                  >
                    {edit}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default Account;
