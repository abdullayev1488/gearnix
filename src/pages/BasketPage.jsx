import { IconPlus, IconMinus, IconTrash, IconTruck, IconChevronRight, IconShoppingCart } from "@tabler/icons-react";
import { Link } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "@/redux/slice/basketSlice";

export const BasketPage = () => {
    const dispatch = useDispatch();
    const { items: basketItems } = useSelector((state) => state.basket);

    const subtotal = basketItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = subtotal > 70 || basketItems.length === 0 ? 0 : 30;
    const total = subtotal + shipping;
    const freeShippingThreshold = 70;
    const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
    const shippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

    const handleQuantityChange = (id, newQuantity) => {
        if (newQuantity >= 0) {
            dispatch(updateQuantity({ id, quantity: newQuantity }));
        }
    };

    return (
        <main className='pt-[80px]'>
            <section className="py-12 md:py-24 bg-white">
                <div className="max-w-screen-2xl mx-auto px-4">
                    <div className="flex items-center gap-2 text-[15px] text-gray-400 mb-8">
                        <Link to="/" className="hover:text-gray-900 hover:font-semibold cursor-pointer transition-colors">Home</Link>
                        <span className="text-gray-300">/</span>
                        <span className="text-gray-900 font-semibold uppercase tracking-wider text-[13px]">Basket</span>
                    </div>

                    {basketItems.length > 0 ? (
                        <div className="flex align-center flex-col lg:flex-row gap-8 lg:gap-12 items-start">
                            {/* Basket Left */}
                            <div className="flex-[2] w-full">

                                {/* Free Shipping Progress Bar */}
                                <div className="mb-10 md:mb-16 max-w-3xl mx-auto lg:mx-0">
                                    <div className="flex items-center justify-between mb-4">
                                        <p className="text-xs md:text-sm text-gray-700">
                                            {remainingForFreeShipping > 0 ? (
                                                <>Buy <span className="font-bold text-[#ff512f]">${remainingForFreeShipping.toFixed(2)}</span> more to get <span className="font-bold">Free Shipping</span></>
                                            ) : (
                                                <span className="font-bold text-[#48bb78]">Congratulations! You got Free Shipping!</span>
                                            )}
                                        </p>
                                        <div className={`text-[#ff512f] transition-all duration-1000`} style={{ transform: `translateX(calc(${shippingProgress}% - 24px))` }}>
                                            <IconTruck size={24} className="md:w-7 md:h-7" />
                                        </div>
                                    </div>
                                    <div className="relative h-1 md:h-[6px] bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#ff512f] to-[#dd2476] transition-all duration-1000"
                                            style={{ width: `${shippingProgress}%` }}
                                        />
                                    </div>
                                </div>

                                {/* Desktop Table - Hidden on Mobile */}
                                <div className="hidden md:block overflow-hidden">
                                    <table className="w-full border-separate border-spacing-0 bg-[#f2f2f2] !p-[2px] overflow-hidden rounded-[10px]">
                                        <thead>
                                            <tr className="border-b border-gray-100 ">
                                                <th className="py-5 px-6 text-left text-[11px] lg:text-[12px] font-orbitron font-bold uppercase tracking-widest text-gray-400">Product</th>
                                                <th className="py-5 px-6 text-center text-[11px] lg:text-[12px] font-orbitron font-bold uppercase tracking-widest text-gray-400">Price</th>
                                                <th className="py-5 px-6 text-center text-[11px] lg:text-[12px] font-orbitron font-bold uppercase tracking-widest text-gray-400">Quantity</th>
                                                <th className="py-5 px-6 text-center text-[11px] lg:text-[12px] font-orbitron font-bold uppercase tracking-widest text-gray-400">Subtotal</th>
                                                <th className="py-5 px-4 w-10"></th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-100">
                                            {basketItems.map((item) => (
                                                <tr key={item._id} className="group hover:bg-gray-50/30 transition-all duration-300">
                                                    <td className="py-8 px-6">
                                                        <div className="flex items-center gap-4 lg:gap-6">
                                                            <div className="w-20 h-20 lg:w-24 lg:h-24 bg-[#F6F7F9] rounded-2xl flex items-center justify-center p-4 group-hover:scale-105 transition-transform duration-300">
                                                                <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                                                            </div>
                                                            <span className="font-poppins font-semibold text-gray-900 text-sm lg:text-base">{item.name}</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-8 px-6 text-center">
                                                        <span className="font-orbitron font-bold text-gray-900 text-sm lg:text-base">${item.price.toFixed(2)}</span>
                                                    </td>
                                                    <td className="py-8 px-6">
                                                        <div className="flex items-center justify-center">
                                                            <div className="flex items-center bg-gray-50 border-2 border-gray-100 rounded-xl p-1">
                                                                <button
                                                                    onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                                                                    className="w-8 h-8 lg:w-10 lg:h-10 flex items-center justify-center text-gray-400 hover:text-[#ff512f] hover:bg-white rounded-lg transition-all cursor-pointer"
                                                                >
                                                                    <IconMinus size={14} />
                                                                </button>
                                                                <span className="w-8 lg:w-12 text-center font-bold text-gray-900 text-sm lg:text-base">{item.quantity}</span>
                                                                <button
                                                                    onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                                                                    className="w-8 h-8 lg:w-10 lg:h-10 flex items-center justify-center text-gray-400 hover:text-[#ff512f] hover:bg-white rounded-lg transition-all cursor-pointer"
                                                                >
                                                                    <IconPlus size={14} />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="py-8 px-6 text-center">
                                                        <span className="font-orbitron font-bold text-[#ff512f] text-base lg:text-lg">${(item.price * item.quantity).toFixed(2)}</span>
                                                    </td>
                                                    <td className="py-8 px-4 text-right">
                                                        <button
                                                            onClick={() => dispatch(removeItem(item._id))}
                                                            className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-300 hover:text-white hover:bg-[#ff512f] transition-all duration-300 cursor-pointer shadow-sm hover:shadow-lg hover:shadow-[#ff512f]/20"
                                                        >
                                                            <IconTrash size={18} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Mobile Product List */}
                                <div className="md:hidden space-y-4">
                                    {basketItems.map((item) => (
                                        <div key={item._id} className="bg-[#F9FAFB] rounded-3xl p-6 border border-gray-100 relative group">
                                            <button
                                                onClick={() => dispatch(removeItem(item._id))}
                                                className="absolute top-4 right-4 text-gray-300 hover:text-[#ff512f] transition-colors"
                                            >
                                                <IconTrash size={20} />
                                            </button>
                                            <div className="flex items-center gap-5 mb-6">
                                                <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center p-3 shadow-sm">
                                                    <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                                                </div>
                                                <div>
                                                    <h4 className="font-poppins font-semibold text-gray-900 text-sm mb-1 uppercase tracking-tight line-clamp-1">{item.name}</h4>
                                                    <span className="font-orbitron font-bold text-[#ff512f] text-sm">${item.price.toFixed(2)}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between pt-4 border-t border-gray-200/50">
                                                <div className="flex items-center bg-white border-2 border-gray-100 rounded-xl p-1">
                                                    <button onClick={() => handleQuantityChange(item._id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center text-gray-400">
                                                        <IconMinus size={14} />
                                                    </button>
                                                    <span className="w-8 text-center font-bold text-gray-900 text-xs">{item.quantity}</span>
                                                    <button onClick={() => handleQuantityChange(item._id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center text-gray-400">
                                                        <IconPlus size={14} />
                                                    </button>
                                                </div>
                                                <div className="text-right">
                                                    <span className="block text-[10px] text-gray-400 font-orbitron uppercase tracking-widest mb-1">Subtotal</span>
                                                    <span className="font-orbitron font-bold text-gray-900 text-sm">${(item.price * item.quantity).toFixed(2)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Bottom Bar: Coupon & Update */}
                                <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 pt-10 mt-2">
                                    <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                                        <div className="relative w-full sm:w-auto">
                                            <input
                                                type="text"
                                                placeholder="Coupon code"
                                                className="w-full sm:w-48 lg:w-64 border-2 border-gray-100 bg-gray-50 rounded-2xl px-6 py-4 text-[12px] lg:text-[13px] font-semibold focus:outline-none focus:border-[#ff512f] focus:bg-white transition-all placeholder:text-gray-400 uppercase tracking-wider"
                                            />
                                        </div>
                                        <button className="w-full sm:w-auto bg-[#1A1A1A] text-white font-orbitron font-bold text-[12px] lg:text-[13px] px-8 py-4 rounded-2xl hover:bg-[#ff512f] transition-all duration-300 transform active:scale-95 cursor-pointer shadow-lg shadow-black/5 hover:shadow-[#ff512f]/20 whitespace-nowrap uppercase tracking-widest">
                                            APPLY
                                        </button>
                                    </div>
                                    <Link to="/shop" className="w-full md:w-auto border-2 border-gray-100 text-gray-900 font-orbitron font-bold text-[12px] lg:text-[13px] text-center px-10 py-4 rounded-2xl hover:bg-gray-50 transition-all duration-300 transform active:scale-95 cursor-pointer tracking-widest uppercase">
                                        CONTINUE SHOPPING
                                    </Link>
                                </div>
                            </div>

                            {/* Basket Right (Sidebar) */}
                            <div className="lg:w-[420px] xl:w-[480px] w-full sticky top-32">
                                <div className="bg-[#F9FAFB] border border-gray-100 rounded-[32px] p-6 md:p-10 shadow-sm relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/40 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />

                                    <h3 className="text-base lg:text-lg font-orbitron font-bold text-gray-900 mb-8 uppercase tracking-widest text-center">Cart Totals</h3>

                                    <div className="space-y-6">
                                        <div className="flex justify-between items-center pb-6 border-b border-gray-200/50">
                                            <span className="text-gray-400 font-poppins font-medium uppercase text-[10px] lg:text-[11px] tracking-[0.2em]">Subtotal</span>
                                            <span className="font-orbitron font-bold text-gray-900 text-sm lg:text-base">${subtotal.toFixed(2)}</span>
                                        </div>

                                        <div className="pb-8 border-b border-gray-200/50">
                                            <span className="text-gray-400 font-poppins font-medium uppercase text-[10px] lg:text-[11px] tracking-[0.2em] block mb-6">Shipping</span>
                                            <div className="space-y-4">
                                                <label className="flex items-center justify-between group cursor-pointer">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${shipping === 30 ? 'border-[#ff512f] bg-[#ff512f]' : 'border-gray-300 bg-white'}`}>
                                                            {shipping === 30 && <div className="w-2 h-2 bg-white rounded-full" />}
                                                        </div>
                                                        <span className="text-xs lg:text-[13px] font-semibold text-gray-700 font-poppins">Flat rate:</span>
                                                    </div>
                                                    <span className="font-orbitron font-bold text-gray-900 text-xs lg:text-sm">$30.00</span>
                                                </label>
                                                <label className="flex items-center justify-between group cursor-pointer">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${shipping === 0 && subtotal > 0 ? 'border-[#ff512f] bg-[#ff512f]' : 'border-gray-300 bg-white'}`}>
                                                            {shipping === 0 && subtotal > 0 && <div className="w-2 h-2 bg-white rounded-full" />}
                                                        </div>
                                                        <span className="text-xs lg:text-[13px] font-semibold text-gray-700 font-poppins">{subtotal >= 70 ? 'Free shipping:' : 'Local pickup:'}</span>
                                                    </div>
                                                    <span className="font-orbitron font-bold text-gray-900 text-xs lg:text-sm">$0.00</span>
                                                </label>
                                            </div>
                                            <p className="text-[10px] lg:text-[11px] text-gray-400 mt-6 font-poppins leading-relaxed italic">
                                                Shipping options will be updated during checkout.
                                            </p>
                                        </div>

                                        <div className="pt-2">
                                            <div className="flex justify-between items-center mb-8">
                                                <span className="text-gray-900 font-orbitron font-bold uppercase tracking-widest text-xs lg:text-[13px]">Total</span>
                                                <span className="text-xl lg:text-2xl font-orbitron font-bold text-[#ff512f]">${total.toFixed(2)}</span>
                                            </div>

                                            <Link to="/checkout" className="w-full bg-gradient-to-r from-[#ff512f] to-[#dd2476] text-white font-orbitron font-bold py-5 rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-[#ff512f]/30 hover:shadow-[#ff512f]/50 hover:scale-[1.02] transform transition-all duration-300 active:scale-95 cursor-pointer uppercase tracking-widest text-[12px] lg:text-[13px]">
                                                Proceed To Checkout
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-[40px] p-16 md:p-32 text-center border-2 border-dashed border-gray-100 shadow-sm max-w-4xl mx-auto">
                            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8">
                                <IconShoppingCart size={40} className="text-gray-200" />
                            </div>
                            <h2 className="font-orbitron font-bold text-2xl text-gray-900 mb-4 uppercase tracking-wider">
                                Your basket is empty
                            </h2>
                            <p className="text-gray-500 font-poppins text-lg mb-10 max-w-md mx-auto">
                                Looks like you haven't added any products to your basket yet.
                            </p>
                            <Link
                                to="/shop"
                                className="inline-flex items-center justify-center bg-gray-900 text-white font-orbitron font-bold px-12 py-5 rounded-2xl hover:bg-[#ff512f] transition-all duration-300 transform active:scale-95 shadow-xl shadow-black/10 hover:shadow-[#ff512f]/30 uppercase tracking-[0.2em] text-[13px]"
                            >
                                Start Shopping
                            </Link>
                        </div>
                    )}
                </div>
            </section>
        </main>
    )
}
