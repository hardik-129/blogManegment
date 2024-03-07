import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "../frontedweb/Footer.css"
import "../componets/Card.css"

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
    <div className="">




<div class="pg-footer">
    <footer class="footer">
      <svg class="footer-wave-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 100" preserveAspectRatio="none">
        <path class="footer-wave-path" d="M851.8,100c125,0,288.3-45,348.2-64V0H0v44c3.7-1,7.3-1.9,11-2.9C80.7,22,151.7,10.8,223.5,6.3C276.7,2.9,330,4,383,9.8 c52.2,5.7,103.3,16.2,153.4,32.8C623.9,71.3,726.8,100,851.8,100z"></path>
      </svg>
      <div class="footer-content">
        <div class="footer-content-column">
          <div class="footer-logo">
            <a class="footer-logo-link" href="#">
            <div>
          <img
            className="w-20 mt-1 rounded-full"
            src="https://octalinfotech.com/img/octal-logo.png"
            alt=""
          />
        </div>
             
            </a>
            <h2 class="footer-menu-name"> octal infotech</h2>
          </div>
         
        </div>
        <div class="footer-content-column list-none">
          <div class="footer-menu">
            <h2 class="footer-menu-name"> Company</h2>
           
              <li class="menu-item menu-item-type-post_type menu-item-object-page">
                <a href="#">About</a>
              </li>
              <li class="menu-item menu-item-type-taxonomy menu-item-object-category">
                <a href="#">Meet the Team</a>
              </li>
              <li class="menu-item menu-item-type-post_type menu-item-object-page">
                <a href="#">Accounts Review</a>
              </li>
          
          </div>
         
        </div>
        <div class="footer-content-column list-none">
          <div class="footer-menu">
            <h2 class="footer-menu-name"> Connect</h2>
           
              <div class="flex items-center gap-4 menu-item menu-item-type-custom menu-item-object-custom">
              <i class="fa-brands fa-facebook "></i>
            <li href="">Facebook</li>
              </div>
              <div class="flex items-center gap-4 menu-item menu-item-type-custom menu-item-object-custom">
              <i class="fa-brands fa-instagram"></i>
            <li href="">Instagram</li>
              </div>
              <div class="flex items-center gap-4 menu-item menu-item-type-custom menu-item-object-custom">
              <i class="fa-brands fa-twitter"></i>
            <li href="">Twitter</li>
              </div>
              <div class="flex items-center gap-4 menu-item menu-item-type-custom menu-item-object-custom">
              <i class="fa-brands fa-square-github"></i>
            <li href="">Git-Hub</li>
              </div>
              <div class="flex items-center gap-4 menu-item menu-item-type-custom menu-item-object-custom">
              <i class="fa-brands fa-linkedin"></i>
            <li href="">Linkedin</li>
              </div>
             
           
          </div>
        </div>
        <div class="footer-content-column">
          <div class="footer-call-to-action">
            <h2 class="footer-call-to-action-title"> Categories</h2>
            <div className="">
          {
            user?.map((items, index)=>(

              <Link to={`/category/${items.id}`}>
                 <div className={` pt-4 font-bold  hover:border-b-4 border-x-white ${items === currentID && 'border-b-4'}`} >
               <li className="list-none flex gap-4 items-center"key= {index}> 
                <div className="my-1">{items.name}</div>
                <div>({items.blog_count})</div>
                </li>
              </div>
               </Link>

            ))
          }
        </div>
          </div>
          
        </div>
       
      </div>
      <div class="">
        <div class="footer-copyright-wrapper">
          <p class="footer-copyright-text">
            <a class="footer-copyright-link" href="#" target="_self"> ©2024. | Designed By: Baraiya Hardik. | All rights reserved. </a>
          </p>
        </div>
      </div>
    </footer>
  </div>
    </div>
  );
}
