import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'
import LayoutOne from './Layout/LayoutOne'
import Homepage from './Pages/Homepage/Homepage'
import AddTask from './Pages/AddTask/AddTask'
import ViewTask from './Pages/ViewTask/ViewTask'
import { Provider } from 'react-redux'
import store from './Redux/store'
import { AuthProvider } from './Provider/authProvider'
import Signup from './Pages/Signup/Signup'
import Signin from './Pages/Signin/Signin'
import UserRoute from './PrivateRoute/UserRoute'
import MyProfile from './Pages/MyProfile/MyProfile'

const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutOne></LayoutOne>,
    children: [
      {
        path: '/',
        element: <Homepage></Homepage>
      },
      {
        path: '/signup',
        element: <Signup></Signup>
      },
      {
        path: '/signin',
        element: <Signin></Signin>
      },
      {
        path: '/add-task',
        element: <UserRoute><AddTask></AddTask></UserRoute>
      },
      {
        path: '/view-task',
        element: <UserRoute><ViewTask></ViewTask></UserRoute>
      },
      {
        path: '/my-profile',
        element: <UserRoute><MyProfile></MyProfile></UserRoute>
      }
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <Provider store={store}>
          <RouterProvider router={router}>
          </RouterProvider>
      </Provider>
    </AuthProvider>
  </React.StrictMode>,
)
