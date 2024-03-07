import React from 'react'
import Carousel from './Carousel'
import Blogpage from './Blogpage'
import CarouselPage from './CarouselPage'
import Footer from './Footer'
import FrontNavbar from './FrontNavbar'
import { useNavigate } from 'react-router-dom'


function Section() {
  const navigate = useNavigate();

  // navigate("/contect")
  return (
    <div>

<section>
        <div>
          <FrontNavbar />
        </div>
      </section>
      <section>
        <div>
          <Carousel />
        </div>
      </section>

      <section>
        <div>
          <Blogpage />
        </div>
      </section>
      <section>
        <div>
          <CarouselPage/>
        </div>
      </section>
      <section>
        <div>
          <Footer/>
        </div>
      </section>
    </div>
  )
}

export default Section
