import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router';
import { IconArrowsExchange, IconTrash, IconShoppingCart, IconX } from '@tabler/icons-react';
import { toggleCompare } from '@/redux/slice/compareSlice';
import { addItem } from '@/redux/slice/basketSlice';

export const ComparePage = () => {
    const dispatch = useDispatch();
    const { items: compareItems } = useSelector((state) => state.compare);

    return (
        <main className='pt-[80px]'>
            <section className="py-12 md:py-24 bg-[#FCFDFF]">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2 text-[15px] text-gray-400 mb-12">
                        <Link to="/" className="hover:text-gray-900 transition-colors">Home</Link>
                        <span className="text-gray-300">/</span>
                        <span className="text-gray-900 font-semibold uppercase tracking-wider text-[13px]">Compare</span>
                    </div>

                    <div className="mb-16">
                        <h1 className="font-orbitron font-bold text-3xl md:text-4xl text-gray-900 uppercase tracking-widest text-center">
                            Compare Gear
                        </h1>
                        <div className="w-24 h-1 bg-gradient-to-r from-[#ff512f] to-[#dd2476] mx-auto mt-6 rounded-full" />
                    </div>

                    {compareItems.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse bg-white rounded-[32px] overflow-hidden shadow-sm border border-gray-100">
                                <thead>
                                    <tr>
                                        <th className="p-8 text-left bg-gray-50/50 border-b border-gray-100 min-w-[200px]">
                                            <span className="font-orbitron font-bold text-[13px] uppercase tracking-widest text-gray-400">Features</span>
                                        </th>
                                        {compareItems.map(item => (
                                            <th key={item._id} className="p-8 border-b border-gray-100 min-w-[300px] relative group text-center">
                                                <button
                                                    onClick={() => dispatch(toggleCompare(item))}
                                                    className="absolute top-4 right-4 p-2 text-gray-300 hover:text-white hover:bg-[#ff512f] rounded-xl transition-all cursor-pointer shadow-sm"
                                                >
                                                    <IconX size={16} />
                                                </button>
                                                <div className="w-40 h-40 bg-[#F6F7F9] rounded-2xl flex items-center justify-center p-6 mx-auto mb-6 group-hover:scale-105 transition-transform duration-300">
                                                    <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                                                </div>
                                                <h3 className="font-poppins font-bold text-gray-900 mb-4">{item.name}</h3>
                                                <button
                                                    onClick={() => dispatch(addItem({ product: item, quantity: 1 }))}
                                                    className="inline-flex items-center gap-2 bg-gray-900 text-white font-orbitron font-bold px-6 py-3 rounded-xl hover:bg-[#ff512f] transition-all duration-300 text-[12px] uppercase tracking-wider"
                                                >
                                                    <IconShoppingCart size={16} /> Add to Basket
                                                </button>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="p-6 bg-gray-50/50 border-b border-gray-100 font-orbitron font-bold text-[12px] uppercase tracking-widest text-gray-500">Price</td>
                                        {compareItems.map(item => (
                                            <td key={item._id} className="p-6 text-center border-b border-gray-100 font-orbitron font-bold text-xl text-[#ff512f]">
                                                ${item.price.toFixed(2)}
                                            </td>
                                        ))}
                                    </tr>
                                    <tr>
                                        <td className="p-6 bg-gray-50/50 border-b border-gray-100 font-orbitron font-bold text-[12px] uppercase tracking-widest text-gray-500">Rating</td>
                                        {compareItems.map(item => (
                                            <td key={item._id} className="p-6 text-center border-b border-gray-100">
                                                <div className="flex items-center justify-center gap-1 text-[#ffb800]">
                                                    <span className="font-bold text-gray-900 mr-2">{item.rating || 0}</span>
                                                    ★
                                                </div>
                                                <span className="text-[12px] text-gray-400">({item.reviews || 0} reviews)</span>
                                            </td>
                                        ))}
                                    </tr>
                                    <tr>
                                        <td className="p-6 bg-gray-50/50 border-b border-gray-100 font-orbitron font-bold text-[12px] uppercase tracking-widest text-gray-500">Category</td>
                                        {compareItems.map(item => (
                                            <td key={item._id} className="p-6 text-center border-b border-gray-100 text-gray-600 font-medium">
                                                {item.category?.name || 'Gaming Gear'}
                                            </td>
                                        ))}
                                    </tr>
                                    <tr>
                                        <td className="p-6 bg-gray-50/50 border-b border-gray-100 font-orbitron font-bold text-[12px] uppercase tracking-widest text-gray-500">Availability</td>
                                        {compareItems.map(item => (
                                            <td key={item._id} className="p-6 text-center border-b border-gray-100">
                                                <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-[12px] font-bold uppercase tracking-wider">In Stock</span>
                                            </td>
                                        ))}
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="bg-white rounded-[40px] p-16 md:p-32 text-center border-2 border-dashed border-gray-100 shadow-sm max-w-4xl mx-auto">
                            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8">
                                <IconArrowsExchange size={40} className="text-gray-200" />
                            </div>
                            <h2 className="font-orbitron font-bold text-2xl text-gray-900 mb-4 uppercase tracking-wider">
                                Comparison list is empty
                            </h2>
                            <p className="text-gray-500 font-poppins text-lg mb-10 max-w-md mx-auto">
                                You haven't selected any gear to compare yet. Add at least two products to see their details side-by-side.
                            </p>
                            <Link
                                to="/shop"
                                className="inline-flex items-center justify-center bg-gray-900 text-white font-orbitron font-bold px-12 py-5 rounded-2xl hover:bg-[#ff512f] transition-all duration-300 transform active:scale-95 shadow-xl shadow-black/10 hover:shadow-[#ff512f]/30 uppercase tracking-[0.2em] text-[13px]"
                            >
                                Browse Gears
                            </Link>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
};
