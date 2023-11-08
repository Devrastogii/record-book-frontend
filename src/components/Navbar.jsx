import React from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  Button,
} from '@chakra-ui/react'
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {

  const navigate = useNavigate();

  async function logout(){
    await axios.get('/logout');
    navigate('/login');
  }

  return (
    <>
      <div className="w-full flex justify-between items-center bg-blue-500 h-20 flex-row p-8">
        <div className="flex flex-row gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="32"
            fill="currentColor"
            class="bi bi-clipboard-data"
            viewBox="0 0 16 16"
            className="text-white"
          >
            <path d="M4 11a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0v-1zm6-4a1 1 0 1 1 2 0v5a1 1 0 1 1-2 0V7zM7 9a1 1 0 0 1 2 0v3a1 1 0 1 1-2 0V9z" />
            <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
            <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
          </svg>
         <span className="text-2xl font-bold text-white italic">Recordify</span> 
        </div>
       <div>
       <Menu>
  <MenuButton as={Button}>
    Profile
  </MenuButton>
  <MenuList>
    <MenuGroup>
      <MenuItem><Link to={'/account'}>My Account</Link></MenuItem>
      <MenuItem><button onClick={logout}>Logout</button></MenuItem>
    </MenuGroup>
    {/* <MenuDivider /> */}
    {/* <MenuGroup title='Help'>
      <MenuItem>Docs</MenuItem>
      <MenuItem>FAQ</MenuItem>
    </MenuGroup> */}
  </MenuList>
</Menu>
       </div>
      </div>
    </>
  );
};

export default Navbar;
