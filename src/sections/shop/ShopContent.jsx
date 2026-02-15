import { useMemo, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IconLayoutGrid, IconList, IconAdjustmentsHorizontal, IconStar } from '@tabler/icons-react';
import { FilterSidebar } from '../../components/ui/aside/FilterSidebar';
import { ProductCard } from '../../components/ui/cards/ProductCard';
import { products, sortOptions } from '../../const';
import { setSortBy, setViewType } from '../../redux/slice/filterSlice';

export const ShopContent = () => {
    const dispatch = useDispatch();
    const { filters, sortBy, viewType } = useSelector(state => state.filter);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [visibleCount, setVisibleCount] = useState(9);

    // Reset visible count when filters change
    useEffect(() => {
        setVisibleCount(9);
    }, [filters, sortBy]);



    const filteredProducts = useMemo(() => {
        let result = [...products];

        // Filter by category
        if (filters.category) {
            result = result.filter(product => product.category === filters.category);
        }

        // Filter by price
        result = result.filter(product => product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]);

        // Filter by brands
        if (filters.brands.length > 0) {
            result = result.filter(product => filters.brands.includes(product.brand));
        }

        // Sorting
        if (sortBy === 'price-low') {
            result.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price-high') {
            result.sort((a, b) => b.price - a.price);
        } else if (sortBy === 'latest' || sortBy === 'default') {
            result.sort((a, b) => b.id - a.id);
        } else if (sortBy === 'rating') {
            result.sort((a, b) => b.rating - a.rating);
        }

        return result;
    }, [filters, sortBy]);

    const displayProducts = useMemo(() => {
        return filteredProducts.slice(0, visibleCount);
    }, [filteredProducts, visibleCount]);

    const handleLoadMore = () => {
        setVisibleCount(prev => prev + 9);
    };

    const progressPercentage = filteredProducts.length > 0 ? (displayProducts.length / filteredProducts.length) * 100 : 0;

    return (
        <section className="bg-[#fcfdff] py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-[1440px] mx-auto">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Sidebar */}
                    <div className="hidden lg:block sticky top-24 self-start">
                        <FilterSidebar />
                    </div>

                    {/* Mobile Sidebar Toggle */}
                    <div className="lg:hidden mb-10">
                        <button
                            onClick={() => setIsMobileSidebarOpen(true)}
                            className="flex items-center gap-3 px-8 py-4 bg-white border border-gray-100 rounded-2xl shadow-sm text-gray-900 font-bold uppercase text-[13px] tracking-[0.1em]"
                        >
                            <IconAdjustmentsHorizontal size={22} className="text-[#ff0080]" />
                            Filter
                        </button>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1">
                        {/* Top Controls */}
                        <div className="bg-[#f0f0f0]/50 rounded-[20px] p-1.5 mb-12 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="px-6 text-[15px] text-gray-400 font-medium">
                                Showing <span className="text-gray-900 font-bold">{displayProducts.length}</span> of <span className="text-gray-900 font-bold">{filteredProducts.length}</span> results
                            </div>

                            <div className="flex items-center gap-6 w-full sm:w-auto">
                                {/* Custom Sort Dropdown */}
                                <div className="relative">
                                    <button
                                        onClick={() => setIsSortOpen(!isSortOpen)}
                                        className="flex items-center justify-between gap-12 bg-white rounded-xl px-6 py-4 text-[15px] font-bold text-gray-900 min-w-[240px] shadow-sm"
                                    >
                                        {sortOptions.find(opt => opt.value === sortBy)?.label}
                                        <IconChevronDown size={16} className={`transition-transform duration-300 ${isSortOpen ? 'rotate-180' : ''}`} />
                                    </button>

                                    {isSortOpen && (
                                        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-gray-100 py-4 z-50 overflow-hidden">
                                            {sortOptions.map((opt) => (
                                                <button
                                                    key={opt.value}
                                                    onClick={() => {
                                                        dispatch(setSortBy(opt.value));
                                                        setIsSortOpen(false);
                                                    }}
                                                    className={`w-full text-left px-6 py-3.5 text-[15px] font-medium transition-colors flex items-center gap-4 ${sortBy === opt.value ? 'text-[#ff0080] bg-[#f0f0f0]/30' : 'text-gray-600 hover:text-gray-900 hover:bg-[#f0f0f0]/30'}`}
                                                >
                                                    <div className={`w-5 h-5 rounded-full border-2 transition-all flex items-center justify-center ${sortBy === opt.value ? 'border-[#ff0080]' : 'border-gray-200'}`}>
                                                        {sortBy === opt.value && <div className="w-2.5 h-2.5 bg-[#ff0080] rounded-full" />}
                                                    </div>
                                                    {opt.label}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* View Switcher */}
                                <div className="flex items-center bg-[#f0f0f0] rounded-xl p-1 gap-1">
                                    <button
                                        onClick={() => dispatch(setViewType('grid-3'))}
                                        className={`p-3 rounded-lg transition-all ${viewType === 'grid-3' ? 'bg-[#ff0080] text-white shadow-md' : 'text-gray-500 hover:text-gray-900'}`}
                                    >
                                        <div className="grid grid-cols-3 gap-0.5">
                                            {[...Array(9)].map((_, i) => <div key={i} className={`w-1 h-1 rounded-[0.5px] border ${viewType === 'grid-3' ? 'border-white' : 'border-current'}`} />)}
                                        </div>
                                    </button>
                                    <button
                                        onClick={() => dispatch(setViewType('grid-2'))}
                                        className={`p-3 rounded-lg transition-all ${viewType === 'grid-2' ? 'bg-[#ff0080] text-white shadow-md' : 'text-gray-500 hover:text-gray-900'}`}
                                    >
                                        <div className="grid grid-cols-2 gap-0.5">
                                            {[...Array(4)].map((_, i) => <div key={i} className={`w-1.5 h-1.5 rounded-[0.5px] border ${viewType === 'grid-2' ? 'border-white' : 'border-current'}`} />)}
                                        </div>
                                    </button>
                                    <button
                                        onClick={() => dispatch(setViewType('list'))}
                                        className={`p-3 rounded-lg transition-all ${viewType === 'list' ? 'bg-[#ff0080] text-white shadow-md' : 'text-gray-500 hover:text-gray-900'}`}
                                    >
                                        <div className="flex flex-col gap-1">
                                            <div className="flex gap-1"><div className={`w-2 h-2 rounded-[0.5px] border ${viewType === 'list' ? 'border-white' : 'border-current'}`} /><div className={`w-3 h-0.5 mt-1 rounded-[0.5px] border ${viewType === 'list' ? 'border-white' : 'border-current'}`} /></div>
                                            <div className="flex gap-1"><div className={`w-2 h-2 rounded-[0.5px] border ${viewType === 'list' ? 'border-white' : 'border-current'}`} /><div className={`w-3 h-0.5 mt-1 rounded-[0.5px] border ${viewType === 'list' ? 'border-white' : 'border-current'}`} /></div>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Product Grid */}
                        {displayProducts.length > 0 ? (
                            <div className={`grid gap-x-8 gap-y-12 transition-all duration-500 ${viewType === 'grid-3' ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' :
                                viewType === 'grid-2' ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'
                                }`}>
                                {displayProducts.map(product => (
                                    viewType === 'list' ? (
                                        <ListViewCard key={product.id} product={product} />
                                    ) : (
                                        <ProductCard key={product.id} product={product} />
                                    )
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white rounded-[32px] p-20 text-center border border-dashed border-gray-200">
                                <p className="text-gray-400 font-medium text-[16px]">No products found matching your filters.</p>
                                <button className="mt-6 text-[#ff0080] font-bold uppercase text-[13px] tracking-[0.1em] hover:underline transition-all">Clear all filters</button>
                            </div>
                        )}

                        {/* Pagination / Load More */}
                        {filteredProducts.length > 0 && (
                            <div className="mt-24 flex flex-col items-center">
                                <div className="w-full max-w-[440px]">
                                    <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden mb-6">
                                        <div className="h-full bg-[#ff0080] rounded-full transition-all duration-1000" style={{ width: `${progressPercentage}%` }} />
                                    </div>
                                    <p className="text-center text-[14px] text-gray-400 font-medium mb-10">Showing {displayProducts.length} of {filteredProducts.length} items</p>
                                </div>
                                {displayProducts.length < filteredProducts.length && (
                                    <button
                                        onClick={handleLoadMore}
                                        className="px-12 py-5 bg-[#f0f0f0] cursor-pointer hover:bg-gray-200 text-gray-900 rounded-2xl font-orbitron font-bold text-[14px] uppercase tracking-[0.2em] transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
                                    >
                                        Load More Products
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Sidebar Overlay with Transition */}
            <div className={`fixed inset-0 z-[100] transition-all duration-500 ${isMobileSidebarOpen ? 'visible pointer-events-auto' : 'invisible pointer-events-none'}`}>
                <div className={`absolute inset-0 bg-black/60 transition-opacity duration-500 ${isMobileSidebarOpen ? 'opacity-100 backdrop-blur-sm' : 'opacity-0'}`} onClick={() => setIsMobileSidebarOpen(false)} />
                <div className={`absolute left-0 top-0 bottom-0 w-[85%] max-w-[360px] bg-white transition-transform duration-500 shadow-2xl overflow-y-auto ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <div className="p-8">
                        <div className="flex items-center justify-between mb-10">
                            <h2 className="font-orbitron font-bold text-[20px] uppercase tracking-widest text-gray-900">Filters</h2>
                            <button onClick={() => setIsMobileSidebarOpen(false)} className="w-[44px] h-[44px] rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors">
                                <IconBrandX size={24} />
                            </button>
                        </div>
                        <FilterSidebar />
                    </div>
                </div>
            </div>
        </section>
    );
};

const ListViewCard = ({ product }) => (
    <div className="group bg-white rounded-[32px] p-6 border border-gray-100 flex flex-col sm:flex-row gap-8 hover:shadow-[0_20px_60px_rgba(0,0,0,0.06)] transition-all duration-500">
        <div className="w-full sm:w-[280px] aspect-square bg-[#f6f7f9] rounded-2xl flex items-center justify-center p-8 overflow-hidden shrink-0">
            <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
            />
        </div>
        <div className="flex flex-col justify-center gap-4 flex-1">
            <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                    <IconStarFilled key={i} size={16} className={i < 4 ? "text-[#ff0080]" : "text-gray-200"} />
                ))}
            </div>
            <h3 className="font-orbitron font-bold text-[22px] text-gray-900 group-hover:text-[#ff0080] transition-colors">{product.name}</h3>
            <div className="flex items-center gap-4">
                <span className="text-[24px] font-bold text-gray-900">${product.price.toFixed(2)}</span>
                {product.oldPrice && <span className="text-[18px] text-gray-400 line-through">${product.oldPrice.toFixed(2)}</span>}
            </div>
            <p className="text-gray-500 text-[15px] max-w-[500px]">Powerful wireless gaming mouse with high-precision sensor and ergonomic design for professional gaming performance.</p>
            <div className="flex gap-4 mt-4">
                <button className="px-8 py-3.5 bg-gray-900 hover:bg-[#ff0080] text-white text-[13px] font-bold rounded-xl uppercase tracking-widest transition-all">Add to Basket</button>
                <button className="p-3.5 border border-gray-200 hover:border-[#ff0080] text-gray-400 hover:text-[#ff0080] rounded-xl transition-all">
                    <IconStar size={20} />
                </button>
            </div>
        </div>
    </div>
);

const IconStarFilled = ({ size, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
);

const IconChevronDown = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9l6 6 6-6" />
    </svg>
);

const IconBrandX = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 6l-12 12" />
        <path d="M6 6l12 12" />
    </svg>
);
