import { useState, useEffect } from 'react';
import {NavLink, Link } from 'react-router-dom';
import auth from '../utils/auth';


const Navbar = () => {
  // State to track the login status
  const [loginCheck, setLoginCheck] = useState(false);

  // Function to check if the user is logged in using auth.loggedIn() method
  const checkLogin = () => {
    if (auth.loggedIn()) {
      setLoginCheck(true);  // Set loginCheck to true if user is logged in
    }
  };

  // useEffect hook to run checkLogin() on component mount and when loginCheck state changes
  useEffect(() => {
    checkLogin();  // Call checkLogin() function to update loginCheck state
  }, [loginCheck]);  // Dependency array ensures useEffect runs when loginCheck changes

  return (
    <div className="display-flex justify-space-between align-center py-2 px-5 mint-red">
      <h1>
        RestStar Restauraunt
      </h1>
      <div>
        {
          // Conditional rendering based on loginCheck state
          !loginCheck ? (
            // Render login button if user is not logged in
            <button className="btn" type='button'>
              <Link to='/login'>Login</Link>
            </button>
          ) : (
            // Render logout button if user is logged in
            
            <div className="nav">
              <div className="nav-item">
                <NavLink to="/" className={({ isActive }) => (isActive ? 'active nav-link' : 'nav-link')}>Home</NavLink>
              
              </div>
              <div className="nav-item">
                <NavLink to="/invoices" className={({ isActive }) => (isActive ? 'active nav-link' : 'nav-link')}>Invoices</NavLink>
              
              </div>
            
              <button className="btn" type='button' onClick={() => {
                auth.logout();  // Call logout() method from auth utility on button click
              }}>Logout</button>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Navbar;
