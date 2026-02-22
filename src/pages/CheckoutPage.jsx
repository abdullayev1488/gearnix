import React from 'react'
import { CheckoutForm } from '../sections/checkout/CheckoutForm'
import { OrderSummary } from '../sections/checkout/OrderSummary'
import { Link } from 'react-router'

export const CheckoutPage = () => {
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
                        <CheckoutForm />
                        <OrderSummary />
                    </div>
                </div>
            </section>
        </main>
    )
}
