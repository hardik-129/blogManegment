import React, { useState } from "react";
import "./ContactUs.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FrontNavbar from "./FrontNavbar";
import Footer from "./Footer";

function ContectUs() {
  const Navigate = useNavigate();



  const [input, setInput] = useState();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInput((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setInput();

    const token = "7ELX2CnkfqWpipzXNB5QV9sxSf4dPk";

    axios
      .post("https://blog-api-dev.octalinfotech.com/api/contact-us", input, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        let users = response.data.data.data;
        console.log(users);
      });

    Navigate("/");
  };

  return (
    <>

      <div>
      <FrontNavbar />
        <div className="w-[50%] mx-[25%]  my-[5%] border-0 shadow-2xl p-20 shadow-black">
          <h1 className="text-center text-2xl mb-8 underline">Contact US</h1>
          <form onSubmit={handleSubmit}>
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              class="field-divided bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="First Name"
              value={input?.name}
              onChange={handleChange}
              required
            />

            <label
              for="email"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              class="field-long bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={input?.email}
              onChange={handleChange}
              required

            />

            <label
              for="message"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              messege
            </label>
            <textarea
              name="message"
              id="field5"
              placeholder="Message....."
              class="field-long field-textarea bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={input?.message}
              onChange={handleChange}
              required

            ></textarea>

            <input className="p-2 flex border-2 mt-3 text-black " type="submit" value="Submit" />
          </form>
        </div>

      </div>
      <section>
        <div>
<Footer/>

        </div>
      </section>
    </>
  );
}

export default ContectUs;
