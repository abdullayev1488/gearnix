import React from 'react'
import { countries } from '@/const/countries'

export const CheckoutForm = ({ formData, handleChange }) => {
    return (
        <div className="flex-[2] w-full">
            <h2 className="text-xl md:text-2xl font-orbitron font-bold text-gray-900 mb-8 uppercase tracking-widest text-center md:text-left">
                Billing Details
            </h2>

            <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-[12px] font-orbitron font-bold uppercase tracking-wider text-gray-500">First name *</label>
                        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full border-2 border-gray-100 bg-gray-50 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-[#ff512f] focus:bg-white transition-all" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[12px] font-orbitron font-bold uppercase tracking-wider text-gray-500">Last name *</label>
                        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full border-2 border-gray-100 bg-gray-50 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-[#ff512f] focus:bg-white transition-all" />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[12px] font-orbitron font-bold uppercase tracking-wider text-gray-500">Country / Region *</label>
                    <select name="country" value={formData.country} onChange={handleChange} className="w-full border-2 border-gray-100 bg-gray-50 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-[#ff512f] focus:bg-white transition-all cursor-pointer">
                        <option value="">Select a country...</option>
                        {countries.map((country, index) => (
                            <option key={index} value={country}>{country}</option>
                        ))}
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="text-[12px] font-orbitron font-bold uppercase tracking-wider text-gray-500">Street address *</label>
                    <input type="text" name="streetAddress" value={formData.streetAddress} onChange={handleChange} placeholder="House number and street name" className="w-full border-2 border-gray-100 bg-gray-50 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-[#ff512f] focus:bg-white transition-all mb-4" />
                    <input type="text" name="apartment" value={formData.apartment} onChange={handleChange} placeholder="Apartment, suite, unit, etc. (optional)" className="w-full border-2 border-gray-100 bg-gray-50 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-[#ff512f] focus:bg-white transition-all" />
                </div>

                <div className="space-y-2">
                    <label className="text-[12px] font-orbitron font-bold uppercase tracking-wider text-gray-500">Town / City *</label>
                    <input type="text" name="city" value={formData.city} onChange={handleChange} className="w-full border-2 border-gray-100 bg-gray-50 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-[#ff512f] focus:bg-white transition-all" />
                </div>

                <div className="space-y-2">
                    <label className="text-[12px] font-orbitron font-bold uppercase tracking-wider text-gray-500">State / County *</label>
                    <input type="text" name="state" value={formData.state} onChange={handleChange} className="w-full border-2 border-gray-100 bg-gray-50 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-[#ff512f] focus:bg-white transition-all" />
                </div>

                <div className="space-y-2">
                    <label className="text-[12px] font-orbitron font-bold uppercase tracking-wider text-gray-500">Postcode / ZIP *</label>
                    <input type="text" name="postcode" value={formData.postcode} onChange={handleChange} className="w-full border-2 border-gray-100 bg-gray-50 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-[#ff512f] focus:bg-white transition-all" />
                </div>

                <div className="space-y-2">
                    <label className="text-[12px] font-orbitron font-bold uppercase tracking-wider text-gray-500">Phone *</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full border-2 border-gray-100 bg-gray-50 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-[#ff512f] focus:bg-white transition-all" />
                </div>

                <div className="space-y-2">
                    <label className="text-[12px] font-orbitron font-bold uppercase tracking-wider text-gray-500">Email address *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border-2 border-gray-100 bg-gray-50 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-[#ff512f] focus:bg-white transition-all" />
                </div>

                <div className="space-y-2 pt-4">
                    <label className="text-[12px] font-orbitron font-bold uppercase tracking-wider text-gray-500">Order notes (optional)</label>
                    <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        placeholder="Notes about your order, e.g. special notes for delivery."
                        className="w-full border-2 border-gray-100 bg-gray-50 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-[#ff512f] focus:bg-white transition-all min-h-[120px] resize-none"
                    ></textarea>
                </div>
            </form>
        </div>
    )
}
