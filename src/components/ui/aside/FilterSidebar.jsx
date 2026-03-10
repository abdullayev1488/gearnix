import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import RangeSlider from '@/components/custom/RangeSlider';
import api from '@/axios/axios';
import {
    setCategory,
    toggleBrand,
    toggleColor
} from '@/redux/slice/filterSlice';

export const FilterSidebar = () => {
    const dispatch = useDispatch();
    const { filters, maxRange } = useSelector(state => state.filter);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFilters = async () => {
            try {
                const [catRes, brandRes] = await Promise.all([
                    api.get('/category', { params: { status: 'active' } }),
                    api.get('/brand', { params: { status: 'active' } })
                ]);
                setCategories(catRes.data.data || []);
                setBrands(brandRes.data.data || []);
            } catch (error) {
                console.error('Failed to fetch filters', error);
            } finally {
                setLoading(false);
            }
        };
        fetchFilters();
    }, []);


    const FilterSection = ({ title, children, defaultOpen = false }) => {
        const [isOpen, setIsOpen] = useState(defaultOpen);
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

    if (loading) return null;

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
                            <li key={cat._id} className="flex items-center justify-between group cursor-pointer" onClick={() => dispatch(setCategory(cat.name))}>
                                <div className="flex items-center gap-4">
                                    <div className={`w-[22px] h-[22px] rounded-md border-2 transition-all duration-200 flex items-center justify-center ${filters.category === cat.name ? 'bg-white border-gray-300' : 'border-gray-200 group-hover:border-gray-300'}`}>
                                        {filters.category === cat.name && <div className="w-[10px] h-[10px] bg-[#ff0080] rounded-sm" />}
                                    </div>
                                    <span className={`text-[15px] transition-colors ${filters.category === cat.name ? 'text-gray-900 font-medium' : 'text-gray-600 group-hover:text-gray-900'}`}>
                                        {cat.name}
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </FilterSection>

                {/* Price */}
                <FilterSection title="Price">
                    <RangeSlider />
                </FilterSection>

                {/* Brands */}
                <FilterSection title="Brands">
                    <ul className="space-y-4">
                        {brands.map((brand) => (
                            <li key={brand._id} className="flex items-center justify-between group cursor-pointer" onClick={() => dispatch(toggleBrand(brand.name))}>
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
                            </li>
                        ))}
                    </ul>
                </FilterSection>
            </div>
        </aside>

    );
};
