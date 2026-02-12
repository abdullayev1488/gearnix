import React from 'react'
import { TopSection } from '../sections/TopSection'
import { CheckoutForm } from '../sections/checkout/CheckoutForm'
import { OrderSummary } from '../sections/checkout/OrderSummary'

export const CheckoutPage = () => {
    return (
        <main className='pt-[80px]'>
            <TopSection title="Checkout" breadcrumbs={[
                { label: "Home", path: "/" },
                { label: "Checkout", path: null }
            ]} />

            <section className="py-12 md:py-24 bg-white">
                <div className="max-w-screen-2xl mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
                        <CheckoutForm />
                        <OrderSummary />
                    </div>
                </div>
            </section>
        </main>
    )
}
