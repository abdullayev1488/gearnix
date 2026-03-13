import React, { useState, useEffect } from 'react'
import { colors, staticCategories } from '@/const'
import api from '@/axios/axios'

export const CategoriesSection = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await api.get('/category', { params: { status: 'active' } });
                setCategories(res.data.data || []);
            } catch (error) {
                console.error('Failed to fetch categories', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    if (loading) return null;

    return (
        <section data-aos="fade-up" className='pt-24 pb-12 max-w-screen-2xl mx-auto px-4 '>
            <h2 className='text-[1.7rem] uppercase md:text-[2rem] font-orbitron font-bold mb-16 text-center md:text-left'>
                Shop by Category
            </h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-20'>
                {staticCategories.map((category, index) => (
                    <div key={index} className="flex flex-col items-center md:items-start group">
                        <div className="relative w-full h-[220px] flex items-center justify-center cursor-pointer">
                            {/* Colored Background Box */}
                            <div
                                style={{ background: colors[index % colors.length] }}
                                className='absolute bottom-0 w-full h-[180px] rounded-2xl transition-all duration-500 group-hover:shadow-2xl group-hover:opacity-90'
                            />

                            {/* Protruding Image */}
                            <div className='relative z-10 w-full h-full flex items-center justify-center pointer-events-none'>
                                <img
                                    src={category.img}
                                    alt={category.name}
                                    className='w-[85%] h-auto max-h-[280px] object-contain transition-transform duration-500 group-hover:scale-110 translate-y-[-30px]'
                                />
                            </div>
                        </div>

                        <h4 className='text-xl mt-6 font-orbitron font-bold text-gray-800 text-center md:text-left'>
                            {category.name}
                        </h4>
                    </div>
                ))}
            </div>
        </section>
    )
}
