import React from 'react'

export const OrderSummary = () => {
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
                            <tr>
                                <td className="py-4 text-sm font-poppins font-medium text-gray-700">Precision Alpha × 1</td>
                                <td className="py-4 text-right font-orbitron font-bold text-gray-900 text-sm">$30.00</td>
                            </tr>
                            <tr>
                                <td className="py-4 text-sm font-poppins font-medium text-gray-700">Immersion Xtreme Pro × 1</td>
                                <td className="py-4 text-right font-orbitron font-bold text-gray-900 text-sm">$50.00</td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="space-y-4 pt-4">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-400 font-poppins font-medium uppercase text-[10px] tracking-[0.2em]">Subtotal</span>
                            <span className="font-orbitron font-bold text-gray-900 text-sm">$80.00</span>
                        </div>

                        <div className="flex justify-between items-center py-4 border-y border-gray-200/50">
                            <span className="text-gray-400 font-poppins font-medium uppercase text-[10px] tracking-[0.2em]">Shipping</span>
                            <span className="font-poppins font-semibold text-gray-700 text-xs">Flat rate: $20.00</span>
                        </div>

                        <div className="flex justify-between items-center pt-2">
                            <span className="text-gray-900 font-orbitron font-bold uppercase tracking-widest text-xs">Total</span>
                            <span className="text-xl lg:text-2xl font-orbitron font-bold text-[#ff512f]">$100.00</span>
                        </div>
                    </div>

                    {/* Payment Methods */}
                    <div className="pt-8 space-y-4">
                        <div className="p-4 bg-white rounded-2xl border border-gray-100">
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input type="radio" name="payment" defaultChecked className="w-4 h-4 text-[#ff512f] focus:ring-[#ff512f]" />
                                <span className="text-sm font-orbitron font-bold text-gray-900 uppercase tracking-tight">Direct bank transfer</span>
                            </label>
                            <p className="text-[11px] text-gray-400 mt-2 font-poppins leading-relaxed italic">
                                Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.
                            </p>
                        </div>

                        <label className="flex items-center gap-3 cursor-pointer p-4 hover:bg-gray-50 rounded-2xl transition-colors">
                            <input type="radio" name="payment" className="w-4 h-4 text-[#ff512f] focus:ring-[#ff512f]" />
                            <span className="text-sm font-orbitron font-bold text-gray-700 uppercase tracking-tight">Check payments</span>
                        </label>

                        <label className="flex items-center gap-3 cursor-pointer p-4 hover:bg-gray-50 rounded-2xl transition-colors">
                            <input type="radio" name="payment" className="w-4 h-4 text-[#ff512f] focus:ring-[#ff512f]" />
                            <span className="text-sm font-orbitron font-bold text-gray-700 uppercase tracking-tight">Cash on delivery</span>
                        </label>
                    </div>

                    <p className="text-[11px] text-gray-400 font-poppins leading-relaxed">
                        Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our <span className="text-[#ff512f] underline cursor-pointer">privacy policy</span>.
                    </p>

                    <label className="flex items-start gap-3 cursor-pointer group">
                        <input type="checkbox" className="mt-1 w-4 h-4 rounded border-2 border-gray-200 text-[#ff512f] focus:ring-[#ff512f]" />
                        <span className="text-[11px] font-poppins font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">
                            I have read and agree to the website <span className="text-[#ff512f] underline">terms and conditions</span> *
                        </span>
                    </label>

                    <button className="w-full bg-[#1A1A1A] text-white font-orbitron font-bold py-5 rounded-2xl hover:bg-[#ff512f] transition-all duration-300 transform active:scale-95 cursor-pointer uppercase tracking-widest text-[12px] shadow-lg hover:shadow-[#ff512f]/20">
                        Place Order
                    </button>
                </div>
            </div>
        </div>
    )
}
