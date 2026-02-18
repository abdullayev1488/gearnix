import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { useEffect } from 'react';
import { useState } from 'react';


export const ShopCarouselSection = () => {

    const [categories, setCategories] = useState([])

    useEffect(() => {
        fetch("http://localhost:3000/category/all")
            .then(res => res.json())
            .then(data => setCategories(data.data))
    }
        , [])

    return (
        <section className="relative pb-12 md:pb-20 top-[-60px] overflow-x-hidden">
            <div className="container mx-auto px-10 md:px-4 relative">
                {/* Custom Navigation Arrows */}
                <button className="swiper-prev absolute left-1 md:left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-10 md:h-10 bg-white/90 rounded-full flex items-center justify-center shadow-md border border-gray-200 hover:bg-[#ff512f] hover:text-white transition-all cursor-pointer text-gray-600">
                    <IconChevronLeft size={20} />
                </button>
                <button className="swiper-next absolute right-1 md:right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-10 md:h-10 bg-white/90 rounded-full flex items-center justify-center shadow-md border border-gray-200 hover:bg-[#ff512f] hover:text-white transition-all cursor-pointer text-gray-600">
                    <IconChevronRight size={20} />
                </button>

                <Swiper
                    modules={[Navigation, Autoplay]}
                    navigation={{
                        prevEl: '.swiper-prev',
                        nextEl: '.swiper-next',
                    }}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                    spaceBetween={20}
                    slidesPerView={1}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                        },
                        768: {
                            slidesPerView: 3,
                        },
                        1024: {
                            slidesPerView: 4,
                        }
                    }}
                    className="category-swiper"
                >
                    {categories.map(category => (
                        <SwiperSlide key={category.id}>
                            <div className="flex flex-col items-center group cursor-pointer">
                                {/* Circular Image Container */}
                                <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden bg-gray-50 mb-6 border-4 border-transparent group-hover:border-[#ff512f]/10 transition-all duration-300 shadow-md">
                                    <img
                                        src={category.images.shop}
                                        alt={category.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                {/* Text Content */}
                                <h3 className="font-orbitron !text-[14px] font-bold text-[#1A1A1A] mb-1 uppercase tracking-tight">
                                    {category.name}
                                </h3>
                                <p className="text-[12px] text-[#888] font-medium uppercase tracking-wider">
                                    Product (20)
                                </p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};
