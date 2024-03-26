import React, { useEffect, useState } from 'react'
import "./Navbar.css"
import { NavLink, Outlet  } from 'react-router-dom'
import Dropdown from './Dropdown';
import Http from '../Http';

function Navbar() {

  let [manuStatus, setManuStatus] = useState(false);

  let token = localStorage.getItem("token");

  useEffect(() => {
    Http.setBearerToken(token)
  }, [] );


  return (
    <div >

     <div className="">
     <ul className='  items-center bg-white shadow-2xl font-bold'>

     <li >  <NavLink to="/admin/login" ></NavLink></li>
     <li >   <NavLink to="/" ></NavLink></li>

      <li className='hover:bg-zinc-500  rounded-lg py-2   my-3 border-solid border-0 border-indigo-0'><NavLink to="/admin/dashbord" ><i class="text-black hover:text-white  mx-10 fa-solid fa-house"><span className='pl-4'>Deshbord</span></i></NavLink></li>
      <li className='hover:bg-zinc-500  rounded-lg py-2  hover:text-white my-3 border-solid border-0 border-indigo-0'><NavLink to="/admin/category" ><i class=" hover:text-white mx-10 text-black    fa-solid fa-bars"><span className='pl-4'>Category</span></i></NavLink></li>
      <li className='hover:bg-zinc-500  rounded-lg py-2  hover:text-white my-3 border-solid border-0 border-indigo-0'><NavLink to="/admin/user" ><i class= "hover:text-white text-black   mx-10 fa-solid fa-user"><span className='pl-4'>User</span></i></NavLink></li>
      <li className='hover:bg-zinc-500  rounded-lg py-2  hover:text-white my-3 border-solid border-0 border-indigo-0'><NavLink to="/admin/tag" ><i class="hover:text-white text-black   mx-10 fa-solid fa-tag"><span className='pl-4'>Tags</span></i></NavLink></li>
      <li className='hover:bg-zinc-500  rounded-lg py-2  hover:text-white my-3 border-solid border-0 border-indigo-0'><NavLink to="/admin/blog" ><i class="hover:text-white mx-10 text-black   fa-solid fa-circle-user"><span className='pl-4'>Blog</span></i></NavLink></li>
      <li className='hover:bg-zinc-500  rounded-lg py-2  hover:text-white my-3 border-solid border-0 border-indigo-0'><NavLink to="/admin/contact" ><i class="hover:text-white mx-10 fa-regular fa-address-book text-black   font-bold"><span className='pl-4'>Contect</span></i></NavLink></li>        
      </ul>
     </div>
      <div className='footer-logo com-logo max-sm:w-[100%]' style={{ display: "flex", justifyContent: 'space-between',   textAlign: "center", background: "white" }}>
        <div style={{ display: 'flex', alignItems: 'center' }} >
          <img className='octal-logo max-sm:hidden  ' src="https://octalinfotech.com/img/octal-logo.png" alt="" />
          <span className='com-name text-wrap'>Octal Infotech</span>
        </div>
        <div className='lg:hidden flex items-center justify-center'>
        <button className='' onClick={()=>setManuStatus(!manuStatus)} ><ion-icon name="grid-outline"></ion-icon></button>
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