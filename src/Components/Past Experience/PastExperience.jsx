import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import './PastExperience.css'
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';

const PageExperience = ({ image, index }) => {
  const uniqueKey = `swiper-${index}`;
  const [activeIndexi, setActiveIndex] = useState(0);

  const updateActiveIndex = (swiper) => {
    setActiveIndex(swiper.realIndex);
  };

  const getBulletClass = (bulletIndex) => {
    const relativeIndex = (activeIndexi % 3 + 3) % 3; // Calculate the relative index within the first three bullets
    return bulletIndex === relativeIndex ? 'swiper-pagination-bullet-active' : '';
  };

  return (
    <div>
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        navigation={{
          nextEl: `.${uniqueKey}-swiper-custom-button-next`,
          prevEl: `.${uniqueKey}-swiper-custom-button-prev`,
        }}
        slidesPerView={1}
        spaceBetween={0}
        loop={true}
        mousewheel={true}
        cssMode={true}
        onSlideChange={updateActiveIndex}
        className="absolute w-[280px] top-0 left-0"
      >
        {image.map((img, val) => (
          <SwiperSlide key={val}>
            <div className='group'>
              <img className='size-24 object-cover w-full h-72 rounded-lg' src={img} alt={`Slide ${val}`} />
              <button
                className={`${uniqueKey}-swiper-custom-button-next text-sm px-2 py-1 mx-1 rounded-full bg-gray-200 absolute right-0 z-10 top-1/2 -translate-y-1/2 opacity-0 bg-opacity-70 group-hover:opacity-100 hover:bg-opacity-100`}
              >
                {">"}
              </button>
              <button
                className={`${uniqueKey}-swiper-custom-button-prev text-sm px-2 py-1 mx-1 rounded-full bg-gray-200 absolute left-0 z-10 top-1/2 -translate-y-1/2 opacity-0 bg-opacity-70 group-hover:opacity-100 hover:bg-opacity-100`}
              >
                {"<"}
              </button>
            </div>
          </SwiperSlide>
        ))}
        <div className={`${uniqueKey}-swiper-pagination swiper-pagination custom-pagination`}>
          {Array.from({ length: 3 }).map((_, bulletIndex) => (
            <span
              key={bulletIndex}
              className={`swiper-pagination-bullet ${getBulletClass(bulletIndex)}`}
            ></span>
          ))}
        </div>
      </Swiper>
    </div>
  );
};

export default PageExperience;
