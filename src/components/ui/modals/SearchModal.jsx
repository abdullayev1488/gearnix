import { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { IconX, IconSearch, IconChevronDown, IconFlame, IconChevronRight, IconArrowRight } from "@tabler/icons-react";
import { setSearchOpen } from "@/redux/slice/uiSlice";
import { setCategory as setFilterCategory } from "@/redux/slice/filterSlice";
import { useDebounce } from "@/hooks/useDebounce";
import api from "@/axios/axios";






export const SearchModal = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isOpen = useSelector((state) => state.ui.searchOpen);

    const [searchQuery, setSearchQuery] = useState("");
    const [category, setCategory] = useState("");
    const [categoryLabel, setCategoryLabel] = useState("ALL CATEGORIES");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [searchLoading, setSearchLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);

    const inputRef = useRef(null);
    const debouncedQuery = useDebounce(searchQuery, 400);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 150);
            setSearchQuery("");
            setSearchResults([]);
        }
    }, [isOpen]);

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const [catRes] = await Promise.all([
                    api.get("/category", { params: { status: "active" } }),
                ]);
                setCategories(catRes.data.data || []);
            } catch (err) {
                console.error("Search modal init error", err);
            }
        };
        fetchInitialData();
    }, []);

    useEffect(() => {
        if (!debouncedQuery.trim()) {
            setSearchResults([]);
            return;
        }
        const fetchSearch = async () => {
            setSearchLoading(true);
            try {
                const params = {
                    status: "active",
                    search: debouncedQuery,
                    limit: 8,
                };
                if (category) {
                    params.category = category;
                }
                const res = await api.get("/product", { params });
                setSearchResults(res.data.data?.products || []);
            } catch (err) {
                console.error("Search error", err);
            } finally {
                setSearchLoading(false);
            }
        };
        fetchSearch();
    }, [debouncedQuery, category]);

    const handleClose = useCallback(() => {
        dispatch(setSearchOpen(false));
    }, [dispatch]);

    const handleNavigateToProduct = useCallback((productId) => {
        handleClose();
        navigate(`/product/${productId}`);
    }, [handleClose, navigate]);

    const handleSearchSubmit = useCallback((e) => {
        e?.preventDefault();
        if (!searchQuery.trim()) return;
        saveRecentSearch(searchQuery);
        handleClose();
        navigate(`/shop`);
    }, [searchQuery, handleClose, navigate]);

    const handlePopularSearchClick = useCallback((catName) => {
        dispatch(setFilterCategory(catName));
        handleClose();
        navigate("/shop");
    }, [dispatch, handleClose, navigate]);

    const hasQuery = searchQuery.trim().length > 0;

    if (!isOpen) return null;

    return (
        <div
            onClick={handleClose}
            className={`fixed inset-0 backdrop-blur-2xl bg-white/70 transition-all duration-500 z-[998] overflow-y-auto ${isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}
        >
            {/* Close Button */}
            <button
                onClick={handleClose}
                className="absolute top-6 right-6 md:top-10 md:right-10 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer z-[120]"
            >
                <IconX size={22} className="text-gray-600" />
            </button>

            <div
                className="w-full max-w-[900px] mx-auto flex flex-col pt-20 md:pt-28 px-4 md:px-0 pb-10"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Search Bar */}
                <form onSubmit={handleSearchSubmit} className="w-full relative">
                    <div className="flex items-center bg-white border-2 border-[#ff512f] rounded-2xl overflow-visible shadow-2xl shadow-orange-500/10 transition-shadow">
                        {/* Category Dropdown */}
                        <div className="relative border-r border-gray-100 h-full hidden sm:block">
                            <button
                                type="button"
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="flex items-center gap-2 px-6 py-4 text-[12px] font-bold text-black uppercase font-poppins cursor-pointer hover:bg-gray-50 rounded-l-xl transition-colors whitespace-nowrap min-w-[160px] h-full"
                            >
                                <span className="truncate max-w-[120px]">{categoryLabel}</span>
                                <IconChevronDown size={14} className={`shrink-0 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {isDropdownOpen && (
                                <div className="absolute top-full left-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 py-3 w-max min-w-full z-[130] animate-in fade-in slide-in-from-top-2">
                                    <button
                                        type="button"
                                        onClick={() => { setCategory(""); setCategoryLabel("ALL CATEGORIES"); setIsDropdownOpen(false); }}
                                        className={`w-full text-left px-6 py-2.5 cursor-pointer text-[12px] font-bold hover:text-black hover:bg-gray-50 transition-colors uppercase font-poppins ${!category ? "text-[#ff512f]" : "text-gray-500"}`}
                                    >
                                        All Categories
                                    </button>
                                    {categories.map((cat) => (
                                        <button
                                            type="button"
                                            key={cat._id}
                                            onClick={() => { setCategory(cat.name); setCategoryLabel(cat.name.toUpperCase()); setIsDropdownOpen(false); }}
                                            className={`w-full text-left px-6 py-2.5 cursor-pointer text-[12px] font-bold hover:text-black hover:bg-gray-50 transition-colors uppercase font-poppins ${category === cat.name ? "text-[#ff512f]" : "text-gray-500"}`}
                                        >
                                            {cat.name}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Input */}
                        <div className="flex-1 flex items-center">
                            <IconSearch size={20} className="ml-4 text-gray-300 shrink-0" />
                            <input
                                ref={inputRef}
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search products, categories or brands..."
                                className="flex-1 px-4 py-4 text-[14px] font-medium text-black placeholder:text-gray-400 focus:outline-none font-poppins min-w-0"
                            />
                        </div>

                        {/* Search Button */}
                        <button
                            type="submit"
                            className="mr-2 shrink-0 w-10 h-10 bg-gradient-to-r from-[#ff512f] to-[#dd2476] rounded-xl flex items-center justify-center text-white shadow-lg hover:shadow-orange-500/30 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
                        >
                            <IconSearch size={20} />
                        </button>
                    </div>
                </form>

                {/* Content Area */}
                <div className="mt-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

                    {hasQuery && (
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden">
                            {searchLoading ? (
                                <div className="flex items-center justify-center py-12">
                                    <div className="w-8 h-8 border-3 border-gray-200 border-t-[#ff512f] rounded-full animate-spin" />
                                </div>
                            ) : searchResults.length > 0 ? (
                                <div>
                                    <div className="px-6 pt-5 pb-3 flex items-center justify-between">
                                        <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest font-poppins">
                                            Results ({searchResults.length})
                                        </p>
                                        <button
                                            onClick={handleSearchSubmit}
                                            className="text-[12px] font-bold text-[#ff512f] hover:text-[#dd2476] transition-colors cursor-pointer flex items-center gap-1 uppercase tracking-wider font-poppins"
                                        >
                                            See All <IconArrowRight size={14} />
                                        </button>
                                    </div>
                                    <div className="divide-y divide-gray-50">
                                        {searchResults.map((product) => (
                                            <button
                                                key={product._id}
                                                onClick={() => handleNavigateToProduct(product._id)}
                                                className="w-full flex items-center gap-4 px-6 py-4 hover:bg-gray-50/80 transition-all duration-200 cursor-pointer group text-left"
                                            >
                                                <div className="w-16 h-16 bg-[#f6f7f9] rounded-xl flex items-center justify-center p-2 shrink-0 group-hover:bg-[#fff0ed] transition-colors">
                                                    <img
                                                        src={product.image || product.images?.[0]}
                                                        alt={product.name}
                                                        className="w-full h-full object-contain"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-poppins font-semibold text-[14px] text-gray-800 truncate group-hover:text-[#ff512f] transition-colors">
                                                        {product.name}
                                                    </h4>
                                                    <p className="text-[12px] text-gray-400 font-poppins mt-0.5">{product.category?.name || ""}</p>
                                                </div>
                                                <div className="text-right shrink-0">
                                                    <span className="font-bold text-[16px] text-gray-900 font-poppins">${product.price?.toFixed(2)}</span>
                                                    {product.oldPrice && (
                                                        <span className="block text-[12px] text-gray-400 line-through">${product.oldPrice?.toFixed(2)}</span>
                                                    )}
                                                </div>
                                                <IconChevronRight size={18} className="text-gray-300 group-hover:text-[#ff512f] shrink-0 transition-colors" />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="py-16 text-center">
                                    <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                        <IconSearch size={28} className="text-gray-300" />
                                    </div>
                                    <p className="text-gray-400 font-poppins text-[14px] font-medium">No results found for "{searchQuery}"</p>
                                    <p className="text-gray-300 font-poppins text-[12px] mt-1">Try a different search term</p>
                                </div>
                            )}
                        </div>
                    )}

                    {!hasQuery && (
                        <>
                            <div>
                                <div className="flex items-center gap-2 mb-4 px-1">
                                    <IconFlame size={18} className="text-[#ff512f]" />
                                    <h3 className="text-[13px] font-bold text-gray-800 uppercase tracking-widest font-poppins">
                                        Popular Categories
                                    </h3>
                                </div>
                                <div className="flex flex-wrap gap-2.5">
                                    {categories.slice(0, 10).map((cat) => (
                                        <button
                                            key={cat._id}
                                            onClick={() => handlePopularSearchClick(cat.name)}
                                            className="px-5 py-2.5 bg-white border border-gray-100 text-[13px] font-semibold text-gray-700 rounded-full hover:bg-[#ff512f] hover:text-white hover:border-[#ff512f] hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300 cursor-pointer font-poppins active:scale-95"
                                        >
                                            {cat.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
