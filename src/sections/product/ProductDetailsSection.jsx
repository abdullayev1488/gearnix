import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { ProductInfo } from '@/components/custom/ProductInfo';
import { ProductImgCarousel } from '@/components/ui/carousels/ProductImgCarousel';

export const ProductDetailsSection = () => {
    const navigate = useNavigate();
    const product = useSelector(state => state.ui.selectedProduct);
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [swiper, setSwiper] = useState(null);

    useEffect(() => {
        if (!product) {
            navigate('/shop');
        }
    }, [product, navigate]);

    if (!product) return null;

    const productImages = product.images?.length > 0 ? product.images : [product.image];

    const handleQuantityChange = (type) => {
        if (type === 'inc') setQuantity(prev => prev + 1);
        if (type === 'dec' && quantity > 1) setQuantity(prev => prev - 1);
    };

    const handleThumbnailClick = (index) => {
        setSelectedImage(index);
        if (swiper) {
            swiper.slideToLoop(index);
        }
    };

    return (
        <section className="bg-white py-12 px-4 sm:px-6 lg:px-8 font-inter">
            <div className="container mx-auto">
                <div className="flex items-center gap-2 text-[13px] text-gray-400 mb-8">
                    <Link to="/" className="hover:text-gray-900 cursor-pointer transition-colors">Home</Link>
                    <span className="text-gray-300">/</span>
                    <Link to="/shop" className="hover:text-gray-900 cursor-pointer transition-colors">Shop</Link>
                    <span className="text-gray-300">/</span>
                    <span className="text-gray-900 font-medium">{product.name}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[55%_1fr] gap-x-10 lg:gap-x-14 items-start">
                    <ProductImgCarousel
                        images={productImages}
                        productName={product.name}
                        selectedImage={selectedImage}
                        handleThumbnailClick={handleThumbnailClick}
                        setSelectedImage={setSelectedImage}
                        setSwiper={setSwiper}
                        swiper={swiper}
                    />
                    <ProductInfo
                        product={product}
                        quantity={quantity}
                        handleQuantityChange={handleQuantityChange}
                    />
                </div>
            </div>
        </section>
    );
};
