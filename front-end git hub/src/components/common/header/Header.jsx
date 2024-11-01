import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { MyContext } from "../../context/MyContext";
import "./header.css";
import { nav } from "../../data/Data";
import Usercard from "../../usercard/Usercard"; // Adjust path as needed

const Header = () => {
  const [navList, setNavList] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { loginStatus, setLoginStatus } = useContext(MyContext);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleLogout = () => {
    setLoginStatus(false);
    handleDrawerToggle(); 
  };

  return (
    <header>
      <div className='container flex'>
        <div className='logo'>
          <img src='./images/logo.png' alt='Logo' />
        </div>
        <div className='nav'>
          <ul className={navList ? "small" : "flex"}>
            {nav.map((list, index) => (
              <li key={index}>
                <Link to={list.path} onClick={() => setNavList(false)}>{list.text}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className='button flex'>
          {loginStatus && !drawerOpen && (
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleDrawerToggle}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          )}
          {loginStatus && (
            <Usercard open={drawerOpen} onClose={handleDrawerToggle} />
          )}
          {!loginStatus && (
            <Link to="/login">
              <button className='btn1'>Login</button>
            </Link>
          )}
        </div>
        <div className='toggle'>
          <button onClick={() => setNavList(!navList)}>
            {navList ? <i className='fa fa-times'></i> : <i className='fa fa-bars'></i>}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
