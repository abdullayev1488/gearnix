import React from 'react';

export const ProductDescriptionTab = () => {
    const specifics = [
        { label: "Brand", value: "Nova - SteelSeries" },
        { label: "Model", value: "VinovaAdder V2 Pro" },
        { label: "Type", value: "Gaming Mouse" },
        { label: "Weight", value: "120g" },
        { label: "Connectivity", value: "Wireless, Bluetooth & USB" },
        { label: "Features", value: "RGB Lighting" },
        { label: "Compatibility", value: "PC, Mac, PlayStation, Xbox" },
        { label: "Warranty", value: "2 Years" }
    ];

    return (
        <div className="space-y-12 animate-in fade-in duration-500">
            {/* Text Description */}
            <div className="space-y-6 max-w-[100%]">
                <p className="text-gray-600 text-[15px] leading-[1.8] font-medium">
                    Donec dapibus tellus sem, quis aliquam libero pharetra non. Nam vitae fermentum leo. Pellentesque bibendum dui eu mi tempor sodales. Integer gravida odio in sem laoreet tempus. Nunc vehicula nibh mauris, id bibendum metus facilisis iaculis. Phasellus suscipit dictum locus eu auctor. Duis commodo faucibus lectus, et accumsan quam egestas at. Praesent eros mi, condimentum sit amet felis quis, hendrerit ullamcorper turpis. Etiam vel cursus elit, ut semper velit. Aenean sagittis leo massa, fermentum sollicitudin sem facilisis vel. Suspendisse potenti. Fusce porta tincidunt interdum.
                </p>
                <p className="text-gray-600 text-[15px] leading-[1.8] font-medium">
                    Praesent nec diam eleifend, vestibulum justo aliquet, aliquam ipsum. Curabitur egestas, augue a pellentesque ornare, tellus velit pulvinar nisi, sit amet placerat enim sem vel elit. Duis a mi metus. Suspendisse vulputate velit tempus efficitur lacus sit amet nunc ultricies ac gravida ante tempor
                </p>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 items-start pt-8">
                {/* Left: Image */}
                <div className="bg-[#f8f9fb] rounded-[24px] overflow-hidden aspect-square sm:aspect-[16/10] flex items-center justify-center border border-gray-100 shadow-sm relative group w-full h-full">
                    <img
                        src="/img/product-single.webp"
                        alt="Product details"
                        className="w-full h-full object-cover transform scale-[1.01] group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/5 to-purple-500/5 pointer-events-none" />
                </div>

                {/* Right: Item Specifics */}
                <div className="space-y-4">
                    <h3 className="text-[22px] text-start font-orbitron font-bold text-gray-900 tracking-wide">
                        Item specifics
                    </h3>
                    <ul className="space-y-2">
                        {specifics.map((item, index) => (
                            <li key={index} className="flex items-center gap-4 group">
                                <div className="w-1.5 h-1.5 rounded-full border border-gray-900 group-hover:bg-gray-900 transition-colors" />
                                <span className="text-[15px] text-gray-900 font-bold min-w-[120px]">
                                    {item.label} :
                                </span>
                                <span className="text-[15px] text-gray-600 font-medium">
                                    {item.value}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};
