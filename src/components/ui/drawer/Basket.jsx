import { IconX, IconTrash, IconPlus, IconMinus, IconTruck, IconShoppingCart } from "@tabler/icons-react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setBasketOpen } from "@/redux/slice/uiSlice";
import { removeItem, updateQuantity } from "@/redux/slice/basketSlice";

export const Basket = () => {
    const dispatch = useDispatch();
    const isOpen = useSelector((state) => state.ui.basketOpen);
    const { items: basketItems } = useSelector((state) => state.basket);
    const navigate = useNavigate();

    const subtotal = basketItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const freeShippingThreshold = 70;
    const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
    const shippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

    const handleQuantityChange = (id, newQuantity) => {
        if (newQuantity >= 0) {
            dispatch(updateQuantity({ id, quantity: newQuantity }));
        }
    };

    return (
        <>
            <div
                onClick={() => dispatch(setBasketOpen(false))}
                className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[998] transition-all duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}
            />
            <div
                className={`fixed top-0 right-0 h-full w-full min-[451px]:w-[350px] bg-white z-[999] shadow-2xl transform transition-transform duration-500 ease-in-out flex flex-col ${isOpen ? "translate-x-0" : "translate-x-full"}`}
            >
                {/* Title */}
                <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <IconShoppingCart size={20} className="text-gray-900" />
                            <span className="absolute -top-1.5 -right-1.5 bg-[#ff512f] text-white text-[8px] font-bold w-3.5 h-3.5 flex items-center justify-center rounded-full">
                                {basketItems.length}
                            </span>
                        </div>
                        <h2 className="font-orbitron text-[13px] font-bold uppercase tracking-wider text-gray-900">
                            Basket
                        </h2>
                    </div>
                    <button
                        onClick={() => dispatch(setBasketOpen(false))}
                        className="p-1 hover:bg-gray-100 rounded-full transition-colors cursor-pointer text-gray-400 hover:text-black"
                    >
                        <IconX size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto px-5 py-6">
                    {basketItems.length > 0 ? (
                        <>
                            {/* Progress Bar */}
                            <div className="mb-8">
                                <div className="flex items-center justify-center mb-2">
                                    <IconTruck size={25} className="text-[#ff512f]" />
                                </div>
                                <div className="w-full bg-gray-100 h-1 rounded-full overflow-hidden relative mb-2">
                                    <div
                                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#ff512f] to-[#dd2476] rounded-full transition-all duration-500"
                                        style={{ width: `${shippingProgress}%` }}
                                    />
                                </div>
                                <p className="text-center text-[11px] text-gray-500 font-poppins">
                                    {remainingForFreeShipping > 0 ? (
                                        <>Spend <span className="font-bold text-black">${remainingForFreeShipping.toFixed(2)}</span> more for <span className="font-bold text-black uppercase">Free Shipping</span></>
                                    ) : (
                                        <span className="font-bold text-[#48bb78] uppercase">Free Shipping Unlocked!</span>
                                    )}
                                </p>
                            </div>

                            {/* Cart Items */}
                            <div className="space-y-4">
                                {basketItems.map((item) => (
                                    <div key={item._id} className="flex gap-3 p-3 border border-gray-100 rounded-xl relative group bg-white shadow-sm">
                                        <div className="w-18 h-18 bg-[#F6F7F9] rounded-lg flex items-center justify-center shrink-0">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                                        </div>

                                        <div className="flex-1 flex flex-col justify-center gap-1">
                                            <h3 className="font-orbitron text-[10px] font-bold text-gray-900 leading-snug pr-4 line-clamp-2 uppercase">
                                                {item.name}
                                            </h3>

                                            <div className="flex items-center justify-between mt-1">
                                                <div className="flex items-center border border-gray-200 rounded overflow-hidden h-6">
                                                    <button
                                                        onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                                                        className="px-1.5 py-[6px] cursor-pointer hover:bg-gray-100 hover:text-black transition-colors text-gray-400"
                                                    >
                                                        <IconMinus size={10} />
                                                    </button>
                                                    <span className="px-1.5 text-[10px] font-bold text-gray-800">{item.quantity}</span>
                                                    <button
                                                        onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                                                        className="px-1.5 py-[6px] cursor-pointer hover:bg-gray-100 hover:text-black transition-colors text-gray-400"
                                                    >
                                                        <IconPlus size={10} />
                                                    </button>
                                                </div>
                                                <span className="text-[12px] font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => dispatch(removeItem(item._id))}
                                            className="absolute cursor-pointer top-2 right-2 text-gray-300 hover:text-red-500 transition-colors"
                                        >
                                            <IconTrash size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center">
                                <IconShoppingCart size={32} className="text-gray-200" />
                            </div>
                            <h3 className="font-orbitron text-[13px] font-bold text-gray-900 uppercase">Your basket is empty</h3>
                            <button
                                onClick={() => dispatch(setBasketOpen(false))}
                                className="px-6 py-2 bg-black text-white rounded-full font-orbitron text-[10px] font-bold uppercase tracking-widest hover:bg-[#ff512f] transition-all cursor-pointer"
                            >
                                Shop Now
                            </button>
                        </div>
                    )}
                </div>

                {/* Footer */}
                {basketItems.length > 0 && (
                    <div className="p-5 border-t border-gray-100 bg-white shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
                        <div className="flex items-center justify-between mb-4">
                            <span className="font-orbitron font-bold uppercase text-[11px] text-gray-900 tracking-wider">Subtotal:</span>
                            <span className="font-orbitron font-bold text-base text-gray-900">${subtotal.toFixed(2)}</span>
                        </div>

                        <div className="space-y-2">
                            <button
                                onClick={() => {
                                    dispatch(setBasketOpen(false));
                                    navigate('/basket');
                                }}
                                className="w-full py-3.5 border border-gray-200 rounded-lg font-orbitron font-bold text-gray-800 hover:bg-gradient-to-r from-[#ff512f] to-[#dd2476] hover:text-white transition-all uppercase text-[10px] tracking-widest cursor-pointer text-center"
                            >
                                View Basket
                            </button>
                            <button
                                onClick={() => {
                                    dispatch(setBasketOpen(false));
                                    navigate('/checkout');
                                }}
                                className="w-full py-3.5 bg-gradient-to-r from-[#ff512f] to-[#dd2476] text-white rounded-lg font-orbitron font-bold hover:shadow-lg transition-all uppercase text-[10px] tracking-widest cursor-pointer text-center"
                            >
                                Checkout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};
