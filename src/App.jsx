import { RouterProvider } from 'react-router'
import { Toaster } from 'react-hot-toast'
import { router } from './router/AppRouter'
import './App.css'

export const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="bottom-right" />
    </>
  )
}
