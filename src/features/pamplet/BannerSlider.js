import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './banner-slider.scss';
import { ArrowLeftIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { createCancelToken } from '../../app/constants/common-function';
import { getBanners } from '../products/productAPI';
import { Link } from 'react-router-dom';

const BannerSlider = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const cancelTokenSource = createCancelToken();

    if (isMounted) {
      const fetchBanners = async () => {
        try {
          const data = await getBanners("homepage-top");
          setBanners(data);
        } catch (err) {
          if (err.message !== 'Request canceled' && isMounted) {
          }
        }
      }

      fetchBanners();
    }
    return () => {
      isMounted = false;
      cancelTokenSource.cancel("Requests Canceled.")
    }
  }, []);
  return (
    <div className="banner-slider">
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{ delay: 3000 }}
        pagination={{ clickable: true }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.update();
        }}
        loop
        modules={[Navigation, Pagination, Autoplay]}
      >
        {
          banners?.map((item, index) => (
            <SwiperSlide key={index}>
              <Link to={item.link}>
                <img src={item.imageUrl} alt="Slide 1" />
              </Link>
            </SwiperSlide>
          ))
        }
        <div ref={prevRef} className="swiper-button-prev shadow-md rounded-tr-sm rounded-br-sm bg-white w-10 h-24 absolute top-36 transform -translate-y-1/2 left-0 z-10">
          <ChevronLeftIcon className="w-4 h-4 p-3 text-gray-500" />
        </div>
        <div ref={nextRef} className="swiper-button-next shadow-md rounded-tl-sm rounded-bl-sm bg-white w-10 h-24 absolute top-36 transform -translate-y-1/2 right-0 z-10">
          <ChevronRightIcon className="w-4 h-4 p-3 text-gray-500" />
        </div>
      </Swiper>
    </div>
  );
};

export default BannerSlider;
