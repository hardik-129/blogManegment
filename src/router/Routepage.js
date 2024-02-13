import React from 'react'
import { Routes, Route } from "react-router-dom";
import Navbar from "../componets/Navbar"
import LoginPage from '../componets/LoginPage';
import Tags from '../componets/Tags';
import Dashbord from '../componets/Dashbord';
import User from '../componets/User';
import Category from '../componets/Category';
import Blog from '../componets/Blog';
import Blogdata from '../frontedweb/Blogdata';
import Section from '../frontedweb/Section';
import Categorydata from '../frontedweb/Categorydata';
import ContectUs from '../frontedweb/ContectUs';
import Contact from '../componets/Contact';


const Routepage = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<Section />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/blogdata/:id" element={<Blogdata/>}></Route>
      <Route path="/contect" element={<ContectUs />} />
      <Route path="/category/:id" element={<Categorydata/>}></Route>
      <Route path="/" element={< Navbar/>} >
      <Route path="/admin/dashbord" element={<Dashbord />} />
      <Route path="/admin/category" element={<Category />} />
      <Route path="/admin/blog" element={<Blog />} />
      <Route path="/admin/tag" element={<Tags />} />
      <Route path="/admin/user" element={<User />} />
      <Route path="/admin/contact" element={<Contact />} />

      </Route>
    </Routes>
    
    </>
  );

}
export default Routepage;
