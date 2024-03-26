import React, { useEffect, useState } from 'react'
import Http from '../Http'
import Swal from 'sweetalert2'
import axios from 'axios'
import CategoryAdd from './CategoryAdd';
import Pagination from './Pagination';





const url = (process.env.REACT_APP_API_KEY);


function Tags() {

  const [user, setUser] = useState()
  const [input, setInput] = useState({})
  const [category, setOpenModal] = useState(false)
  const [Toggle, setToggle] = useState(true)
  const [TitleSearchFilter, setTitleSearchFilter] = useState('');






  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });


  const handleSubmit = (e) => {


    const data = new FormData();
    data.append("name", input.name)
    data.append("email", input.email)
    data.append("password", input.password)
    // alert()
    e.preventDefault()
    setInput();


    const token = localStorage.getItem('token')

    axios.post("https://blog-api-dev.octalinfotech.com/api/tages/store", data, { headers: { "Authorization": `Bearer ${token}` } })
      // Http.callApi('post', url +'categories/store')
      .then((response) => {

        let users = response.data.data.data


        console.log(users);
        setUser(users)
        setOpenModal()
        User();

        Toast.fire({
          icon: "success",
          title: response.data.message
        
        });

      }).catch((error) => {
        console.log(error);
      })


  }

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setInput(values => ({ ...values, [name]: value }))
  }

  function User(TitleSearchFilter='') {
    Http.callApi('get', url + `tages?search=${TitleSearchFilter}`)
      .then((response) => {

        let users = response.data.data

        setUser(users)
        // console.log(users);


      })
      .catch((error) => {
        console.log(error);
      })

  }

  const btnDelete = (id) => {
    console.log(id);
    setInput("");

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {

        Http.callApi('delete', url + `tages/${id}/delete`)

          .then((res) => {
            console.log(res);
            Toast.fire({
              icon: "success",
              title: res.data.message
            });
            User();

          }).catch((error) => {
            console.log(error);
          })
      }
    });
  }

  const showButton = (id) => {

    console.log(id);
    setInput("");
    Http.callApi('get', url + `tages/${id}/show`)
      .then((res) => {
        let users = res.data.data;
        console.log(users);
        setInput(users)

        setOpenModal(true)
        User();

      })

    setToggle(false);
  }


  const updateUser = (event) => {
    event.preventDefault();

    const data = new FormData();
    data.append("name", input.name)

    setInput("");
    const token = localStorage.getItem('token')
    axios.post(`https://blog-api-dev.octalinfotech.com/api/tages/${input.id}/update`, data,
      { headers: { "Authorization": `Bearer ${token}` } })

      .then((res) => {
        let users = res.data.data.data;
        setOpenModal(false)
        Toast.fire({
          icon: "success",
          title: res.data.message
        
        });
        setUser(users);
        setToggle(true);

       User();
      }).catch((error) => {
        console.log(error);
      })
  }

  const setModal=()=>{
    setOpenModal(false);
    setToggle(true);
    setInput('')
  }


  const SearchFilter = (event) => {
    setTitleSearchFilter(event.target.value)

  }

  useEffect(() => {
    User(TitleSearchFilter);
  }, [TitleSearchFilter])

  return (
    <div>

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

<div className='flex justify-end m-6'>
      
      <button className='text-white text-xl  bg-black -400-700 hover:bg-slate-700  focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded  px-5 py-2.5 text-center me-2 mb-2' onClick={() => setOpenModal(true)}>ADD TAGS + </button>
    </div>

<CategoryAdd addData={category} Add={() => setOpenModal(false)}>

<h1 className='text-2xl text-center font-bold'>Tag</h1>


<div>
  <form onSubmit={handleSubmit}>
    <div className='p-7'>
      <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name :</label>
      <input onChange={handleChange} value={input?.name || ""} type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Name" required />
    </div>
   
    <div className='flex justify-center'>
      <div>
        <button onClick={setModal} className='text-white text-xl  bg-slate-700 hover:bg-green-700  focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded  px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'>cancel</button>
      </div>
      <div>
        {
          Toggle ?
          <button className='text-white text-xl  bg-green-700 hover:bg-slate-700  focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded  px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'>Add</button>
         : <button onClick={updateUser} className='text-white text-xl  bg-green-700 hover:bg-slate-700  focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded  px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'>Update</button>

        }
      </div>

    </div>

  </form>
</div>

</CategoryAdd>


       <div className="flex flex-col mx-96 border shadow-xl font-mono">
          <div className="overflow-x-auto sm:-mx-6">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-center text-sm font-light">
                  <thead className="border-b font-medium dark:border-neutral-500">
                    <tr>
                      <th scope="col" className="px-6 py-2">ID</th>
                      <th scope="col" className="px-6 py-2">Name</th>
                      <th scope="col" className="px-6 py-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {user?.data?.map((data, index) => (
                      <tr className="border-b dark:border-neutral-500 ">
                        <td className="whitespace-nowrap px-6 py-2 font-medium">{index + 1}</td>
                        <td className="whitespace-nowrap px-6 py-2">{data.name}</td>
                        <div className='flex items-center text-center mt-4 justify-center space-x-7 '>
                          <div >
                         <td>
                         <i onClick={() => showButton(data.id)}   className="fa-solid fa-pen-to-square text-black hover:text-slate-700 text-2xl"></i>
                         </td>
                            {/* <td><button onClick={() => showButton(data.id)} className='text-white text-xl  bg-green-600 -400-700 hover:bg-slate-700  focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded  px-6 py-2 text-center me-2 mb-2'>Edit</button></td> */}
                          </div>
                          <div className='flex justify-center items-center'>
                         
                          <td>
                         <i onClick={() => btnDelete(data.id)} className="fa-solid fa-trash text-red-700 text-2xl hover:text-slate-700"></i>
                         </td>
                            {/* <td><button onClick={() => btnDelete(data.id)} className='text-white text-xl  bg-red-600  hover:bg-slate-700  focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded  px-6 py-2 text-center me-2 mb-2'><i className="fa-solid fa-trash"></i></button></td> */}
                          </div>
                        </div>
                      </tr>
                    )
                    )}
                  </tbody>
                </table>
                <div>
                <Pagination links={user?.links} setUser={setUser} />
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Tags
