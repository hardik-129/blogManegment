// import React from 'react'
import React, { useEffect, useState } from 'react'
import Http from '../Http'
import './CategorySlider.css'

const url = (process.env.REACT_APP_API_KEY);



function CategorySlider({ items }) {

   
   const [user, setUser] = useState()
   
   const goToPrevSlide = () => {
      setUser((prevIndex) =>
        prevIndex === 0 ? items - 1 : prevIndex - 1
        );
      };

    const goToSlide = (index) => {
      setUser(index);
    };   

    const goToNextSlide = () => {
      setUser((prevIndex) =>
        prevIndex === items - 1 ? 0 : prevIndex + 1
      );
    };


   function category() {

      Http.callApi("get", url + `categories`)
         .then((response) => {
            let users = response.data.data

            setUser(users)
            console.log(users);


         })
   }

   useEffect(() => {
      category("");
   }, [])




   return (
      <div>


<div className="carousel-container">
      <button onClick={goToPrevSlide}>Prev</button>
      <div className="carousel">
        {user?.data?.map((item, index) => (
          <div
            key={index}
            className={index === user ? 'slide active' : 'slide'}
            onClick={() => goToSlide(index)}
          >
            <img src={item.image} alt='' />
            <h3>{item.name}</h3>
          </div>
        ))}
      </div>
      <button onClick={goToNextSlide}>Next</button>
    </div>

         

{/* <div class="carousel">
    <a class="carousel-item" href="#one!">
    {user?.map((data) => (
            <div classNameName='flex'>

               <div>
                  <img className='w-10' src={data.image} alt="" />
               </div>
               <div>
                  {data.name}
               </div>
            </div>

         ))}
      </a>
   
  </div> */}
        
      </div>
   )
}

export default CategorySlider
