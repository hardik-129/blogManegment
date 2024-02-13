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
    <div >

     <div className='md:text-wrap max-md:hidden '>
     <ul className='   items-center bg-white shadow-2xl font-bold'>
        <li >  <NavLink to="/admin/login" ></NavLink></li>
        <li >   <NavLink to="/" ></NavLink></li>
        <li className='hover:bg-zinc-500 active:underline rounded-lg py-2  hover:text-white my-3 border-solid border-0 border-indigo-0' ><NavLink to="/admin/dashbord" > <i class="text-red-800 mx-10 fa-solid fa-house"></i>  Dashbord</NavLink></li>
        <li className='hover:bg-zinc-500 rounded-lg py-2 hover:text-white my-3'><NavLink to="/admin/category" > <i class=" mx-10 text-green-800  fa-solid fa-bars"></i> Category</NavLink></li>
        <li className='hover:bg-zinc-500 rounded-lg  py-2 hover:text-white my-3'><NavLink to="/admin/user" ><i class="text-blue-800 mx-10 fa-solid fa-user"></i> User</NavLink></li>
        <li className='hover:bg-zinc-500 rounded-lg  py-2 hover:text-white my-3'><NavLink to="/admin/tag" ><i class="text-yellow-700 mx-10 fa-solid fa-tag"></i> Tags</NavLink></li>
        <li className='hover:bg-zinc-500 rounded-lg py-2 hover:text-white my-3'><NavLink to="/admin/blog" ><i class="mx-10 text-purple-950 fa-solid fa-circle-user"></i> Blog</NavLink></li>
        <li className='hover:bg-zinc-500 rounded-lg py-2 hover:text-white my-3'><NavLink to="/admin/contact" ><i class=" mx-10 fa-regular fa-address-book text-pink-950"></i> Contact</NavLink></li>

      </ul>

     </div>
      <div className='footer-logo com-logo' style={{ display: "flex", justifyContent: 'space-between',  textAlign: "center" }}>
        <div style={{ display: 'flex', alignItems: 'center' }} >
          <img className='octal-logo ' src="https://octalinfotech.com/img/octal-logo.png" alt="" />
          <span className='com-name md:w-1/7 '>Octal Infotech</span>
        </div>
        <div className='lg:hidden flex items-center justify-center'>
        <ion-icon name="grid-outline"></ion-icon>
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