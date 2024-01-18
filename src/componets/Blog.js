import React, { useEffect, useState } from 'react'
import Http from '../Http'
import CategoryAdd from './CategoryAdd';
import axios from 'axios'
import Swal from 'sweetalert2'







const url = (process.env.REACT_APP_API_KEY);


function Blog() {

  const [user, setUser] = useState()
  const [category, setOpenModal] = useState(false)
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
   
  function blogs () {

    Http.callApi('get', url + 'blogs')
    .then((response) => {

      
      
      let users = response.data.data.data
      console.log(users);

      setUser(users)

    })
    .catch((error) => {
      console.log(error);
    })
     
  }

  useEffect(() => {
    blogs();
  }, [])


const handleSubmit = (e) => {


    const data = new FormData();
    data.append("image", image)
    data.append("name", input.name)
    data.append("name", input.title)
    data.append("name", input.slug)
    data.append("email", input.email)
    data.append("password", input.password)
    // alert()
    e.preventDefault()
    setInput();


    const token = localStorage.getItem('token')

    axios.post("https://blog-api-dev.octalinfotech.com/api/blogs/store", data, { headers: { "Authorization": `Bearer ${token}` } })
      // Http.callApi('post', url +'categories/store')
      .then((response) => {

        let users = response.data.data.data


        console.log(users);
        setUser(users)
        setOpenModal()
        blogs();

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


  const setModal=()=>{
    setOpenModal(false);
    setToggle(true);
    setInput('')
  }

  const handleImageFile = (event) => {
    setImage(event.target.files[0])
  }

  const updateUser = (event) => {
    event.preventDefault();

    const data = new FormData();
    data.append("image", image)
    data.append("name", input.name)
    data.append("email", input.email)
    data.append("password", input.password)

    setInput("");
    const token = localStorage.getItem('token')
    axios.post(`https://blog-api-dev.octalinfotech.com/api/blogs/${input.id}/update`, data,
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

        blogs();
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

        Http.callApi('delete', url + `blogs/${id}/delete`)

          .then((res) => {
            console.log(res);
            Toast.fire({
              icon: "success",
              title: res.data.message
            });
            blogs();

          }).catch((error) => {
            console.log(error);
          })
      }
    });
  }

  return (
    <>

<div className='flex justify-end m-6'>
      
      <button className='text-white text-xl  bg-green-600 -400-700 hover:bg-slate-700  focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded  px-5 py-2.5 text-center me-2 mb-2' onClick={() => setOpenModal(true)}>ADD Blog + </button>
    </div>

     <CategoryAdd addData={category} Add={() => setOpenModal(false)}>

      <h1 className='text-center text-2xl'>Blog</h1>

<div>
  <form onSubmit={handleSubmit}>
    <div className='p-7'>
      <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title :</label>
      <input onChange={handleChange} value={input?.title || ""} type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Enter Your Title" required />
    </div>

     <div className='p-7'>
      <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Slug* :</label>
      <input onChange={handleChange} value={input?.slug || ""} type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Enter Your Slug" required />
    </div>

    <div className='p-5'>
      <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Add Image :</label>
      <input type="file" onChange={handleImageFile} value={image?.image} name="image" id="image" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" />
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

      <div className="flex flex-col mx-96 border-4 shadow-xl font-mono">
          <div className="overflow-x-auto sm:-mx-6">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-center text-sm font-light">
                  <thead className="border-b font-medium dark:border-neutral-500">
                    <tr>
                      <th scope="col" className="px-6 py-2">ID</th>
                      <th scope="col" className="px-6 py-2">Avatar</th>
                      <th scope="col" className="px-6 py-2">UserName</th>
                      <th scope="col" className="px-6 py-2">Title</th>
                      <th scope="col" className="px-6 py-2">Categores</th>
                      <th scope="col" className="px-6 py-2">Date</th>
                      <th scope="col" className="px-6 py-2">Status</th>
                      <th scope="col" className="px-6 py-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {user?.map((data, index) => (
                      <tr className="border-b dark:border-neutral-500 ">
                        <td className="whitespace-nowrap px-6 py-2 font-medium">{index + 1}</td>
                        <td className="whitespace-nowrap px-6 py-2 w-9"><img src={data.image} alt="" /></td>
                        <td className="whitespace-nowrap px-6 py-2">{data.user_name}</td>
                        <td className="whitespace-nowrap px-6 py-2">{data.title}</td>
                        <td className="whitespace-nowrap px-6 py-2">{data.category_name}</td>
                        <td className="whitespace-nowrap px-6 py-2">{data.date}</td>
                        <td className="whitespace-nowrap px-6 py-2">{data.status}</td>
                        <div className='flex items-center text-center mt-4 justify-center space-x-7 '>
                          <div >
                         <td>
                         <i   className="fa-solid fa-pen-to-square text-green-700 hover:text-slate-700 text-2xl"></i>
                         </td>
                            {/* <td><button onClick={() => showButton(data.id)} className='text-white text-xl  bg-green-600 -400-700 hover:bg-slate-700  focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded  px-6 py-2 text-center me-2 mb-2'>Edit</button></td> */}
                          </div>
                          <div className='flex justify-center items-center'>
                         
                          <td>
                         <i  onClick={() => btnDelete(data.id)}  className="fa-solid fa-trash text-red-700 text-2xl hover:text-slate-700"></i>
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
    </>
  )
}

export default Blog;