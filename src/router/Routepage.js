import React from 'react'
import { Routes, Route } from "react-router-dom";
import Navbar from "../componets/Navbar"
import LoginPage from '../componets/LoginPage';
import Tags from '../componets/Tags';
import Dashbord from '../componets/Dashbord';
import User from '../componets/User';
import Category from '../componets/Category';
import Blog from '../componets/Blog';

const Routepage = () => {
  return (
    <>
    <Routes>
      
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={< Navbar/>} >
      <Route path="/dashbord" element={<Dashbord />} />
      <Route path="/category" element={<Category />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/tag" element={<Tags />} />
      <Route path="/user" element={<User />} />

      </Route>
    </Routes>
    
    </>
  );

}
export default Routepage;
