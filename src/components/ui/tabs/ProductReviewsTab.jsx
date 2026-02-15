import React, { useState } from 'react';
import { IconStar } from '@tabler/icons-react';

export const ProductReviewsTab = ({ productName = "IMMERSION XTREME PRO" }) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    return (
        <div className="animate-in fade-in duration-500 space-y-10 max-w-[1200px]">
            {/* Header */}
            <div className="space-y-2">
                <p className="text-[14px] text-gray-600 font-medium">There are no reviews yet.</p>
                <h3 className="text-[18px] font-popp font-[700] text-gray-900 uppercase tracking-tighter">
                    Be the first to review "{productName}"
                </h3>
            </div>

            {/* Form Instructions */}
            <p className="text-[14px] text-gray-500 font-medium">
                Your email address will not be published. Required fields are marked *
            </p>

            {/* Rating Section */}
            <div className="space-y-3">
                <label className="text-[15px] font-bold text-gray-900">Your rating </label>
                <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            className="cursor-pointer transition-transform hover:scale-110"
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHover(star)}
                            onMouseLeave={() => setHover(rating)}
                        >
                            <IconStar className='text-[#ffb800] mt-[5px]'
                                size={19}
                                fill={(hover || rating) >= star ? "#ffb800" : "none"}
                                stroke={(hover || rating) >= star ? "#ffb800" : "#d1d5db"}
                                strokeWidth={2}
                            />
                        </button>
                    ))}
                </div>
            </div>

            {/* Form Fields */}
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-3">
                    <label className="text-[15px] font-bold text-gray-900">Your review *</label>
                    <textarea
                        className="w-full bg-white border border-gray-200 rounded-lg p-5 min-h-[180px] focus:border-gray-400 outline-none transition-colors text-[15px] text-gray-600 font-medium"
                        placeholder=""
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                        <label className="text-[15px] font-bold text-gray-900">Name *</label>
                        <input
                            type="text"
                            className="w-full h-[54px] bg-white border border-gray-200 rounded-lg px-5 focus:border-gray-400 outline-none transition-colors text-[15px] text-gray-600 font-medium"
                            placeholder=""
                        />
                    </div>
                    <div className="space-y-3">
                        <label className="text-[15px] font-bold text-gray-900">Email *</label>
                        <input
                            type="email"
                            className="w-full h-[54px] bg-white border border-gray-200 rounded-lg px-5 focus:border-gray-400 outline-none transition-colors text-[15px] text-gray-600 font-medium"
                            placeholder=""
                        />
                    </div>
                </div>

                {/* Checkbox */}
                <div className="flex items-center gap-3">
                    <div className="relative flex items-center">
                        <input
                            type="checkbox"
                            id="save-info"
                            className="w-5 h-5 border-gray-200 rounded cursor-pointer accent-black"
                        />
                    </div>
                    <label htmlFor="save-info" className="text-[14px] text-gray-500 font-medium cursor-pointer">
                        Save my name, email, and website in this browser for the next time I comment.
                    </label>
                </div>

                {/* Submit Button */}
                <button className="w-full md:w-fit px-12 h-[50px] bg-[#1a1a1a] text-white font-orbitron font-bold text-[13px] uppercase tracking-widest hover:bg-black transition-colors rounded-lg cursor-pointer">
                    Submit
                </button>
            </form>
        </div>
    );
};
