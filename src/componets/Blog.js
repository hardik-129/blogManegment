import React, { useEffect, useState } from 'react'
import Http from '../Http'
import CategoryAdd from './CategoryAdd';
import axios from 'axios'
import Swal from 'sweetalert2'
import Pagination from './Pagination';







const url = (process.env.REACT_APP_API_KEY);


function Blog() {

  const [user, setUser] = useState()
  const [category, setOpenModal] = useState(false)
  const [input, setInput] = useState({})
  const [image, setImage] = useState(null)
  const [Toggle, setToggle] = useState(true)
  const [usersData, setUsersData] = useState([])
  const [categories, setCategories] = useState([])
  const [Tags, setTags] = useState([]);
  const [TitleSearchFilter, setTitleSearchFilter] = useState('');
  const [statusSearchFilter, setstatusSearchFilter] = useState('');
  const [CategorySearceFilter, setCategorySearceFilter] = useState('');
  const [UserSearceFilter, setUserSearceFilter] = useState('');



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


  useEffect(() => {
    const token = localStorage.getItem('token')
    axios.get("https://blog-api-dev.octalinfotech.com/api/categories", { headers: { "Authorization": `Bearer ${token}` } })
      .then((res) => {
        let users = res.data.data.data;
        setCategories(users)

      }).catch((error) => {
        console.log(error);
      })
  }, [])

  useEffect(() => {
    const token = localStorage.getItem('token')
    axios.get("https://blog-api-dev.octalinfotech.com/api/tages", { headers: { "Authorization": `Bearer ${token}` } })
      .then((res) => {
        let users = res.data.data.data;
        setTags(users)

      }).catch((error) => {
        console.log(error);
      })
  }, [])

  useEffect(() => {
    const token = localStorage.getItem('token')
    axios.get("https://blog-api-dev.octalinfotech.com/api/users", { headers: { "Authorization": `Bearer ${token}` } })
      .then((res) => {
        let users = res.data.data.data;
        setUsersData(users)

      }).catch((error) => {
        console.log(error);
      })
  }, [])

  function blogs(TitleSearchFilter = '', statusSearchFilter = '', CategorySearceFilter = " ", UserSearceFilter = '') {

    Http.callApi('get', url + `blogs?search=${TitleSearchFilter}&status=${statusSearchFilter}&category_id${CategorySearceFilter}&user_id${UserSearceFilter}`)
      .then((response) => {



        let users = response.data.data
        console.log(users);

        setUser(users)

      })
      .catch((error) => {
        console.log(error);
      })

  }

  useEffect(() => {
    blogs(TitleSearchFilter, statusSearchFilter, CategorySearceFilter, UserSearceFilter);
  }, [TitleSearchFilter, statusSearchFilter, CategorySearceFilter, UserSearceFilter])


  const handleSubmit = (e) => {
    e.preventDefault()
    setInput("");
    console.error(input.category_id);

    const data = new FormData();
    data.append("image", image)
    data.append("user_id", input.user_id)
    data.append("category_id", input.category_id)
    data.append("title", input.title)
    data.append("slug", input.slug)
    data.append("date", input.date)
    data.append("status", input.status)
    data.append("description", input.description)
    data.append("tag_id", input.tag_id)


    // alert()


    const token = localStorage.getItem('token')
    axios.post("https://blog-api-dev.octalinfotech.com/api/blogs/store", data, { headers: { "Authorization": `Bearer ${token}` } })
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


  const setModal = () => {
    setOpenModal(false);
    setToggle(true);
    setInput('')
  }

  const handleImageFile = (event) => {
    setImage(event.target.files[0])
  }

  const updateBlog = (event) => {
    event.preventDefault();

    const data = new FormData();
    data.append("image", image)
    data.append("user_id", input.user_id)
    data.append("category_id", input.category_id)
    data.append("title", input.title)
    data.append("slug", input.slug)
    data.append("date", input.date)
    data.append("status", input.status)
    data.append("description", input.description)
    data.append("tag_id", input.tag_id)


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

  const showButton = (id) => {

    console.log(id);
    setInput("");
    Http.callApi('get', url + `blogs/${id}/show`)
      .then((res) => {
        let users = res.data.data;
        console.log(users);
        setInput(users)

        setOpenModal(true)
        blogs();


      })

    setToggle(false);
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


  const SearchFilter = (event) => {
    setTitleSearchFilter(event.target.value)
  }

  const Statusfilter = (event) => {
    setstatusSearchFilter(event.target.value)
  }

  const CategoryFilter = (event) => {
    setCategorySearceFilter(event.target.value)
  }
  const UserFilter = (event) => {

    console.log(event.target.value);

    setUserSearceFilter(event.target.value)


  }

  return (
    <>

      <div className='flex justify-end gap-10 mx-14 m-6 my-14 flex-wrap'>




        <form class="flex items-center absolute left-80 ">
          <label for="voice-search" class="sr-only">Search</label>
          <div class="relative w-full ">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 21">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.15 5.6h.01m3.337 1.913h.01m-6.979 0h.01M5.541 11h.01M15 15h2.706a1.957 1.957 0 0 0 1.883-1.325A9 9 0 1 0 2.043 11.89 9.1 9.1 0 0 0 7.2 19.1a8.62 8.62 0 0 0 3.769.9A2.013 2.013 0 0 0 13 18v-.857A2.034 2.034 0 0 1 15 15Z" />
              </svg>
            </div>
            <input onChange={SearchFilter} type="text" id="voice-search" class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Search Title' required />
            <button type="button" class="absolute inset-y-0 end-0 flex items-center pe-3">
              <svg class="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7v3a5.006 5.006 0 0 1-5 5H6a5.006 5.006 0 0 1-5-5V7m7 9v3m-3 0h6M7 1h2a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3Z" />
              </svg>
            </button>
          </div>

        </form>


        <div>
          <select className='shadow-lg border px-10 rounded-lg py-2.5' name="" id="" onChange={Statusfilter}>
            <option value="">All Status</option>
            <option value="1">Publish</option>
            <option value="2">Unpublish</option>
          </select>
        </div>

        <div>
          <select id="" name="user_id" class="shadow-lg px-10 form-control  bg-white border  text-gray-900 text-sm rounded-lg  focus:ring-black block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" onChange={UserFilter}  >
            <option value="">All Users</option>

            {usersData.map((item) => (
              <option value={item.id}>{item.name}</option>
            ))}
          </select>
        </div>

        <div>
          <select id="" name='category_id' class="shadow-lg px-10 form-control  bg-white border text-gray-900 text-sm rounded-lg focus:ring-black  block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" onChange={CategoryFilter}  >
            <option value="">All Category</option>
            {categories.map((item) => (
              <option value={item.id}>{item.name}</option>
            ))}
          </select>
        </div>


        <div>
          <button className='text-white text-xl  bg-black  hover:bg-slate-700  focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded  px-2 py-2 text-center me-2 mb-2 shadow-lg' onClick={() => setOpenModal(true)}>ADD Blog + </button>

        </div>
      </div>

      <CategoryAdd addData={category} Add={() => setOpenModal(false)}>
        <h1 className='text-center text-2xl'>Blog</h1>

        <div>
          <form onSubmit={handleSubmit}>
            <div className='flex  '>

              <div className='p-7'>
                <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title :</label>
                <input onChange={handleChange} value={input?.title || ""} type="text" name="title" id="title" class=" px-28 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Enter Your Title" />
              </div>

              <div className='p-7'>
                <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Slug* :</label>
                <input onChange={handleChange} value={input?.slug || ""} type="text" name="slug" id="slug" class="px-28 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Enter Your Slug" />
              </div>




            </div>


            <div className='flex'>
              <div className='p-7'>
                <label class="block form-label">Category</label>
                <select name="category_id" id="" class="px-36 form-control m-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" value={input?.category_id || ""} onChange={handleChange}  >
                  {categories.map((item) => (
                    <option value={item.id}>{item.name}</option>
                  ))}
                </select>
              </div>
              <div className='p-7'>
                <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">User :</label>
                <select name="user_id" id="" class="form-control m-0 px-36 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black   focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" value={input?.user_id || ""} onChange={handleChange}  >
                  {usersData.map((item) => (
                    <option value={item.id}>{item.name}</option>
                  ))}
                </select>

              </div>
            </div>

            <div className='flex justify-around '>


              <div className='p-4'>
                <label for="text" class="text-wrap block px-44 mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
                <input onChange={handleChange} value={input?.date || ""} type="date" name="date" id="slug" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Enter Your Slug" />
              </div>


              <div className='p-4'>
                <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Add Image :</label>
                <input type="file" onChange={handleImageFile} value={image?.image} name="image" id="image" class="px-12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" />
              </div>
            </div>


            <div className='flex'>
              <div className='p-5 border-0'>
                <label className="form-label">Status</label>
                <select name='status' className=" px-40 form-select m-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" id="validationDefault04" value={input?.status || ""} onChange={handleChange}>
                  <option value={0}></option>
                  <option value={1}>publish</option>
                  <option value={2}>unpublish</option>
                </select>
              </div>

              <div className='p-7'>
                <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tags :</label>
                <select name="tag_id" id="" class="form-control m-0 px-36 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" value={input?.tag_id || ""} onChange={handleChange}  >
                  {Tags.map((item) => (
                    <option value={item.id}>{item.name}</option>
                  ))}
                </select>

              </div>

            </div>

            <div class="col-6 flex justify-center">
              <input type="text" name='description' class=" m-5 form-control p-20 w-[100%] border-2" value={input?.description || ""} onChange={handleChange} placeholder='description' />
            </div>

            <div className='flex justify-center'>
              <div>
                <button onClick={setModal} className='text-white text-xl  bg-slate-700 hover:bg-green-700  focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded  px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'>cancel</button>
              </div>
              <div>
                {
                  Toggle ?
                    <button className='text-white text-xl  bg-green-700 hover:bg-slate-700  focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded  px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'>Add</button>
                    : <button onClick={updateBlog} className='text-white text-xl  bg-green-700 hover:bg-slate-700  focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded  px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'>Update</button>

                }
              </div>

            </div>

          </form>
        </div>

      </CategoryAdd>

      <div className="flex flex-col mr-[10px] mx-80 border shadow-xl font-mono ">

        <div className="overflow-x-auto sm:-mx-6">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-center text-sm font-light">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th scope="col" className="px-6 py-2">ID</th>
                    <th scope="col" className="px-6 py-2">Avatar</th>
                    <th scope="col" className="px-6 py-2">User</th>
                    <th scope="col" className="px-6 py-2">Title</th>
                    <th scope="col" className="px-6 py-2">Categores</th>
                    <th scope="col" className="px-6 py-2">Date</th>
                    <th scope="col" className="px-6 py-2">Status</th>
                    <th scope="col" className="px-6 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {user?.data?.map((data, index) => (
                    <tr className="border-b dark:border-neutral-500 ">
                      <td className="whitespace-nowrap px-6 py-2 font-medium">{index + 1}</td>
                      <td className="whitespace-nowrap px-6 py-2 w-9"><img src={data.image} alt="" /></td>
                      <td className="whitespace-nowrap px-6 py-2">{data.user_name}</td>
                      <td className="whitespace-nowrap px-6 py-2">{data.title}</td>
                      <td className="whitespace-nowrap px-6 py-2">{data.category_name}</td>
                      <td className="whitespace-nowrap px-6 py-2">{data.date}</td>
                      <td > <span className={data.status === 1 ? "bg-green-600 shadow-lg  p-2 rounded-2xl text-white font-bold px-4 " : "shadow-lg px-4 bg-red-600 p-2 rounded-2xl text-white font-bold"}>{data.status === 1 ? "Publish" : "Unpublish"}</span> </td>
                      <div className='flex items-center text-center mt-4 justify-center space-x-7 '>
                        <div >
                          <td>
                            <i onClick={() => showButton(data.id)} className="fa-solid fa-pen-to-square text-green-700 hover:text-slate-700 text-2xl"></i>
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
              <div className='absolute right-6'>
                <Pagination  links={user?.links} setUser={setUser} />
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Blog;