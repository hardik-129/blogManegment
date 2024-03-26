import React, { useEffect, useState } from "react";
import Http from "../Http";
import { Link } from "react-router-dom";

const url = process.env.REACT_APP_API_KEY;

function Blogpage() {
  const [user, setUser] = useState([]);

  function blog() {
    Http.callApi("get", url + `blogs`).then((response) => {
      let users = response.data.data.data;

      setUser(users);
      // console.warn(users);
    });
  }

  useEffect(() => {
    blog("");
  }, []);

  return (
    <>
      <div>
        <div className="dark:text-gray-100">
          <div className="justify-center flex">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:grid-cols-2 ">
              {user?.map((data) => (
                <Link to={`blogdata/${data.id}`}>
                  <div className="main mt-5 hover:text-white-500 font-semibold text-base grid-container border shadow-xl p-3 hover:scale-110">
                    <div className="">
                      <img
                        src={data.image}
                        className="w-[330px] h-[230px] object-contain items-center flex justify-center"
                        alt="alert"
                      />
                    </div>
                    <div className="text-base text-center cursor-pointer mt-2 justify-content">
                     
                      <div className="flex justify-center gap-2 items-center">
                        <div>
                          <img
                            src={data.user_image}
                            alt=""
                            className="w-8 h-8  rounded-full"
                          />
                        </div>
                        <div className="flex gap-24">
                          <span className="text-xs dark:text-gray-400 flex underline">
                            <span className="text-black">{data.user_name}</span>
                          </span>
                          <span className="text-xs dark:text-gray-400 flex underline">
                            <span className="text-black">{data.date}</span>
                          </span>
                        </div>
                      </div>
                      <div className="font-bold text-center text-2xl mt-10 uppercase ">
                        <span className="text-black">{data.title}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Blogpage;
