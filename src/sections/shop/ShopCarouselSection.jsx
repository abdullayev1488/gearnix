import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

export const ShopCarouselSection = () => {
    const categories = [
        {
            id: 1,
            title: "Accessories",
            count: "13 Products",
            image: "/img/ShopPageCarouselimg1.webp"
        },
        {
            id: 2,
            title: "Gaming controllers",
            count: "6 Products",
            image: "/img/ShopPageCarouselimg2.webp"
        },
        {
            id: 3,
            title: "Gaming Mouse",
            count: "10 Products",
            image: "/img/ShopPageCarouselimg3.webp"
        },
        {
            id: 4,
            title: "Keyboards",
            count: "9 Products",
            image: "/img/ShopPageCarouselimg4.webp"
        },
        {
            id: 5,
            title: "Headsets",
            count: "15 Products",
            image: "/img/ShopPageCarouselimg5.webp"
        }
    ];

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
                    {categories.map(cat => (
                        <SwiperSlide key={cat.id}>
                            <div className="flex flex-col items-center group cursor-pointer">
                                {/* Circular Image Container */}
                                <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden bg-gray-50 mb-6 border-4 border-transparent group-hover:border-[#ff512f]/10 transition-all duration-300 shadow-md">
                                    <img
                                        src={cat.image}
                                        alt={cat.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                {/* Text Content */}
                                <h3 className="font-orbitron !text-[14px] font-bold text-[#1A1A1A] mb-1 uppercase tracking-tight">
                                    {cat.title}
                                </h3>
                                <p className="text-[12px] text-[#888] font-medium uppercase tracking-wider">
                                    {cat.count}
                                </p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};
