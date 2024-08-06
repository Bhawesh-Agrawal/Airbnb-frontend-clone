import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import 'swiper/css';
import "swiper/css/pagination";
import "swiper/css/navigation";
import 'swiper/css/scrollbar';
import React from 'react'

const Travel_Catalouge = ({ image, index }) => {
    const uniqueKey = `swiper-${index}`;
    return (
        <div>
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                navigation={{
                    nextEl: `.${uniqueKey}-swiper-button-next`,
                    prevEl: `.${uniqueKey}-swiper-button-prev`
                }}
                slidesPerView={1}
                spaceBetween={0}
                loop={true}
                mousewheel={true}
                cssMode={true}
                scrollbar={{ draggable: true }}
                pagination={{ clickable: true }}
                className="absolute w-[280px] top-0 left-0"
            >
                {image.map((image, val) => {
                    return (
                        <div className=''>
                            <SwiperSlide key={val}>
                                <div className='group'>
                                    <img className='size-24 object-cover w-full h-72 rounded-lg' src={image} />
                                    <div>
                                        <button className={`${uniqueKey}-swiper-button-next to-white text-sm px-2 py-1 mx-1 rounded-full bg-gray-200 absolute right-0 z-10 
                                        top-1/2 -translate-y-1/2 opacity-0 bg-opacity-70 group-hover:opacity-100 hover:bg-opacity-100`}>{">"}</button>
                                    </div>
                                    <div>
                                        <button className={`${uniqueKey}-swiper-button-prev to-white text-sm px-2 py-1 mx-1 rounded-full bg-gray-200 absolute 
                                        left-0 z-10 top-1/2 -translate-y-1/2 opacity-0 bg-opacity-70 group-hover:opacity-100 hover:bg-opacity-100`}>{"<"}</button>
                                    </div>
                                </div>
                            </SwiperSlide>
                        </div>
                    )
                })}
            </Swiper>
        </div>
    )
}

export default Travel_Catalouge