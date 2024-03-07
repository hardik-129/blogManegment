import React from 'react'

function AddBlog({ children}) {
         //  if (!addData) return null;
  return (
    <div>
       <div className='fixed inset-0 bg-black bg-opacity-25  flex justify-center items-center '>
             <div className='w-[80%] h-[80%]'>
               
 
                <div className='bg-white p-3 rounded-2xl'>
                   {children}
 
                 
                </div>
             </div>
          </div>
          <input type="checkbox" className='peer fixed appearance-none opacity-0' />
 
          <label for="tw-modal"></label>
    </div>
  )
}

export default AddBlog
