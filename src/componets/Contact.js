import React, { useEffect, useState } from 'react'
import Http from '../Http'
import Pagination from '../componets/Paginetion';



const url = (process.env.REACT_APP_API_KEY);



function Contact() {

  const [user, setUser] = useState()
  const [TitleSearchFilter, setTitleSearchFilter] = useState('');



          
  function contact(TitleSearchFilter='') {

            Http.callApi('get', url + `contact-us/index?search=${TitleSearchFilter}`) 
            .then((response) => {
      
              let users = response.data.data.data
      
              setUser(users)
              // console.log(users);
      
            })
            .catch((error) => {
              console.log(error);
            })
      
        }

        const SearchFilter = (event) => {
          setTitleSearchFilter(event.target.value)
      
        }
      
      
      
        useEffect(() => {
          contact(TitleSearchFilter);
        }, [TitleSearchFilter])
  return (

    <>
    
    <form class="flex items-center absolute left-96 mt-3 ">   
    <label for="voice-search" class="sr-only">Search</label>
    <div class="relative w-full ">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 21">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.15 5.6h.01m3.337 1.913h.01m-6.979 0h.01M5.541 11h.01M15 15h2.706a1.957 1.957 0 0 0 1.883-1.325A9 9 0 1 0 2.043 11.89 9.1 9.1 0 0 0 7.2 19.1a8.62 8.62 0 0 0 3.769.9A2.013 2.013 0 0 0 13 18v-.857A2.034 2.034 0 0 1 15 15Z"/>
            </svg>
        </div>
        <input onChange={SearchFilter} type="text" id="voice-search" class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Search Title' required/>
        <button type="button" class="absolute inset-y-0 end-0 flex items-center pe-3">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7v3a5.006 5.006 0 0 1-5 5H6a5.006 5.006 0 0 1-5-5V7m7 9v3m-3 0h6M7 1h2a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3Z"/>
            </svg>
        </button>
    </div>
   
</form>
    <div >
          
          
      <div className="flex flex-col mx-96 border shadow-xl font-mono mt-[8%] mr-36">
          <div className="overflow-x-auto sm:-mx-6">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-center text-sm font-light">
                  <thead className="border-b font-medium dark:border-neutral-500">
                    <tr>
                      <th scope="col" className="px-6 py-2">ID</th>
                      <th scope="col" className="px-6 py-2">Name</th>
                      <th scope="col" className="px-6 py-2">Email</th>
                      <th scope="col" className="px-6 py-2">Message</th>
                    </tr>
                  </thead>
                  <tbody>
                    {user?.map((data, index) => (
                      <tr className="border-b dark:border-neutral-500 ">
                        <td className="whitespace-nowrap px-6 py-2 font-medium">{index + 1}</td>
                        <td className="whitespace-nowrap px-6 py-2">{data.name}</td>
                        <td className="whitespace-nowrap px-6 py-2">{data.email}</td>
                        <td className="whitespace-nowrap px-6 py-2">{data.message}</td>
                        <div className='flex items-center text-center mt-4 justify-center space-x-7 '>
                         
                        </div>
                      </tr>
                    )
                    )}
                  </tbody>
                </table>
                <div>
                </div>
                <div className='absolute right-6'>
                <Pagination  links={user?.links} setUser={setUser} />
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
    </>
  )
}

export default Contact
