import React from 'react'
import { Link } from 'react-router-dom'
export const TopSection = ({ title, breadcrumbs }) => {
    return (
        <section className='pt-25 pb-100 bg-size-[1400px] overflow-hidden bg-[#f6f6f6] bg-no-repeat text-center' style={{ backgroundImage: 'url("/img/coccik.png")', backgroundPosition: 'center 45%' }} >
            <div className='container mx-auto px-4'>
                <h1 className='font-orbitron text-3xl font-bold tracking-wider mb-6 bg-gradient-to-b from-[#1e40af] to-black bg-clip-text text-transparent uppercase'>
                    {title}
                </h1>
                <nav className='flex justify-center items-center gap-2 text-xs text-[#555] font-medium uppercase tracking-widest'>
                    {breadcrumbs?.map((crumb, index) => (
                        <div key={index}>
                            {crumb.path ? (
                                <Link
                                    to={crumb.path}
                                    className='hover:text-black transition-colors duration-200'
                                >
                                    {crumb.label}
                                </Link>
                            ) : (
                                <span className='text-black font-semibold'>{crumb.label}</span>
                            )}
                            {index < breadcrumbs.length - 1 && (
                                <span className='text-[#888] mx-1'>{'>'}</span>
                            )}
                        </div>
                    ))}
                </nav>
            </div>
        </section>
    )
}
