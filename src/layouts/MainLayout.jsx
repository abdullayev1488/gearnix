import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

export const MainLayout = () => {
  const location = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}
