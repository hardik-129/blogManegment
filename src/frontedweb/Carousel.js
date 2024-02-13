import React, { useEffect, useState } from 'react'
import ReactSimplyCarousel from 'react-simply-carousel';
import Http from '../Http'
import { Link, useParams } from 'react-router-dom';

const url = (process.env.REACT_APP_API_KEY);

function Carousel() {

    const currentID = useParams().id

    // console.log(currentID);
    

   const [user, setUser] = useState()

          const [activeSlideIndex, setActiveSlideIndex] = useState(0);


          function category() {

                    Http.callApi("get", url + `categories`)
                       .then((response) => {
                          let users = response.data.data.data
              
                          setUser(users)
                          // console.log(users);
              
              
                       })
                 }

                 useEffect(() => {
                    category("");
                 }, [])
  return (
    <div className='mt-[40px]'>
    <ReactSimplyCarousel
        activeSlideIndex={activeSlideIndex}
        onRequestChange={setActiveSlideIndex}
        itemsToShow={1}
        itemsToScroll={1}
        
        forwardBtnProps={{
            //here you can also pass className, or any other button element attributes
            style: {
                alignSelf: 'center',
                border: 'none',
                borderRadius: '50%',
                color: 'black',
                cursor: 'pointer',
                fontSize: '30px',
                height: 30,
                lineHeight: 1,
                textAlign: 'center',
                width: 30,
                marginBottom: 50,
            },
            children: <span><i class="fa fa-angle-right"></i></span>,
        }}
        backwardBtnProps={{
            //here you can also pass className, or any other button element attributes
            style: {
                alignSelf: 'center',
                border: 'none',
                borderRadius: '50%',
                color: 'black',
                cursor: 'pointer',
                fontSize: '30px',
                height: 30,
                lineHeight: 1,
                textAlign: 'center',
                width: 30,
                marginBottom: 50,
            },
            children: <span><i class="fa fa-angle-left "  ></i></span>,
        }}
        responsiveProps={[
            {
                itemsToShow: 8,
                itemsToScroll: 1,
                minWidth: 768,
            },
        ]}
        speed={400}
        easing="linear"
    >
      
        {
            user?.map((data) => (
                <div style={{ width: 200, height: 200 }} >
                    <div className='flex flex-col items-center'>
                        <div>
                            <img src={data.image} alt="" className='h-20 w-20 rounded-full  border-black p-2 ' />
                        </div>
                        <Link to={`/category/${data.id}`}>
                            <div className={` pt-4 font-bold  hover:border-b-4 border-black ${data.id == currentID && 'border-b-4'}`} >
                                <h1 className='focus:bg-red-900'>{data.name}</h1>
                            </div>
                        </Link>
                    </div>
                </div>
            ))
        }
    </ReactSimplyCarousel>
</div>
  )
}

export default Carousel
