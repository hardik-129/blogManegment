import React from 'react'

function CategoryAdd({ addData, Add, children}) {
          if (!addData) return null;

  return (
    <div>
       <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center '>
             <div className='w-[600px]'>
               
 
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

export default CategoryAdd
