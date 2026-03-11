import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router';
import { ProductCard } from '@/components/ui/cards/ProductCard';
import { IconStar } from '@tabler/icons-react';

export const WishlistPage = () => {
    const { items: wishlistItems } = useSelector((state) => state.wishlist);

    return (
        <main className='pt-[80px]'>
            <section className="py-12 md:py-24 bg-[#FCFDFF]">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Breadcrumbs */}
                    <div className="flex items-center gap-2 text-[15px] text-gray-400 mb-12">
                        <Link to="/" className="hover:text-gray-900 transition-colors">Home</Link>
                        <span className="text-gray-300">/</span>
                        <span className="text-gray-900 font-semibold uppercase tracking-wider text-[13px]">Wishlist</span>
                    </div>

                    <div className="mb-16">
                        <h1 className="font-orbitron font-bold text-3xl md:text-4xl text-gray-900 uppercase tracking-widest text-center">
                            My Wishlist
                        </h1>
                        <div className="w-24 h-1 bg-gradient-to-r from-[#ff512f] to-[#dd2476] mx-auto mt-6 rounded-full" />
                    </div>

                    {wishlistItems.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 transition-all duration-500">
                            {wishlistItems.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white rounded-[40px] p-16 md:p-32 text-center border-2 border-dashed border-gray-100 shadow-sm max-w-4xl mx-auto">
                            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8">
                                <IconStar size={40} className="text-gray-200" />
                            </div>
                            <h2 className="font-orbitron font-bold text-2xl text-gray-900 mb-4 uppercase tracking-wider">
                                Your wishlist is empty
                            </h2>
                            <p className="text-gray-500 font-poppins text-lg mb-10 max-w-md mx-auto">
                                You haven't added any gear to your wishlist yet. Explore our store and find something you love!
                            </p>
                            <Link
                                to="/shop"
                                className="inline-flex items-center justify-center bg-gray-900 text-white font-orbitron font-bold px-12 py-5 rounded-2xl hover:bg-[#ff512f] transition-all duration-300 transform active:scale-95 shadow-xl shadow-black/10 hover:shadow-[#ff512f]/30 uppercase tracking-[0.2em] text-[13px]"
                            >
                                Shop Gears
                            </Link>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
};
