import App from '@/App'
import About from '@/pages/about'
import AIComp from '@/pages/about/AI'
import ESSComp from '@/pages/about/ESS'
import UserComp from '@/pages/user'
import FontComp from '@/pages/font'
import Tailwind from '@/pages/tailwind'
import PopoverComp from '@/pages/popover'
import { createBrowserRouter, Navigate } from 'react-router-dom'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <div>Hello World</div>,
  },
  {
    path: '/home',
    Component: App,
  },
  {
    path: '/about',
    Component: About,
    children: [
      { path: 'ai', Component: AIComp },
      {
        path: 'ess',
        Component: ESSComp,
      },
    ],
  },
  {
    path: '/redirect',
    element: <Navigate to="/home" replace />,
  },
  {
    path: '/user/:id',
    Component: UserComp,
  },
  {
    path: '/font',
    Component: FontComp,
  },
  {
    path: '/tailwind',
    Component: Tailwind,
  },
  {
    path: '/popover',
    Component: PopoverComp,
  },
])
