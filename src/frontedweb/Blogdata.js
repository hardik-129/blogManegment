import React, { useEffect, useState } from 'react'
import { Link, useParams } from "react-router-dom";
import axios from 'axios'
import Footer from './Footer';
import FrontNavbar from './FrontNavbar';



function Blogdata() {
          const [user, setUser] = useState({});

          const {id} = useParams();

          useEffect(() => {
                    const token = "7ELX2CnkfqWpipzXNB5QV9sxSf4dPk";
                    axios.get(`https://blog-api-dev.octalinfotech.com/api/blogs/${id}/show`, {
                      headers: { Authorization: `Bearer ${token}` },
                    })
                
                      .then((res) => {
                        let users = res.data.data.blog;
                        setUser(users);
                      })
                      .catch((error) => {
                        console.log(error);
                      });
                  }, []);

  return (
    <>
    <FrontNavbar/>
    <div className='container  p-6 mx-auto  md:space-y-9 space-y-16'>
   <div>
    <h1 className='text-4xl font-bold uppercase underline my-5'>{user.category_name}</h1>
   <p className='flex items-center gap-4'>
    <h2>By</h2>
    <img className='w-14 h-14 rounded-full' src={user.image} alt="" />
    <h2>{user.user_name}</h2>
    On
    <h2 className='text-gray-600'>{user.date}</h2>
   </p>
   <div className="flex gap-2 border-b-[1px] py-5 flex-wrap">
          <div className="gap-2 flex items-center px-3  text-white btn text-sm py-1 bg-blue-800">
          <i class="fa-brands fa-facebook"><span className='px-2 uppercase '>Shere</span></i> 
          </div>
          <div className="gap-2 flex items-center px-3 text-white btn text-sm py-1 bg-blue-500">
          <i class="fa-brands fa-twitter"><span className='px-2 uppercase '>Shere</span></i>
          </div>
        </div>

        <div className=" flex justify-evenly my-16" >

          <div className="grid-cols-3 text-wrap mx-auto" style={{width:"50%"}}>
            {user.description}
          </div>

          <div className="grid-cols-9" style={{width:"30%"}}>
            <img
              src={user.image}
              alt=""
              className=" rounded  dark:bg-gray-500"
              width={"100%"}
              height={"3  0%"}
            />
          </div>
          
        </div>
        <div className="text-base text-start cursor-pointer mt-2 justify-start">

                  <div className="text-md mx-16  text-gray-900  font-bold px-3 py-2 break-words w-full">
                    {user.category_name}
                  </div>

                  <div className="flex justify-start items-center gap-2">
                    <div>
                      <img
                        src={user.user_image}
                        alt=""
                        className="h-8  w-8  rounded-full"
                      />
                    </div>

                    <div className="flex gap-3">
                      <span className="text-xs text-gray-900 ">
                        {user.user_name}
                      </span>
                      <span className="text-xs text-gray-900">
                        {user.date}
                      </span>
                    </div>
                  </div>

                  <span className="text-xs mx-24 dark:text-gray-400">
                    {user.title}
                  </span>
                </div>
        <hr />

        
   </div> 
    </div>
    <Footer/>
    </>
  )
}

export default Blogdata;
