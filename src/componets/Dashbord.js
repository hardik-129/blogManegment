import React, { useEffect, useState } from "react";
import Http from "../Http";



const url = process.env.REACT_APP_API_KEY;

function Dashbord() {
  

  const name = localStorage.getItem("name");

  
  const [user, setUser] = useState();
  const [category, setCategory] = useState();
  const [blog, setBlog] = useState();
  const [tag, setTags] = useState();



  useEffect(() => {
    Http.callApi("get", url + "dashboard")
      .then((response) => {
        setUser(response.data.data.user);
        setCategory(response.data.data.category);
        setBlog(response.data.data.blog);
        setTags(response.data.data.tag);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="position-relative">
      <div className="position-absolute w-[85%] border-gray-10  py-5  text-2xl font-black flex text-center gap-4 shadow-xl max-xl:hidden ">
        <div>
          <img
            className="contect-img"
            src="https://ims-api.octalinfotech.com/images/avatar.png"
            alt=""
          />
        </div>
        <div>
          <h1>Good Morning , {name} </h1>
        </div>
      </div>
      <div className="">
        <div className="flex text-center gap-x-10 mt-32 text-xl position-left absolute left-0 font-bold flex-wrap md:flex  items-center ">
          <div className=" px-44 mt-8 box-border  w-min p-5   bg-green-100 shadow-xl rounded-md hover:bg-white">
            Blog {blog}
          </div>
          <div className="  px-40 mt-8 box-border  w-min p-5  bg-blue-100 shadow-xl rounded-md hover:bg-white">
            Category {category}
          </div>
          <div className="  px-44 mt-8 box-border  w-min p-5  bg-yellow-100 shadow-xl rounded-md hover:bg-white">
            User {user}
          </div>
          <div className="  px-44 mt-8 box-border w-min p-5  bg-red-100 shadow-xl rounded-md hover:bg-white">
            Tags {tag}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashbord;
