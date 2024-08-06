import React, { useEffect, useRef, useState } from 'react'
import { assets, future, past_experience, travel, travel_cat } from './assets/assets'
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import 'swiper/css';
import "swiper/css/pagination";
import "swiper/css/navigation";
import 'swiper/css/scrollbar';
import Travel_Catalouge from './Components/Travel_Catalouge/Travel_Catalouge';
import PageExperience from './Components/Past Experience/PastExperience';


const App = () => {

  const [nav, setNav] = useState("stays")
  const [navbar, setNavbar] = useState(false)
  const travelContainerRef = useRef(null)
  const [scrollX, setScrollX] = useState(0)
  const [scrollActive, setscrollActive] = useState(0)
  const scrollXRef = useRef(0);
  const [open, SetOpen] = useState(false)
  const [select, setSelect] = useState("Sign up")
  const catMenu = useRef(null)
  const [show, setShow] = useState(false)


  useEffect(() => {
    const handleScroll = () => {
      if (travelContainerRef.current) {
        setScrollX(travelContainerRef.current.scrollLeft);
      }
    };
    if (travelContainerRef.current) {
      travelContainerRef.current.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (travelContainerRef.current) {
        travelContainerRef.current.removeEventListener('scroll', handleScroll)
      }
    };
  }, [])

  const scrollToX = () => {
    if (travelContainerRef.current) {
      travelContainerRef.current.scrollTo({
        left: scrollXRef.current,
        behavior: 'smooth'
      });
    }
  };

  const getMaxScrollX = () => {
    if (travelContainerRef.current) {
      const containerWidth = travelContainerRef.current.offsetWidth;
      const itemsWidth = travel.reduce((acc, item) => acc + 88, 0); // assuming each item is 300px wide
      return itemsWidth - containerWidth;
    }
    return 0;
  };

  const changeNav = () => {
    if (window.scrollY >= 10) {
      setNavbar(true)
    } else {
      setNavbar(false)
    }
  }

  const travelNav = () => {
    if (scrollX <= 0) {
      setscrollActive(0)
    } else if (scrollX >= getMaxScrollX()) {
      setscrollActive(1)
    } else {
      setscrollActive(2)
    }
  }

  const rightClick = () => {
    const maxX = getMaxScrollX();
    if (scrollXRef.current + 400 <= maxX) {
      scrollXRef.current += 400;
      setScrollX(scrollXRef.current);
    } else {
      scrollXRef.current = maxX;
      setScrollX(scrollXRef.current);
    }
  };

  const leftClick = () => {
    if (scrollXRef.current - 400 >= 0) {
      scrollXRef.current -= 400;
      setScrollX(scrollXRef.current);
    } else {
      scrollXRef.current = 0;
      setScrollX(scrollXRef.current);
    }
  };
  window.addEventListener('scroll', function () {
    changeNav()
  })

  useEffect(() => {
    let handler = (e) => {
      console.log(catMenu.current)
      if (!catMenu.current.contains(e.target)) {
        SetOpen(false)
      }
    };

    document.addEventListener('mousedown', handler);

    return () => {
      document.removeEventListener('mousedown', handler)
    }
  })

  useEffect(() => {
    travelNav()
  }, [scrollX])

  useEffect(() => {
    scrollToX();
  }, [scrollX])

  return (
    <>
      <div className='relative z-50 bg-white h-[24vh]'>
        {/* Header */}
        <div className='mr-20 px-20 flex flex-row justify-between font-airbnb items-center fixed top-0 left-0 w-full bg-white z-50'>
          {/* Logo */}
          <div className=''>
            <img className="size-24 object-contain" src={assets.logo} alt="Logo" />
          </div>
          {/* Navigation and Searchbar */}
          <div className='absolute left-1/2 -translate-x-1/2 flex flex-col items-center justify-center'>
            {/* Navigation */}
            <div className={!navbar ? 'flex flex-row items-center justify-center gap-2 mt-24 ' : "hidden"}>
              <div className={nav === "stays" ? 'font-semibold cursor-pointer p-3 px-4' :
                "text-gray-400 cursor-pointer p-3 px-4 rounded-full hover:bg-gray-300 hover:bg-opacity-20"} onClick={() => setNav("stays")}>
                <p>Stays</p>
              </div>
              <div className={nav === "experience" ? 'font-semibold cursor-pointer p-3 px-4' :
                "text-gray-400 cursor-pointer p-3 px-4 rounded-full hover:bg-gray-300 hover:bg-opacity-20"} onClick={() => setNav("experience")}>
                <p>Experiences</p>
              </div>
            </div>
            {/* Searchbar */}
            <div className='bg-white'>
              {/* Box */}
              <div className={!navbar ? 'h-16 w-96 rounded-full shadow border-2 px-[28rem] mt-8 relative transition-all duration-100' :
                "w-[25rem] h-12 rounded-full shadow border-2 relative transition-all duration-1000"}>
                {/* Content 1 */}
                <div className={!navbar ? 'absolute h-16 flex items-center pl-[5%] left-0 top-1/2 -translate-y-1/2 min-w-64 justify-between cursor-pointer hover:bg-gray-400 hover:bg-opacity-20 rounded-full' :
                  'absolute flex items-center w-[30%] top-1/2 -translate-y-1/2 justify-center left-0 cursor-pointer'}>
                  <div className={!navbar ? 'flex flex-col items-left justify-center' : ""}>
                    <span className={!navbar ? 'text-[12px] font-semibold' : "text-sm font-semibold"}>{!navbar ? "Where" : "Anywhere"}</span>
                    <input type="search" placeholder="Search Destination" className={!navbar ? 'text-sm bg-transparent border-none outline-none' : "hidden"} />
                  </div>
                  <div className='h-8 w-[0.1px] bg-gray-400 absolute right-0'></div>
                </div>
                {/* Content 2 */}
                <div className={!navbar ? 'absolute flex items-center left-[28%] pl-[4%] h-16 top-1/2 -translate-y-1/2 w-[20%] justify-between cursor-pointer hover:bg-gray-400 hover:bg-opacity-20 rounded-full' :
                  'absolute flex items-center w-[30%] top-1/2 -translate-y-1/2 justify-center left-[30%]'}>
                  <div>
                    <span className={!navbar ? 'text-[12px] font-semibold' : "text-sm font-semibold"}>{!navbar ? "Check in" : "Any week"}</span>
                    <p className={!navbar ? 'text-sm' : "hidden"}>Add dates</p>
                  </div>
                  <div className='h-8 w-[0.1px] bg-gray-400 absolute right-0'></div>
                </div>
                {/* Content 3 */}
                <div className={!navbar ? 'absolute flex items-center left-[47%] pl-[4%] h-16 top-1/2 -translate-y-1/2 w-[20%] justify-between cursor-pointer hover:bg-gray-400 hover:bg-opacity-20 rounded-full' : 'hidden'}>
                  <div>
                    <span className='text-[12px] font-semibold'>Check Out</span>
                    <p className='text-sm'>Add dates</p>
                  </div>
                  <div className='h-8 w-[0.1px] bg-gray-400'></div>
                </div>
                {/* Content 4 */}
                <div className={!navbar ? 'absolute flex items-center left-[66%] pl-[4%] pr-[1%] top-1/2 -translate-y-1/2 justify-between w-[34%] h-16 cursor-pointer hover:bg-gray-400 hover:bg-opacity-20 rounded-full' :
                  'absolute flex items-center w-[40%] top-1/2 -translate-y-1/2 justify-between right-0'}>
                  <div>
                    <span className={!navbar ? 'text-[12px] font-semibold' :
                      "text-sm text-gray-400 font-semibold ml-4"}>{!navbar ? "Who" : "Add guests"}</span>
                    <p className={!navbar ? 'text-sm' : "hidden"}>Add guests</p>
                  </div>
                  <div className={!navbar ? 'w-12 h-12 rounded-full bg-orange-600 border-none relative' :
                    'w-8 h-8 rounded-full bg-orange-600 border-none relative mr-1'}>
                    <img className={!navbar ? "size-6 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2" :
                      "size-4 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"} src={assets.search} alt="search" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Account Dropdown */}
          <div className='flex flex-row items-center gap-4 font-airbnb' ref={catMenu}>
            <div className='text-sm font-semibold'>
              <p>Airbnb your home</p>
            </div>
            <div>
              <img className="size-5" src={assets.globe} alt="globe" />
            </div>
            <div className='h-12 w-[5.5rem] rounded-full border-gray-400 border-2 relative'>
              {/* Hamburger */}
              <div className='flex flex-col gap-1 top-1/2 -translate-y-1/2 left-4 absolute cursor-pointer hamburger-container' onClick={() => SetOpen(!open)}>
                <div className='h-[0.1px] w-3 bg-black '></div>
                <div className='h-[0.1px] w-3 bg-black '></div>
                <div className='h-[0.1px] w-3 bg-black '></div>
              </div>
              {/* Profile Pic */}
              <div className='absolute top-1/2 -translate-y-1/2 right-1'>
                <img className="size-10" src={assets.user} alt="" />
              </div>
            </div>
            {/* Dropdown open */}
            <div className={open ? 'absolute top-20 right-20 py-5 bg-slate-50 shadow rounded-md w-56 z-50 dropdown-menu' : "hidden"}>
              <div className='flex flex-col gap-2 text-sm font-normal'>
                <p className={select === "Sign up" ? "font-semibold cursor-pointer  hover:bg-gray-400 hover:bg-opacity-10 py-3 px-5" :
                  "cursor-pointer hover:bg-gray-400 hover:bg-opacity-10 py-3 px-5"} onClick={() => setSelect("Sign up")} >Sign up</p>
                <p className={select === "Log in" ? "font-semibold cursor-pointer  hover:bg-gray-400 hover:bg-opacity-10 py-3 px-5" :
                  "cursor-pointer hover:bg-gray-400 hover:bg-opacity-10 py-3 px-5"} onClick={() => setSelect("Log in")}>Log in</p>
                <hr />
                <p className={select === "Gift Cards" ? "font-semibold cursor-pointer hover:bg-gray-400 hover:bg-opacity-10 py-3 px-5" :
                  "cursor-pointer hover:bg-gray-400 hover:bg-opacity-10 py-3 px-5"} onClick={() => setSelect("Gift Cards")}>Gift Cards</p>
                <p className={select === "Airbnb" ? "font-semibold cursor-pointer hover:bg-gray-400 hover:bg-opacity-10 py-3 px-5" :
                  "cursor-pointer hover:bg-gray-400 hover:bg-opacity-10 py-3 px-5"} onClick={() => setSelect("Airbnb")}>Airbnb your home</p>
                <p className={select === "Help" ? "font-semibold cursor-pointer hover:bg-gray-400 hover:bg-opacity-10 py-3 px-5" :
                  "cursor-pointer hover:bg-gray-400 hover:bg-opacity-10 py-3 px-5"} onClick={() => setSelect("Help")}>Help Center</p>
              </div>
            </div>
          </div>
          <hr className={!navbar ? 'absolute w-full mt-64 left-1/2 -translate-x-1/2' : "absolute w-full mt-24 pr-20 left-1/2 -translate-x-1/2"}></hr>
        </div>
      </div>
      {/* Travel Contianer */}
      <div className={!navbar ? 'relative font-airbnb' : 'fixed top-24 right-0 left-0 z-50 transition-all bg-white font-airbnb'}>
        <div ref={travelContainerRef} className='flex flex-row gap-10 mx-28 relative overflow-hidden pb-5'>
          <div onClick={leftClick}
            className={scrollActive !== 0 ? 'sticky left-0  h-8 px-2 rounded-full border-[1px] border-gray-400 flex justify-center items-center bg-white z-10 cursor-pointer' :
              "hidden"}>
            <p className='text-lg'>{"<"}</p>
          </div>
          {/* Travel item and description */}
          {travel.map((item, index) => {
            return (
              <div key={index} className='flex flex-col justify-center items-center'>

                {/* Image */}
                <div>
                  <img className='size-7 opacity-60' src={item.image} alt={item.title} />
                </div>
                {/* item title */}
                <div>
                  <p className='text-[12px] text-nowrap opacity-80'>{item.title}</p>
                </div>

              </div>
            )
          })}
          <div onClick={rightClick}
            className={scrollActive !== 1 ? 'sticky right-0 h-8 px-2 rounded-full border-[1px] border-gray-400 flex justify-center items-center bg-white z-10 cursor-pointer' :
              "hidden"}>
            <p className='text-lg'>{">"}</p>
          </div>
        </div>
      </div>
      {/* Travel Catalouge */}
      <div className='mt-8 relative font-airbnb'>
        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-80 h-96 mx-20'>
          {travel_cat.map((item, index) => {
            return (
              <div key={index} className='flex flex-row justify-center items-center relative'>
                {/* Image */}
                <div className=''>
                  {item.image.length > 1 ?
                    <Travel_Catalouge image={item.image} index={index}></Travel_Catalouge> :
                    <div>
                      <img className='size-24 object-cover w-full h-72 rounded-lg absolute top-0 left-0' src={item.image[0]} alt={item.title} />
                    </div>}

                </div>
                {/* item title */}
                <div>
                  <p className='text-md text-nowrap absolute bottom-14 left-0 font-semibold font-sans w-full truncate overflow-hidden whitespace-nowrap'>{item.title}</p>
                </div>
                <div>
                  <p className='absolute bottom-8 left-0 text-slate-400'>{item.Host}</p>
                </div>
                <div>
                  <p className='absolute bottom-2 left-0 font-medium'>{item.Date}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      {/* Past Experience */}

      <div className='mt-8 relative font-airbnb'>
        <div className='mx-20'>
          <p className='font-semibold text-4xl'>Past Experiences</p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-x-9 gap-y-6 mx-20 my-8 relative'>
          {past_experience.map((item, index) => {
            return (
              <div key={index} className='flex flex-row justify-center items-center relative h-96'>
                {/* Image */}
                <div className=''>
                  {item.image.length > 1 ?
                    <PageExperience image={item.image} index={index}></PageExperience> :
                    <div>
                      <img className='size-24 object-cover w-full h-72 rounded-lg absolute top-0 left-0' src={item.image[0]} alt={item.title} />
                    </div>}
                </div>
                {/* item title */}
                <div>
                  <p className='text-md text-nowrap absolute bottom-14 left-0 font-semibold font-sans w-full truncate overflow-hidden whitespace-nowrap'>{item.title}</p>
                </div>
                <div>
                  <p className='absolute bottom-8 left-0 text-slate-400'>{item.Host}</p>
                </div>
                <div>
                  <p className='absolute bottom-2 left-0 font-medium'>{item.Date}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      {/* Future Inspiration */}
      <div className='bg-gray-400 bg-opacity-10 font-airbnb pb-10'>
        {/* Header */}
        <div className='mx-20'>
          <p className='pt-10 font-semibold text-2xl'>Insipiration for future getaways</p>
        </div>
        {/* Horizontal Menus */}
        <div className='mt-5 mx-20'>
          <div className='flex flex-row gap-5 font-medium text-gray-500 text-opacity-80'>
            <p>Popular</p>
            <p>Arts & Culture</p>
            <p>Outdoors</p>
            <p>Mountains</p>
            <p>Beach</p>
            <p>Unique stays</p>
            <p>Categories</p>
            <p>Things to do</p>
            <p>Travel tips and inspiration</p>
            <p>Airbnb-friendly apartments</p>
          </div>
          <hr className='mt-5'></hr>
        </div>
        {/* Vertical Menus */}
        {/* Vertical Menus */}
        <div className='mt-8 mx-20 relative'>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-y-6'>
            {show ? future.map((item, index) => {
              return (
                <div>
                  <p className='font-medium'>{item.title}</p>
                  <p className='text-gray-400 text-sm font-light'>{item.description}</p>
                </div>
              )
            }) : future.slice(0, 17).map((item, index) => {
              return (
                <div>
                  <p className='font-medium'>{item.title}</p>
                  <p className='text-gray-400 text-sm font-light'>{item.description}</p>
                </div>
              )
            })}
          </div>
          {future.length > 17 && !show && (
            <p className={!show ? 'font-medium absolute right-36 bottom-12 cursor-pointer' : "hidden"} onClick={() => setShow(true)}>Show more <span className='rotate-270'>{">"}</span></p>
          )}
          <hr className='mt-8 bg-slate-400' />
        </div>
        {/* Footer */}
        <div className='mx-20 mt-8'>
          <div className='grid grid-cols-3'>
            <div className='flex flex-col gap-3'>
              <p>Support</p>
              <p className='text-sm text-slate-500'>Help Center</p>
              <p className='text-sm text-slate-500'>AirCover</p>
              <p className='text-sm text-slate-500'>Anti-discrimination</p>
              <p className='text-sm text-slate-500'>Disability support</p>
              <p className='text-sm text-slate-500'>Cancellation options</p>
              <p className='text-sm text-slate-500'>Report neighbourhood concern</p>
            </div>
            <div className='flex flex-col gap-3'>
              <p>Hosting</p>
              <p className='text-sm text-slate-500'>Airbnb your home</p>
              <p className='text-sm text-slate-500'>AirCover for Hosts</p>
              <p className='text-sm text-slate-500'>Hosting resources</p>
              <p className='text-sm text-slate-500'>Community forum</p>
              <p className='text-sm text-slate-500'>Hosting responsibly</p>
              <p className='text-sm text-slate-500'>Airbnb-friendly apartments</p>
              <p className='text-sm text-slate-500'>Join a free Hosting class</p>
            </div>
            <div className='flex flex-col gap-3'>
              <p>Airbnb</p>
              <p className='text-sm text-slate-500'>Newsroom</p>
              <p className='text-sm text-slate-500'>New features</p>
              <p className='text-sm text-slate-500'>Careers</p>
              <p className='text-sm text-slate-500'>Investors</p>
              <p className='text-sm text-slate-500'>Gift cards</p>
              <p className='text-sm text-slate-500'>Airbnb.org emergency stats</p>
            </div>
          </div>
            <hr className='mt-8'/>
        </div>
        <div className='flex flex-row justify-between items-center mx-20 mt-8'>
          <div className='flex flex-row justify-center items-center gap-2'>
            <p className='text-sm'>&copy; 2024 Airbnb,Inc.</p>
            <p >.</p>
            <p className='text-sm'>Terms</p>
            <p>.</p>
            <p className='text-sm'>Sitemap</p>
            <p>.</p>
            <p className='text-sm'>Privacy</p>
            <p>.</p>
            <p className='text-sm'>Your Privacy Choices</p>
          </div>
          <div className='flex flex-row justify-center items-center gap-3'>
            <img className="size-5" src={assets.globe} alt="" />
            <p>English(US)</p>
            <p>$ USD</p>
            <img className="size-5" src={assets.facebook} alt="facebook" />
            <img className="size-5" src={assets.twitter} alt="twitter" />
            <img className="size-5" src={assets.instagram} alt="instagram" />
          </div>
        </div>
      </div >
    </>
  )
}

export default App