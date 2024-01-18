import React, { useEffect } from 'react'
import "./Navbar.css"
import { NavLink, Outlet  } from 'react-router-dom'
import Dropdown from './Dropdown';
import Http from '../Http';

function Navbar() {
  let token = localStorage.getItem("token");

  useEffect(() => {
    Http.setBearerToken(token)
  }, [] );


  return (
    <div>

      <ul className='items-center text-center  bg-white shadow-2xl font-bold'>
        <li ><NavLink to="/login" ></NavLink></li>
        <li ><NavLink to="/" ></NavLink></li>
        <li className='hover:bg-zinc-500 rounded-lg py-2  hover:text-white my-3 border-solid border-0 border-indigo-0' ><NavLink to="/dashbord" >Dashbord</NavLink></li>
        <li className='hover:bg-zinc-500 rounded-lg py-2 hover:text-white my-3'><NavLink to="/category" > Category</NavLink></li>
        <li className='hover:bg-zinc-500 rounded-lg  py-2 hover:text-white my-3'><NavLink to="/user" >User</NavLink></li>
        <li className='hover:bg-zinc-500 rounded-lg  py-2 hover:text-white my-3'><NavLink to="/tag" >Tags</NavLink></li>
        <li className='hover:bg-zinc-500 rounded-lg py-2 hover:text-white my-3'><NavLink to="/blog" >Blog</NavLink></li>

      </ul>

      <div className='footer-logo ' style={{ display: "flex", justifyContent: 'space-between',  textAlign: "center" }}>
        <div style={{ display: 'flex', alignItems: 'center' }} >
          <img className='octal-logo ' src="https://octalinfotech.com/img/octal-logo.png" alt="" />
          <span className='com-name '>Octal Infotech</span>
        </div>
        <div>
          <Dropdown/>
        </div>
      </div>
<Outlet />
    </div>

  )
}

export default Navbar;