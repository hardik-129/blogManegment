import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Carousel from "./Carousel";
import FrontNavbar from "./FrontNavbar";
import Footer from "./Footer";

function Categorydata() {
  const [user, setUser] = useState([]);
  const [total, setTotal] = useState();

  const { id } = useParams();

  function categorydata() {
    const token = "7ELX2CnkfqWpipzXNB5QV9sxSf4dPk";
    axios
      .get(
        `https://blog-api-dev.octalinfotech.com/api/categories/${id}/blogs`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )

      .then((res) => {
        let users = res.data.data.data;
        let usersOne = res.data.data.total;
        setUser(users);
        setTotal(usersOne);

        // console.log(usersOne);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    categorydata();
  }, [id]);

  return (
    <div>
      <div>
        <FrontNavbar />
      </div>

      <div>
        <Carousel />
      </div>

      {total === 0 ? (
        <p className="text-center text-2xl uppercase underline font-bold">
          blog data is not Found
        </p>
      ) : (
        user.map((data) => (
          <Link to={`blogdata/${data.id}`}>
            <div className=" shadow-md ml-[40%] p-4 text-center border w-[20%] ">
              <div className="">
                <img
                  src={data.image}
                  className="w-[330px] h-[230px] object-contain  "
                  alt="alert"
                />
              </div>
              <div className="text-base  cursor-pointer mt-2 ">
                <div className="flex  gap-2 ">
                  <div>
                    <img
                      src={data.user_image}
                      alt=""
                      className="w-8 h-8  rounded-full"
                    />
                  </div>
                  <div className="flex gap-24">
                    <span className="text-xs dark:text-gray-400  underline">
                      <span className="text-black ">{data.user_name}</span>
                    </span>
                    <span className="text-xs dark:text-gray-400 flex underline">
                      <span className="text-black ">{data.date}</span>
                    </span>
                  </div>
                </div>
                <div className="font-bold  text-2xl mt-10 uppercase ">
                  <span className="text-black ">{data.title}</span>
                </div>
              </div>
            </div>
          </Link>
        ))
      )}
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Categorydata;
