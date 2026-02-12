import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IconChevronDown, IconChevronUp, IconStarFilled, IconStar } from '@tabler/icons-react';
import {
    setCategory,
    setPriceRange,
    toggleBrand,
    setRating,
    toggleColor
} from '../../../redux/slice/filterSlice';
import { SliderRange } from '@/components/custom/RangeSlider';

export const FilterSidebar = () => {
    const dispatch = useDispatch();
    const { filters } = useSelector((state) => state.filter);

    // Mock data for filters
    const categories = [
        { name: 'Headphones', count: 7 },
        { name: 'Accessories', count: 13 },
        { name: 'Gaming controllers', count: 6 },
        { name: 'Gaming Mouse', count: 10 },
        { name: 'Keyboards', count: 9 },
        { name: 'Wireless headset', count: 5 },
    ];

    const brands = [
        { name: 'Abler', count: 4 },
        { name: 'Apple', count: 12 },
        { name: 'Logitech', count: 7 },
        { name: 'Razer', count: 10 },
        { name: 'Sony', count: 6 },
        { name: 'Sony', count: 6 },
    ];

    const colors = [
        '#1a202c', '#4a5568', '#48bb78', '#4299e1', '#9f7aea', '#ed64a6', '#f56565', '#ed8936', '#cbd5e0', '#ffffff'
    ];

    const FilterSection = ({ title, children, defaultOpen = true }) => {
        const [isOpen, setIsOpen] = React.useState(defaultOpen);
        return (
            <div className="border-b border-gray-100 py-6 last:border-0">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center justify-between w-full mb-4 group"
                >
                    <h3 className="font-orbitron text-[14px] font-bold tracking-wider text-gray-900 group-hover:text-[#ff0080] transition-colors uppercase">
                        {title}
                    </h3>
                    {isOpen ? <IconChevronUp size={18} className="text-gray-400 group-hover:text-[#ff0080]" /> : <IconChevronDown size={18} className="text-gray-400 group-hover:text-[#ff0080]" />}
                </button>
                <div className={`transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    {children}
                </div>
            </div>
        );
    };

    return (
        <aside className="w-full lg:w-[330px] flex-shrink-0">
            <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)]">
                <div className="flex items-center gap-2 mb-10">
                    <h2 className="font-orbitron font-bold text-[20px] uppercase tracking-[0.1em] text-gray-900">Filter By</h2>
                </div>

                {/* Categories */}
                <FilterSection title="Categories">
                    <ul className="space-y-4">
                        {categories.map((cat) => (
                            <li key={cat.name} className="flex items-center justify-between group cursor-pointer" onClick={() => dispatch(setCategory(cat.name))}>
                                <div className="flex items-center gap-4">
                                    <div className={`w-[22px] h-[22px] rounded-md border-2 transition-all duration-200 flex items-center justify-center ${filters.category === cat.name ? 'bg-white border-gray-300' : 'border-gray-200 group-hover:border-gray-300'}`}>
                                        {filters.category === cat.name && <div className="w-[10px] h-[10px] bg-[#ff0080] rounded-sm" />}
                                    </div>
                                    <span className={`text-[15px] transition-colors ${filters.category === cat.name ? 'text-gray-900 font-medium' : 'text-gray-600 group-hover:text-gray-900'}`}>
                                        {cat.name} <span className="text-gray-400 font-normal">({cat.count})</span>
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </FilterSection>

                {/* Price */}
                <FilterSection title="Price">
                    <div className="px-1 mt-6">
                        <SliderRange/>
                        <div className="flex items-center justify-between mt-6">
                            <div className="flex flex-col gap-1">
                                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">$0.00</span>
                            </div>
                            <div className="flex flex-col gap-1 items-end">
                                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">$90.00</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 mt-8">
                            <span className="text-[14px] font-medium text-gray-900">
                                Ranger ($): <span className="font-bold">{filters.priceRange[0]} — {filters.priceRange[1]}</span>
                            </span>
                            <button className="w-full py-2.5 bg-[#f0f0f0] hover:bg-gray-200 text-[13px] font-bold text-gray-900 rounded-lg transition-colors uppercase tracking-widest">Filter</button>
                        </div>
                    </div>
                </FilterSection>

                {/* Brands */}
                <FilterSection title="Brands">
                    <ul className="space-y-4">
                        {brands.map((brand, idx) => (
                            <li key={`${brand.name}-${idx}`} className="flex items-center justify-between group cursor-pointer" onClick={() => dispatch(toggleBrand(brand.name))}>
                                <div className="flex items-center gap-4">
                                    <div className={`w-[22px] h-[22px] rounded-md border-2 transition-all duration-200 flex items-center justify-center ${filters.brands.includes(brand.name) ? 'bg-white border-gray-300' : 'border-gray-200 group-hover:border-gray-300'}`}>
                                        {filters.brands.includes(brand.name) && (
                                            <div className="w-[10px] h-[10px] bg-[#ff0080] rounded-sm" />
                                        )}
                                    </div>
                                    <span className={`text-[15px] transition-colors ${filters.brands.includes(brand.name) ? 'text-gray-900 font-medium' : 'text-gray-600 group-hover:text-gray-900'}`}>
                                        {brand.name}
                                    </span>
                                </div>
                                <span className="text-[14px] text-gray-400 font-medium">({brand.count})</span>
                            </li>
                        ))}
                    </ul>
                </FilterSection>

                {/* Colors */}
                <FilterSection title="Colors">
                    <div className="flex flex-wrap gap-4 p-2 mt-2">
                        {colors.map((color) => (
                            <button
                                key={color}
                                onClick={() => dispatch(toggleColor(color))}
                                className={`w-8 h-8 rounded-full border-2 transition-all duration-300 relative flex items-center justify-center ${filters.colors.includes(color) ? 'border-[#ff0080] ring-4 ring-[#ff0080]/10 scale-110' : 'border-transparent hover:scale-110'}`}
                            >
                                <div className={`w-6 h-6 rounded-full ${color === '#ffffff' ? 'border border-gray-100' : ''}`} style={{ backgroundColor: color }} />
                            </button>
                        ))}
                    </div>
                </FilterSection>
            </div>
        </aside>

    );
};
