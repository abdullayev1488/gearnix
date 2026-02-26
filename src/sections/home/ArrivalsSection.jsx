import { useState, useEffect } from 'react'
import { ProductCard } from '@/components/ui/cards/ProductCard'
import api from '@/axios/axios'

export const ArrivalsSection = () => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [activeTab, setActiveTab] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await api.get('/category', { params: { status: 'active' } });
                const fetchedCategories = res.data.data || [];
                setCategories(fetchedCategories);
                if (fetchedCategories.length > 0) {
                    setActiveTab(fetchedCategories[0]._id);
                }
            } catch (error) {
                console.error('Failed to fetch categories', error);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        if (!activeTab) return;
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const res = await api.get('/product', {
                    params: {
                        status: 'active',
                        category: activeTab,
                        limit: 5
                    }
                });
                setProducts(res.data.data?.products || []);
            } catch (error) {
                console.error('Failed to fetch products', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [activeTab]);

    return (
        <section className='py-16 max-w-screen-2xl mx-auto px-4'>
            <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-10 gap-6">
                <h2 className="text-[30px] lg:text-[40px] font-orbitron font-[500] text-gray-900 leading-tight">
                    New Arrivals
                </h2>
                <ul className="flex items-center gap-6 lg:gap-10 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide shrink-0">
                    {categories.slice(0, 4).map((category) => (
                        <li
                            key={category._id}
                            onClick={() => setActiveTab(category._id)}
                            className={`text-[14px] lg:text-[16px] font-[600] uppercase cursor-pointer transition-colors whitespace-nowrap
                                ${activeTab === category._id ? 'text-black border-b-2 border-[#ff512f] pb-1' : 'text-[#b0b0b0] hover:text-black'}`}
                        >
                            {category.name}
                        </li>
                    ))}
                </ul>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ff512f]"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            )}
        </section>
    )
}
