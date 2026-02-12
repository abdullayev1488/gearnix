import React from 'react'
import { countries } from '../../const/countries'

export const CheckoutForm = () => {
    return (
        <div className="flex-[2] w-full">
            <h2 className="text-xl md:text-2xl font-orbitron font-bold text-gray-900 mb-8 uppercase tracking-widest text-center md:text-left">
                Billing Details
            </h2>

            <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-[12px] font-orbitron font-bold uppercase tracking-wider text-gray-500">First name *</label>
                        <input type="text" className="w-full border-2 border-gray-100 bg-gray-50 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-[#ff512f] focus:bg-white transition-all" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[12px] font-orbitron font-bold uppercase tracking-wider text-gray-500">Last name *</label>
                        <input type="text" className="w-full border-2 border-gray-100 bg-gray-50 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-[#ff512f] focus:bg-white transition-all" />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[12px] font-orbitron font-bold uppercase tracking-wider text-gray-500">Company name (optional)</label>
                    <input type="text" className="w-full border-2 border-gray-100 bg-gray-50 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-[#ff512f] focus:bg-white transition-all" />
                </div>

                <div className="space-y-2">
                    <label className="text-[12px] font-orbitron font-bold uppercase tracking-wider text-gray-500">Country / Region *</label>
                    <select className="w-full border-2 border-gray-100 bg-gray-50 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-[#ff512f] focus:bg-white transition-all cursor-pointer">
                        <option value="">Select a country...</option>
                        {countries.map((country, index) => (
                            <option key={index} value={country}>{country}</option>
                        ))}
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="text-[12px] font-orbitron font-bold uppercase tracking-wider text-gray-500">Street address *</label>
                    <input type="text" placeholder="House number and street name" className="w-full border-2 border-gray-100 bg-gray-50 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-[#ff512f] focus:bg-white transition-all mb-4" />
                    <input type="text" placeholder="Apartment, suite, unit, etc. (optional)" className="w-full border-2 border-gray-100 bg-gray-50 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-[#ff512f] focus:bg-white transition-all" />
                </div>

                <div className="space-y-2">
                    <label className="text-[12px] font-orbitron font-bold uppercase tracking-wider text-gray-500">Town / City *</label>
                    <input type="text" className="w-full border-2 border-gray-100 bg-gray-50 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-[#ff512f] focus:bg-white transition-all" />
                </div>

                <div className="space-y-2">
                    <label className="text-[12px] font-orbitron font-bold uppercase tracking-wider text-gray-500">State / County *</label>
                    <input type="text" className="w-full border-2 border-gray-100 bg-gray-50 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-[#ff512f] focus:bg-white transition-all" />
                </div>

                <div className="space-y-2">
                    <label className="text-[12px] font-orbitron font-bold uppercase tracking-wider text-gray-500">Postcode / ZIP *</label>
                    <input type="text" className="w-full border-2 border-gray-100 bg-gray-50 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-[#ff512f] focus:bg-white transition-all" />
                </div>

                <div className="space-y-2">
                    <label className="text-[12px] font-orbitron font-bold uppercase tracking-wider text-gray-500">Phone *</label>
                    <input type="tel" className="w-full border-2 border-gray-100 bg-gray-50 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-[#ff512f] focus:bg-white transition-all" />
                </div>

                <div className="space-y-2">
                    <label className="text-[12px] font-orbitron font-bold uppercase tracking-wider text-gray-500">Email address *</label>
                    <input type="email" className="w-full border-2 border-gray-100 bg-gray-50 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-[#ff512f] focus:bg-white transition-all" />
                </div>

                <div className="pt-4 space-y-4">
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <input type="checkbox" className="w-5 h-5 rounded border-2 border-gray-200 text-[#ff512f] focus:ring-[#ff512f] cursor-pointer" />
                        <span className="text-sm font-poppins font-semibold text-gray-700">Create an account?</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <input type="checkbox" className="w-5 h-5 rounded border-2 border-gray-200 text-[#ff512f] focus:ring-[#ff512f] cursor-pointer" />
                        <span className="text-sm font-poppins font-semibold text-gray-900 group-hover:text-[#ff512f] transition-colors">Ship to a different address?</span>
                    </label>
                </div>

                <div className="space-y-2 pt-4">
                    <label className="text-[12px] font-orbitron font-bold uppercase tracking-wider text-gray-500">Order notes (optional)</label>
                    <textarea
                        placeholder="Notes about your order, e.g. special notes for delivery."
                        className="w-full border-2 border-gray-100 bg-gray-50 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-[#ff512f] focus:bg-white transition-all min-h-[120px] resize-none"
                    ></textarea>
                </div>
            </form>
        </div>
    )
}
