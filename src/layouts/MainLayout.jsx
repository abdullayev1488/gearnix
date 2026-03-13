import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Outlet, useLocation } from 'react-router'
import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

export const MainLayout = () => {
  const location = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
    AOS.init()
  }, [location.pathname])
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}
