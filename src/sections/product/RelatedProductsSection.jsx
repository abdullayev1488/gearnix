import { useRef } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import { products } from '../../const';
import { ProductCard } from '../../components/ui/cards/ProductCard';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

export const RelatedProductsSection = () => {
    // Show a selection of products as "related"
    const relatedProducts = products.slice(0, 10);

    return (
        <section className="py-20 max-w-screen-2xl mx-auto px-4 overflow-hidden relative border-t border-gray-50">
            {/* Header with Tab Style Title */}
            <div className="flex items-center justify-between mb-16">
                <div className="relative group">
                    <h2 className="text-[17px] font-orbitron font-bold uppercase tracking-wider text-gray-900 pb-4 relative z-10 transition-all">
                        Related Products
                    </h2>

                    {/* Background Highlight */}
                    <div className="absolute top-[10px] left-[-4px] right-[-4px] h-[15px] bg-[#FFDBEE] -z-10 blur-[1px] rounded-[3px]" />
                </div>

                {/* Custom Pagination Container */}
                <div className="related-pagination flex justify-end !static !w-auto"></div>
            </div>

            <Swiper
                slidesPerView={1}
                spaceBetween={25}
                loop={true}
                pagination={{
                    clickable: true,
                    el: '.related-pagination',
                    bulletClass: 'swiper-pagination-bullet !mx-1 !opacity-100 !bg-gray-200 transition-all duration-300',
                    bulletActiveClass: '!bg-[#f551b8] !w-6 !rounded-full',
                }}
                navigation={{
                    prevEl: '.related-prev',
                    nextEl: '.related-next',
                }}
                breakpoints={{
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                    1280: { slidesPerView: 4 },
                }}
                modules={[Pagination, Navigation]}
                className="related-products-swiper !overflow-visible"
            >
                {relatedProducts.map((product) => (
                    <SwiperSlide key={product.id} className="pb-4">
                        <ProductCard product={product} />
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Navigation Buttons Below */}
            <div className="flex justify-center gap-4 mt-12">
                <button
                    className="related-prev w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center cursor-pointer hover:bg-[#f551b8] hover:border-[#f551b8] hover:text-white transition-all duration-300 shadow-sm"
                >
                    <IconChevronLeft size={24} />
                </button>
                <button
                    className="related-next w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center cursor-pointer hover:bg-[#f551b8] hover:border-[#f551b8] hover:text-white transition-all duration-300 shadow-sm"
                >
                    <IconChevronRight size={24} />
                </button>
            </div>
        </section>
    );
};
