import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const baseURL = "https://blog-api-dev.octalinfotech.com/api/categories/count";

export default function Footer() {
  const currentID = useParams().id

  const [user, setUser] = useState([]);

  function footer() {
    const token = localStorage.getItem("token");
    axios
      .get(baseURL, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        let users = res.data.data.data;
        console.log(users);
        setUser(users);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    footer();
  }, []);

  return (
    <div className="bg-gray-950  mt-12 text-white flex justify-center gap-32 space-y-6 ">
      <div className="flex  gap-5">
        <div>
          <img
            className="w-20 mt-1 rounded-full"
            src="https://octalinfotech.com/img/octal-logo.png"
            alt=""
          />
        </div>
        <div>
          <h3 className="mt-6 text-white text-2xl underline uppercase ">Octal Infotech</h3>
        </div>
      </div>
      <div>
        <h1 className="text-xl underline font-extrabold ">Company</h1>
        <div>
          <li className="list-none  hover:opacity-75 my-3">
            <a href="#">About</a>
          </li> 
        </div>
        <div>
          <li className="list-none  hover:opacity-75 my-3">
            <a href="#">Meet the Team</a>
          </li>
        </div>
        <div>
          <li className="list-none  hover:opacity-75 my-3">
            <a href="#">Accounts Review</a>
          </li>
        </div>
      </div>
      <div className="">
        <h1 className="text-xl underline font-extrabold ">Connect</h1>
        <div>
          <div className=" flex items-center gap-5 my-3 hover:opacity-50">
            <i class="fa-brands fa-facebook "></i>
            <a href="">Facebook</a>
          </div>

          <div className="flex items-center gap-5 my-3 hover:opacity-50">
            <i class="fa-brands fa-instagram"></i>
            <a href="">Instagram</a>
          </div>

          <div className="flex items-center gap-5 my-3 hover:opacity-50">
            <i class="fa-brands fa-twitter"></i>
            <a href="">Twitter</a>
          </div>

          <div className="flex items-center gap-5 my-3 hover:opacity-50">
            <i class="fa-brands fa-square-github"></i>
            <a href="">Git-Hub</a>
          </div>

          <div className="flex items-center gap-5 my-3 hover:opacity-50 ">
            <i class="fa-brands fa-linkedin"></i>
            <a href="">Linkedin</a>
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-xl underline font-extrabold  ">Categorise</h1>

        <div>
          {
            user?.map((items, index)=>(

              <Link to={`/category/${items.id}`}>
                 <div className={` pt-4 font-bold  hover:border-b-4 border-x-white ${items === currentID && 'border-b-4'}`} >
               <li className="list-none flex gap-4 items-center"key= {index}> 
                <div className="my-3">{items.name}</div>
                <div>({items.blog_count})</div>
                </li>
              </div>
               </Link>

            ))
          }
        </div>
      </div>
    </div>
  );
}
