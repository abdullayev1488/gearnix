import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { setAuthOpen } from '@/redux/slice/uiSlice';
import { clearBasket } from '@/redux/slice/basketSlice';
import api from '@/axios/axios';
import toast from 'react-hot-toast';

export const OrderSummary = ({ formData }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const basketItems = useSelector((state) => state.basket.items);
    const user = useSelector((state) => state.auth.user);
    const [paymentMethod, setPaymentMethod] = useState('bank_transfer');
    const [agreedTerms, setAgreedTerms] = useState(false);
    const [loading, setLoading] = useState(false);

    const subtotal = basketItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = subtotal > 70 || basketItems.length === 0 ? 0 : 20;
    const total = subtotal + shipping;

    const handlePlaceOrder = async () => {
        // Check login
        if (!user) {
            toast.error('Please login to place an order', { position: 'bottom-right' });
            dispatch(setAuthOpen(true));
            return;
        }

        // Validate basket
        if (basketItems.length === 0) {
            toast.error('Your basket is empty', { position: 'bottom-right' });
            return;
        }

        // Validate required fields
        const { firstName, lastName, country, streetAddress, city, state, postcode, phone, email } = formData;
        if (!firstName || !lastName || !country || !streetAddress || !city || !state || !postcode || !phone || !email) {
            toast.error('Please fill in all required billing fields', { position: 'bottom-right' });
            return;
        }

        // Validate terms
        if (!agreedTerms) {
            toast.error('Please agree to the terms and conditions', { position: 'bottom-right' });
            return;
        }

        setLoading(true);

        try {
            const orderData = {
                user: user._id,
                customer: {
                    name: `${firstName} ${lastName}`,
                    email: email,
                    phone: phone,
                    address: `${streetAddress}${formData.apartment ? ', ' + formData.apartment : ''}, ${city}, ${state} ${postcode}, ${country}`,
                },
                items: basketItems.map(item => ({
                    product: item._id,
                    name: item.name,
                    image: item.image,
                    price: item.price,
                    quantity: item.quantity,
                })),
                totalAmount: total,
                paymentMethod: paymentMethod,
            };

            const { data } = await api.post('/order', orderData);

            if (data.success) {
                dispatch(clearBasket());
                toast.success(`Order placed successfully! 🎉 Order #${data.data.orderNumber}`, {
                    position: 'bottom-right',
                    duration: 4000,
                });
                navigate('/');
            }
        } catch (error) {
            const msg = error.response?.data?.message || 'Failed to place order';
            toast.error(msg, { position: 'bottom-right' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="lg:w-[420px] xl:w-[480px] w-full sticky top-32">
            <div className="bg-[#F9FAFB] border border-gray-100 rounded-[32px] p-6 md:p-10 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/40 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />

                <h3 className="text-base lg:text-lg font-orbitron font-bold text-gray-900 mb-8 uppercase tracking-widest text-center">Your Order</h3>

                <div className="space-y-6">
                    <table className="w-full border-separate border-spacing-0">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-4 text-gray-400 font-orbitron font-bold uppercase text-[10px] tracking-widest">Product</th>
                                <th className="text-right py-4 text-gray-400 font-orbitron font-bold uppercase text-[10px] tracking-widest">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {basketItems.map((item) => (
                                <tr key={item._id}>
                                    <td className="py-4 text-sm font-poppins font-medium text-gray-700">{item.name} × {item.quantity}</td>
                                    <td className="py-4 text-right font-orbitron font-bold text-gray-900 text-sm">${(item.price * item.quantity).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="space-y-4 pt-4">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-400 font-poppins font-medium uppercase text-[10px] tracking-[0.2em]">Subtotal</span>
                            <span className="font-orbitron font-bold text-gray-900 text-sm">${subtotal.toFixed(2)}</span>
                        </div>

                        <div className="flex justify-between items-center py-4 border-y border-gray-200/50">
                            <span className="text-gray-400 font-poppins font-medium uppercase text-[10px] tracking-[0.2em]">Shipping</span>
                            <span className="font-poppins font-semibold text-gray-700 text-xs">Flat rate: ${shipping.toFixed(2)}</span>
                        </div>

                        <div className="flex justify-between items-center pt-2">
                            <span className="text-gray-900 font-orbitron font-bold uppercase tracking-widest text-xs">Total</span>
                            <span className="text-xl lg:text-2xl font-orbitron font-bold text-[#ff512f]">${total.toFixed(2)}</span>
                        </div>
                    </div>

                    {/* Payment Methods */}
                    <div className="pt-8 space-y-4">
                        <div className="p-4 bg-white rounded-2xl border border-gray-100">
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input type="radio" name="payment" value="bank_transfer" checked={paymentMethod === 'bank_transfer'} onChange={(e) => setPaymentMethod(e.target.value)} className="w-4 h-4 text-[#ff512f] focus:ring-[#ff512f]" />
                                <span className="text-sm font-orbitron font-bold text-gray-900 uppercase tracking-tight">Direct bank transfer</span>
                            </label>
                            <p className="text-[11px] text-gray-400 mt-2 font-poppins leading-relaxed italic">
                                Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.
                            </p>
                        </div>

                        <label className="flex items-center gap-3 cursor-pointer p-4 hover:bg-gray-50 rounded-2xl transition-colors">
                            <input type="radio" name="payment" value="check" checked={paymentMethod === 'check'} onChange={(e) => setPaymentMethod(e.target.value)} className="w-4 h-4 text-[#ff512f] focus:ring-[#ff512f]" />
                            <span className="text-sm font-orbitron font-bold text-gray-700 uppercase tracking-tight">Check payments</span>
                        </label>

                        <label className="flex items-center gap-3 cursor-pointer p-4 hover:bg-gray-50 rounded-2xl transition-colors">
                            <input type="radio" name="payment" value="cash" checked={paymentMethod === 'cash'} onChange={(e) => setPaymentMethod(e.target.value)} className="w-4 h-4 text-[#ff512f] focus:ring-[#ff512f]" />
                            <span className="text-sm font-orbitron font-bold text-gray-700 uppercase tracking-tight">Cash on delivery</span>
                        </label>
                    </div>

                    <p className="text-[11px] text-gray-400 font-poppins leading-relaxed">
                        Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our <span className="text-[#ff512f] underline cursor-pointer">privacy policy</span>.
                    </p>

                    <label className="flex items-start gap-3 cursor-pointer group">
                        <input type="checkbox" checked={agreedTerms} onChange={(e) => setAgreedTerms(e.target.checked)} className="mt-1 w-4 h-4 rounded border-2 border-gray-200 text-[#ff512f] focus:ring-[#ff512f]" />
                        <span className="text-[11px] font-poppins font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">
                            I have read and agree to the website <span className="text-[#ff512f] underline">terms and conditions</span> *
                        </span>
                    </label>

                    <button
                        onClick={handlePlaceOrder}
                        disabled={loading}
                        className="w-full bg-[#1A1A1A] text-white font-orbitron font-bold py-5 rounded-2xl hover:bg-[#ff512f] transition-all duration-300 transform active:scale-95 cursor-pointer uppercase tracking-widest text-[12px] shadow-lg hover:shadow-[#ff512f]/20 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Processing...' : 'Order'}
                    </button>
                </div>
            </div>
        </div>
    )
}
