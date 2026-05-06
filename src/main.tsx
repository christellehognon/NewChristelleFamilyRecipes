import { RouterProvider } from '@tanstack/react-router'
import { getRouter } from './router'
import ReactDOM from 'react-dom/client'
import './styles.css'

const router = getRouter()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)