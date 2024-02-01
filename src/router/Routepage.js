import React from 'react'
import { Routes, Route } from "react-router-dom";
import Navbar from "../componets/Navbar"
import LoginPage from '../componets/LoginPage';
import Tags from '../componets/Tags';
import Dashbord from '../componets/Dashbord';
import User from '../componets/User';
import Category from '../componets/Category';
import Blog from '../componets/Blog';
import FrontNavbar from '../frontedweb/FrontNavbar';


const Routepage = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<FrontNavbar />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={< Navbar/>} >
      <Route path="/admin/dashbord" element={<Dashbord />} />
      <Route path="/admin/category" element={<Category />} />
      <Route path="/admin/blog" element={<Blog />} />
      <Route path="/admin/tag" element={<Tags />} />
      <Route path="/admin/user" element={<User />} />

      </Route>
    </Routes>
    
    </>
  );

}
export default Routepage;
