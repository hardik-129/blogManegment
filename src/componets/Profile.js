import React from 'react'

function Profile({ isVisiable, onClose, children }) {
   if (!isVisiable) return null;
   return (
      <div>
         <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center '>
            <div className='w-[600px]'>

               <div className='bg-white p-3 rounded'>
                  {children}

                  <div className='flex justify-end'>
                     <div>
                        <button className='text-white text-xl  bg-green-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-lg  px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 ' onClick={() => onClose()}>Save </button>
                     </div>
                     <div>
                        <button className='text-white text-xl  bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-lg  px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 ' onClick={() => onClose()}>Close </button>
                     </div>

                  </div>

               </div>
            </div>
         </div>
         <input type="checkbox" className='peer fixed appearance-none opacity-0' />

         <label for="tw-modal"></label>
      </div>
   )
}

export default Profile
