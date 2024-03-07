import React, { useEffect, useState } from "react";
// import axios from 'axios'
import Http from "../Http";
import Card from "./Card";
// import { useNavigate } from 'react-router-dom'

const url = process.env.REACT_APP_API_KEY;

function Dashbord() {
  // const navegate = useNavigate();

  const name = localStorage.getItem("name");
  // const tokan = localStorage.getItem("token");

  // let token = localStorage.getItem("token")

  const [user, setUser] = useState();
  const [category, setCategory] = useState();
  const [blog, setBlog] = useState();
  const [tag, setTags] = useState();

  //  = localStorage.getItem('name');

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
    <div className="">
      <div className="border-gray-10 border-4 py-5 px-96 text-2xl font-black flex text-center gap-4 shadow-xl max-xl:hidden ">
        <div>
          <img
            className="contect-img"
            src="https://ims-api.octalinfotech.com/images/avatar.png"
            alt=""
          />
        </div>
        <div>
          <h1>Good Morning , {name}</h1>
        </div>
      </div>
      <div className=" max-md:px-48 max-md:ml-0">
        {/* <Card cardData = {cardData} /> */}

        <div className="flex  text-center gap-x-72 mt-32 text-xl font-bold flex-wrap md:flex justify-center items-center ">
          <div className=" px-44 mt-8 box-border h-22 w-min p-5   bg-green-100 shadow-xl rounded-md hover:bg-white">
            Blog {blog}
          </div>
          <div className="  px-40 mt-8 box-border h-22 w-min p-5  bg-blue-100 shadow-xl rounded-md hover:bg-white">
            Category {category}
          </div>
        </div>
        <div className="flex   text-center gap-x-72 mt-32 text-xl font-bold flex-wrap md:flex justify-center items-center">
          <div className="  px-44 mt-8 box-border h-22 w-min p-5  bg-yellow-100 shadow-xl rounded-md hover:bg-white">
            User {user}
          </div>
          <div className="  px-44 mt-8 box-border h-22 w-min p-5  bg-red-100 shadow-xl rounded-md hover:bg-white">
            Tags {tag}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashbord;
