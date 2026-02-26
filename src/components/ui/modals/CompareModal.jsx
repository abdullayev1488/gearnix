import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IconX, IconShoppingCart, IconArrowsExchange, IconStarFilled, IconStar } from '@tabler/icons-react';
import { setCompareModalOpen } from '@/redux/slice/uiSlice';
import { toggleCompare, clearCompare } from '@/redux/slice/compareSlice';
import { addItem } from '@/redux/slice/basketSlice';

export const CompareModal = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();
    const { items: compareItems } = useSelector((state) => state.compare);

    if (!isOpen) return null;

    const handleClose = () => {
        dispatch(setCompareModalOpen(false));
        dispatch(clearCompare());
        if (onClose) onClose();
    };

    const handleAddToBasket = (product) => {
        dispatch(addItem({ product, quantity: 1 }));
    };

    return (
        <>
            {/* Backdrop */}
            <div
                onClick={handleClose}
                className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[1100] transition-all duration-500 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}
            />

            {/* Modal */}
            <div
                className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-[1000px] bg-white z-[1101] rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 ease-out flex flex-col max-h-[90vh] ${isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"}`}
            >
                {/* Header */}
                <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-[#F9FAFB]">
                    <div className="flex items-center gap-3 text-gray-900">
                        <IconArrowsExchange size={24} className="text-[#ff512f]" />
                        <h2 className="font-orbitron font-bold text-lg uppercase tracking-widest">
                            Product Comparison
                        </h2>
                    </div>
                    <button
                        onClick={handleClose}
                        className="p-2 bg-white hover:bg-[#ff512f] hover:text-white rounded-xl transition-all duration-300 shadow-sm cursor-pointer border border-gray-100"
                    >
                        <IconX size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-auto p-4 md:p-8">
                    {compareItems.length > 0 ? (
                        <div className="grid grid-cols-[150px_1fr_1fr] md:grid-cols-[200px_1fr_1fr] border border-gray-100 rounded-2xl overflow-hidden min-w-[600px]">
                            {/* Comparison Rows */}

                            {/* Images & Title */}
                            <div className="bg-gray-50/50 p-6 flex items-center border-b border-gray-100">
                                <span className="font-orbitron font-bold text-[11px] uppercase tracking-widest text-gray-400">Product</span>
                            </div>
                            {compareItems.slice(0, 2).map((item) => (
                                <div key={item._id} className="p-6 border-b border-l border-gray-100 text-center group">
                                    <div className="relative inline-block mb-4">
                                        <button
                                            onClick={() => dispatch(toggleCompare(item))}
                                            className="absolute -top-2 -right-2 p-1.5 bg-white text-gray-400 hover:text-red-500 rounded-full shadow-md border border-gray-100 opacity-0 group-hover:opacity-100 transition-all cursor-pointer z-10"
                                        >
                                            <IconX size={14} />
                                        </button>
                                        <div className="w-32 h-32 bg-[#F6F7F9] rounded-xl flex items-center justify-center p-4 transition-transform group-hover:scale-105">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                                        </div>
                                    </div>
                                    <h3 className="font-poppins font-bold text-gray-900 text-sm mb-3 line-clamp-2 min-h-[40px] uppercase">
                                        {item.name}
                                    </h3>
                                    <button
                                        onClick={() => handleAddToBasket(item)}
                                        className="w-full bg-black text-white py-2.5 rounded-xl font-orbitron font-bold text-[10px] uppercase tracking-wider hover:bg-[#ff512f] transition-all flex items-center justify-center gap-2 cursor-pointer"
                                    >
                                        <IconShoppingCart size={16} /> Add
                                    </button>
                                </div>
                            ))}

                            {/* Price */}
                            <div className="bg-gray-50/50 p-6 flex items-center border-b border-gray-100">
                                <span className="font-orbitron font-bold text-[11px] uppercase tracking-widest text-gray-400">Price</span>
                            </div>
                            {compareItems.slice(0, 2).map((item) => (
                                <div key={item._id} className="p-6 border-b border-l border-gray-100 text-center font-orbitron font-bold text-lg text-[#ff512f]">
                                    ${item.price.toFixed(2)}
                                </div>
                            ))}

                            {/* Rating */}
                            <div className="bg-gray-50/50 p-6 flex items-center border-b border-gray-100">
                                <span className="font-orbitron font-bold text-[11px] uppercase tracking-widest text-gray-400">Rating</span>
                            </div>
                            {compareItems.slice(0, 2).map((item) => (
                                <div key={item._id} className="p-6 border-b border-l border-gray-100 text-center">
                                    <div className="flex items-center justify-center gap-1 text-[#ff512f] mb-1">
                                        {[...Array(5)].map((_, i) => (
                                            i < Math.floor(item.rating || 0) ? (
                                                <IconStarFilled key={i} size={14} />
                                            ) : (
                                                <IconStar key={i} size={14} />
                                            )
                                        ))}
                                    </div>
                                    <span className="text-[10px] text-gray-400 font-bold">({item.reviews || 0} reviews)</span>
                                </div>
                            ))}

                            {/* Category */}
                            <div className="bg-gray-50/50 p-6 flex items-center border-b border-gray-100">
                                <span className="font-orbitron font-bold text-[11px] uppercase tracking-widest text-gray-400">Category</span>
                            </div>
                            {compareItems.slice(0, 2).map((item) => (
                                <div key={item._id} className="p-6 border-b border-l border-gray-100 text-center text-[13px] font-medium text-gray-600">
                                    {item.category?.name || 'Gears'}
                                </div>
                            ))}

                            {/* Stock Status */}
                            <div className="bg-gray-50/50 p-6 flex items-center">
                                <span className="font-orbitron font-bold text-[11px] uppercase tracking-widest text-gray-400">Availability</span>
                            </div>
                            {compareItems.slice(0, 2).map((item) => (
                                <div key={item._id} className="p-6 border-l border-gray-100 text-center">
                                    <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-[10px] font-bold uppercase tracking-widest">
                                        In Stock
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-20 text-center">
                            <IconArrowsExchange size={60} className="text-gray-200 mx-auto mb-4" />
                            <p className="text-gray-500 font-poppins">No items to compare.</p>
                        </div>
                    )}
                </div>

                {/* Footer Option */}
                {compareItems.length > 0 && (
                    <div className="p-6 border-t border-gray-100 flex justify-center bg-gray-50/30">
                        <button
                            onClick={() => {
                                handleClose();
                                window.location.href = '/compare';
                            }}
                            className="text-[12px] font-bold text-gray-500 hover:text-[#ff512f] transition-colors uppercase tracking-[0.2em] font-orbitron"
                        >
                            View Full Comparison Page
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};
