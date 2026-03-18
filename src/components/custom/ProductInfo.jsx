import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    IconStar,
    IconStarFilled,
    IconMinus,
    IconPlus,
    IconCheck,
    IconTruck,
    IconClock
} from '@tabler/icons-react';
import { addItem } from '@/redux/slice/basketSlice';
import { toggleWishlist } from '@/redux/slice/wishlistSlice';
import { toggleCompare } from '@/redux/slice/compareSlice';
import { setCompareModalOpen, setAuthOpen } from '@/redux/slice/uiSlice';
import { useNavigate } from 'react-router';

export const ProductInfo = ({ product, quantity, handleQuantityChange }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const wishlistItems = useSelector(state => state.wishlist.items);
    const compareItems = useSelector(state => state.compare.items);

    const isInWishlist = wishlistItems.some(item => item._id === product._id);
    const isInCompare = compareItems.some(item => item._id === product._id);

    const handleCompare = () => {
        dispatch(toggleCompare(product));
        if (!isInCompare && compareItems.length === 1) {
            dispatch(setCompareModalOpen(true));
        }
    };
    return (
        <div className="flex-1 space-y-7">
            <div className="space-y-4">
                <h2 className="font-orbitron font-bold text-[27px] text-gray-900">{product.name}</h2>
                <div className="text-[30px] font-bold text-gray-900">${product.price.toFixed(2)}</div>
            </div>

            <p className="text-gray-600 text-[15px] leading-relaxed font-medium">
                {product.description}
            </p>
            <div className="flex items-center gap-2 text-green-500 font-bold text-[14px]">
                <div className="w-5 h-5 rounded-full border-2 border-green-500 flex items-center justify-center">
                    <IconCheck size={12} strokeWidth={4} />
                </div>
                {product.stock} In stock
            </div>
            <div className="flex items-center gap-4">
                <div className="flex items-center bg-[#f0f0f0] rounded-lg p-[3px]">
                    <button onClick={() => handleQuantityChange('dec')} className="p-3 text-gray-500 hover:text-gray-900 cursor-pointer transition-colors">
                        <IconMinus size={18} />
                    </button>
                    <span className="w-10 text-center font-bold text-gray-900">{quantity}</span>
                    <button onClick={() => handleQuantityChange('inc')} className="p-3 text-gray-500 hover:text-gray-900 cursor-pointer transition-colors">
                        <IconPlus size={18} />
                    </button>
                </div>

                <button
                    onClick={() => dispatch(addItem({ product, quantity }))}
                    className="flex-1 bg-gray-900 hover:bg-[#ff0080] text-white h-[50px] rounded-full font-bold uppercase text-[14px] tracking-wider cursor-pointer transition-all"
                >
                    Add To Basket
                </button>

                <button
                    onClick={() => dispatch(toggleWishlist(product))}
                    className={`w-[50px] h-[50px] rounded-full flex items-center justify-center cursor-pointer transition-colors ${isInWishlist ? 'bg-[#ff0080] text-white' : 'bg-[#f0f0f0] text-gray-500 hover:text-[#ff0080]'}`}
                >
                    {isInWishlist ? <IconStarFilled size={20} /> : <IconStar size={20} />}
                </button>
            </div>

            <button
                onClick={() => {
                    const token = localStorage.getItem('token');
                    if (!token) {
                        // navigate('/');
                        dispatch(setAuthOpen(true));
                        import('react-hot-toast').then(({ default: toast }) => {
                            toast.error("You must be logged in to place an order.");
                        });
                    } else {
                        navigate('/checkout');
                    }
                }}
                className="w-full h-[54px] rounded-full bg-gradient-to-r from-[#b851f5] to-[#f551b8] text-white font-bold text-[15px] tracking-[0.1em] shadow-lg shadow-pink-200 hover:brightness-105 cursor-pointer transition-all">
                Buy It Now
            </button>

            <div className="bg-[#f8f9fb] p-8 rounded-[12px] text-center border border-gray-50 mt-4">
                <div className="text-[14px] font-bold text-gray-900 uppercase tracking-widest mb-6">Guarantee safe & secure checkout</div>
                <div className="flex items-center justify-center gap-6 flex-wrap">
                    <img src="/img/VisaLogo.png" alt="Visa" className="h-[30px] w-auto object-contain hover:scale-[1.2] cursor-pointer opacity-80 hover:opacity-100 transition-opacity" />
                    <img src="/img/MasterCard.png" alt="Master Card" className="h-[25px] w-auto object-contain hover:scale-[1.2] cursor-pointer opacity-80 hover:opacity-100 transition-opacity" />
                    <img src="/img/PayPal.png" alt="Pay Pal" className="h-[25px] w-auto object-contain hover:scale-[1.2] cursor-pointer opacity-80 hover:opacity-100 transition-opacity" />
                    <img src="/img/DBS.png" alt="DBS" className="h-[35px] w-auto object-contain hover:scale-[1.2] cursor-pointer opacity-80 hover:opacity-100 transition-opacity" />
                </div>
            </div>

            <div className="space-y-4 pt-2">
                <div className="flex items-center gap-3 text-[15px] text-gray-600">
                    <IconClock size={20} className="text-gray-900" />
                    <span className="font-bold text-gray-900">Estimated Delivery:</span> 18 - 19 Feb, 2026.
                </div>
                <div className="flex items-center gap-3 text-[15px] text-gray-600">
                    <IconTruck size={20} className="text-gray-900" />
                    <span className="font-bold text-gray-900">Free Shipping & Returns:</span> On all order.
                </div>
            </div>

            <div className="pt-8 border-t border-gray-100 space-y-3 text-[14px]">
                <div><span className="text-gray-900 font-bold uppercase tracking-widest mr-2">SKU:</span> <span className="text-gray-500 font-medium">{product.sku || 'N/A'}</span></div>
                <div><span className="text-gray-900 font-bold uppercase tracking-widest mr-2">Category:</span> <span className="text-gray-500 font-medium">{product.category?.name || 'Uncategorized'}</span></div>
                {product.tags?.length > 0 && (
                    <div><span className="text-gray-900 font-bold uppercase tracking-widest mr-2">Tags:</span> <span className="text-gray-500 font-medium">{product.tags.join(', ')}</span></div>
                )}
            </div>
        </div>
    );
};
