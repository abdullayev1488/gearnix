import React from 'react';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

export const ProductImgCarousel = ({
    images,
    productName,
    selectedImage,
    handleThumbnailClick,
    setSelectedImage,
    setSwiper,
    swiper
}) => {
    return (
        <div className="lg:sticky lg:top-32 lg:row-span-2 flex flex-col-reverse sm:flex-row gap-4 min-h-0 mb-10 lg:mb-0">
            {/* Thumbnails Sidebar */}
            <div className="flex sm:flex-col gap-3 min-w-[80px]">
                {images.map((img, index) => (
                    <button
                        key={index}
                        onClick={() => handleThumbnailClick(index)}
                        className={`w-[100px] h-[100px] rounded-xl overflow-hidden border-2 cursor-pointer transition-all p-1 bg-white ${selectedImage === index ? 'border-[#ff0080]' : 'border-gray-100'}`}
                    >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                ))}
            </div>

            {/* Main Image View with Swiper */}
            <div className="flex-1 bg-white border border-gray-100 rounded-[8px] overflow-hidden shadow-sm relative group h-fit">
                <Swiper
                    modules={[Navigation, Thumbs]}
                    loop={true}
                    onSwiper={setSwiper}
                    onSlideChange={(s) => setSelectedImage(s.realIndex)}
                    className="h-full"
                >
                    {images.map((img, index) => (
                        <SwiperSlide key={index} className="flex items-center justify-center p-12 h-full">
                            <img
                                src={img}
                                alt={productName}
                                className="w-full h-full object-contain select-none"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Custom Navigation Arrows */}
                <button
                    onClick={() => swiper?.slidePrev()}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white border border-gray-100 shadow-lg flex items-center justify-center text-gray-400 hover:text-gray-900 transition-all cursor-pointer opacity-0 group-hover:opacity-100"
                >
                    <IconChevronLeft size={24} strokeWidth={1.5} />
                </button>
                <button
                    onClick={() => swiper?.slideNext()}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white border border-gray-100 shadow-lg flex items-center justify-center text-gray-400 hover:text-gray-900 transition-all cursor-pointer opacity-0 group-hover:opacity-100"
                >
                    <IconChevronRight size={24} strokeWidth={1.5} />
                </button>
            </div>
        </div>
    );
};
