import React, { useState } from 'react'
import { CheckoutForm } from '@/sections/checkout/CheckoutForm'
import { OrderSummary } from '@/sections/checkout/OrderSummary'
import { Link } from 'react-router'

export const CheckoutPage = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        country: '',
        streetAddress: '',
        apartment: '',
        city: '',
        state: '',
        postcode: '',
        phone: '',
        email: '',
        notes: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <main className='pt-[80px]'>
            <section className="py-12 md:py-24 bg-white">
                <div className="max-w-screen-2xl mx-auto px-4">
                    <div className="flex items-center gap-2 text-[15px] text-gray-400 mb-8">
                        <Link to="/" className="hover:text-gray-900 hover:font-semibold cursor-pointer transition-colors">Home</Link>
                        <span className="text-gray-300">/</span>
                        <Link to="/shop" className="text-gray-900 font-semibold">Checkout</Link>
                    </div>
                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
                        <CheckoutForm formData={formData} handleChange={handleChange} />
                        <OrderSummary formData={formData} />
                    </div>
                </div>
            </section>
        </main>
    )
}
