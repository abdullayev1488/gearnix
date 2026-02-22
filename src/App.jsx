import { RouterProvider } from 'react-router'
import { router } from './router/AppRouter'
import './App.css'

export const App = () => {
  return (
    <RouterProvider router={router} />
  )
}
