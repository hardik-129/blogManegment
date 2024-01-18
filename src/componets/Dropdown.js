import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Profile from './Profile';
import ChengePass from './ChengePass';

function Dropdown() {

  const [showModal, setShowModal] = useState(false)
  const [password, setPassword] = useState(false)

	const navigate = useNavigate();
  
  

  const logout = () =>{
    localStorage.clear();
    console.log('logout')
    navigate("/login")    
  }

  

  const [open , setIsOpen] = useState()

  return (
    <>
    <div className='relative'>
      <button onClick={ () => setIsOpen((prev)=> !prev)}>
        {open}
    <img className='contect-img rounded ' src="	https://ims-api.octalinfotech.com/images/avatar.png" alt="" />
      </button>
   {open && (
    <div className='absolute right-0 w-48 border-2 p-3 list-none space-y-2 rounded-md shadow-md bg-white font-bold'>
    <li><button onClick={() => setShowModal(true)}>profile </button></li>
    <li><button onClick={() => setPassword(true)}>Chenge Password </button></li>
    <li><button onClick={logout} >Logout</button></li>

</div>
   )}

    </div>
    <Profile isVisiable= {showModal} onClose={() => setShowModal(false)}> 
   <div className='p-2'>
   <h2>Student Profile</h2>

   <div className='p-7'>
                        <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Student Name</label>
                        <input type="text" name="text" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Name" required/>
                    </div>

                    <div  className='p-7'>
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Student email</label>
                        <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required/>
                    </div> 

                    

   </div>
     </Profile>

     <ChengePass passVisiable={password} closePass={() => setPassword(false)}>

      <div>
     
                    <div className='py-3'>
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Old Password</label>
                        <input type="password" name="password" id="password" placeholder="Old Password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required/>
                    </div>

                    <div className='py-3'>
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New password</label>
                        <input type="password" name="password" id="password" placeholder=" Password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required/>
                    </div>

                    <div className='py-3'>
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Conform password</label>
                        <input type="password" name="password" id="password" placeholder="Conform Password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required/>
                    </div>
      </div>

     </ChengePass>
 </>
  )
}

export default Dropdown
