import React, { useState } from 'react';
import { ProductDescriptionTab } from '../../components/ui/tabs/ProductDescriptionTab';
import { ProductReviewsTab } from '../../components/ui/tabs/ProductReviewsTab';

export const ProductTabsSection = () => {
    const [activeTab, setActiveTab] = useState('description');

    const product = {
        name: "IMMERSION XTREME PRO"
    };

    return (
        <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 font-inter border-t border-gray-50">
            <div className="container mx-auto max-w-[1200px]">
                {/* Tabs Navigation */}
                <div className="flex items-center gap-12 mb-12 border-b border-gray-100">
                    <button
                        onClick={() => setActiveTab('description')}
                        className={`pb-4 text-[17px] font-orbitron font-bold uppercase tracking-wider transition-all relative group cursor-pointer ${activeTab === 'description' ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                        Description
                        {activeTab === 'description' && (
                            <div className="absolute bottom-0 left-0 w-full h-[6px] bg-[#f551b8] shadow-[0_0_15px_rgba(245,81,184,0.4)]" />
                        )}
                        {/* Hover Highlight (matches previous user adjustment but refined) */}
                        <div className="absolute top-[2px] left-[-4px] right-[-4px] h-[15px] bg-[#FFDBEE] -z-10 blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity active:opacity-100 rounded-full" />
                    </button>
                    <button
                        onClick={() => setActiveTab('reviews')}
                        className={`pb-4 text-[17px] font-orbitron font-bold uppercase tracking-wider transition-all relative group cursor-pointer ${activeTab === 'reviews' ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                        Reviews <span className="text-[12px] align-top ml-1 text-gray-500 font-medium">(0)</span>
                        {activeTab === 'reviews' && (
                            <div className="absolute bottom-0 left-0 w-full h-[6px] bg-[#f551b8] shadow-[0_0_15px_rgba(245,81,184,0.4)]" />
                        )}
                        <div className="absolute top-[2px] left-[-4px] right-[-4px] h-[15px] bg-[#FFDBEE] -z-10 blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity active:opacity-100 rounded-full" />
                    </button>
                </div>

                {/* Tab Content */}
                <div>
                    {activeTab === 'description' ? (
                        <ProductDescriptionTab />
                    ) : (
                        <ProductReviewsTab productName={product.name} />
                    )}
                </div>
            </div>
        </section>
    );
};
