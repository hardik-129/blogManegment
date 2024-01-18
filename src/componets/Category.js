import React, { useEffect, useState } from 'react'
import Http from '../Http'
import CategoryAdd from './CategoryAdd';
import axios from 'axios'
import Swal from 'sweetalert2'


const url = (process.env.REACT_APP_API_KEY);

function Category() {

  const [user, setUser] = useState()
  const [category, setCategory] = useState(false)
  const [input, setInput] = useState({})
  const [image, setImage] = useState(null)
  const [Toggle, setToggle] = useState(true)


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


  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setInput(values => ({ ...values, [name]: value }))
  }

  const handleImageFile = (event) => {
    setImage(event.target.files[0])
  }



  const handleSubmit = (e) => {


    const data = new FormData();
    data.append("image", image)
    data.append("name", input.name)
    // alert()
    e.preventDefault()
    setInput();


    const token = localStorage.getItem('token')

    axios.post("https://blog-api-dev.octalinfotech.com/api/categories/store", data, { headers: { "Authorization": `Bearer ${token}` } })
      // Http.callApi('post', url +'categories/store')
      .then((response) => {

        let users = response.data.data.data


        console.log(users);
        setUser(users)
        setCategory()
        User();

        Toast.fire({
          icon: "success",
          title: response.data.message
        
        });

      }).catch((error) => {
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

        Http.callApi('delete', url + `categories/${id}/delete`)

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
    Http.callApi('get', url + `categories/${id}/show`)
      .then((res) => {
        let users = res.data.data;
        console.log(users);
        setInput(users)

        setCategory(true)
        User();

      })

    setToggle(false);
  }

  const updateCategory = (event) => {
    event.preventDefault();

    const data = new FormData();
    data.append("image", image)
    data.append("name", input.name)

    setInput("");
    const token = localStorage.getItem('token')
    axios.post(`https://blog-api-dev.octalinfotech.com/api/categories/${input.id}/update`, data,
      { headers: { "Authorization": `Bearer ${token}` } })

      .then((res) => {
        let users = res.data.data.data;
        setCategory(false)
        Toast.fire({
          icon: "success",
          title: res.data.message
        
        });
        setUser(users)
       User();
      }).catch((error) => {
        console.log(error);
      })
   setToggle(false);
  }

  function User() {

    Http.callApi('get', url + 'categories')
      .then((response) => {

        let users = response.data.data.data

        setUser(users)
        // console.log(users);

      })
      .catch((error) => {
        console.log(error);
      })

  }



  useEffect(() => {
    User();
  }, [])


  const setModal=()=>{
    setCategory(false);
    setToggle(true);
    setInput('')
  }

  return (
    <>

      <div className='flex justify-end m-6'>
      
        <button className='text-white text-xl  bg-green-600 -400-700 hover:bg-slate-700  focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded  px-5 py-2.5 text-center me-2 mb-2' onClick={() => setCategory(true)}>ADD CATEGORY + </button>
      </div>

      <div>
        <CategoryAdd addData={category} Add={() => setCategory(false)}>

          <div>
            <form onSubmit={handleSubmit}>
              <div className='p-7'>
                <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name :</label>
                <input onChange={handleChange} value={input?.name || ""} type="text" name="name" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Name" required />
              </div>

              <div className='p-7'>
                <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Add Image :</label>
                <input type="file" onChange={handleImageFile} value={image?.image} name="" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" />
              </div>
              <div className='flex justify-center'>
                <div>
                  <button onClick={setModal} className='text-white text-xl  bg-slate-700 hover:bg-green-700  focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded  px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'>cancel</button>
                </div>
                <div>
                  {
                    Toggle ?
                    <button className='text-white text-xl  bg-green-700 hover:bg-slate-700  focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded  px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'>Add</button>
                   : <button onClick={updateCategory} className='text-white text-xl  bg-green-700 hover:bg-slate-700  focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded  px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'>Update</button>

                  }
                </div>

              </div>

            </form>
          </div>

        </CategoryAdd>
        <div className="flex flex-col mx-96 border-4 shadow-xl font-mono">
          <div className="overflow-x-auto sm:-mx-6">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-center text-sm font-light">
                  <thead className="border-b font-medium dark:border-neutral-500">
                    <tr>
                      <th scope="col" className="px-6 py-2">ID</th>
                      <th scope="col" className="px-6 py-2">Image</th>
                      <th scope="col" className="px-6 py-2">Name</th>
                      <th scope="col" className="px-6 py-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {user?.map((data, index) => (
                      <tr className="border-b dark:border-neutral-500 ">
                        <td className="whitespace-nowrap px-6 py-2 font-medium">{index + 1}</td>
                        <td className="whitespace-nowrap px-6 py-2 w-9"><img src={data.image} alt="" /></td>
                        <td className="whitespace-nowrap px-6 py-2">{data.name}</td>
                        <div className='flex items-center text-center mt-4 justify-center space-x-7 '>
                          <div >
                         <td>
                         <i onClick={() => showButton(data.id)}  className="fa-solid fa-pen-to-square text-green-700 hover:text-slate-700 text-2xl"></i>
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
              </div>
            </div>
          </div>
        </div>




      </div>
    </>
  )
}

export default Category