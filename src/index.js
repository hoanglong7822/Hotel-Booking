import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import HotelsSearch from './routes/listings/HotelsSearch';
import UserProfile from './routes/user-profile/UserProfile';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import Home from './routes/home/Home';
import HotelDetails from './routes/hotel-details/HotelDetails';
import Login from './routes/login/Login';
import Register from './routes/register/Register';
import AboutUs from './routes/about-us/AboutUs';
import BaseLayout from './routes/layouts/base-layout/BaseLayout';
import ForgotPassword from './routes/forgot-password/ForgotPassword';
import Checkout from 'routes/checkout/Checkout';
import BookingConfirmation from 'routes/booking-confimation/BookingConifrmation';
import { store } from './redux/store';
import { Provider } from 'react-redux';
const router = createBrowserRouter([
  {
    path: '/',
    element: <BaseLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/hotels',
        element: <HotelsSearch />,
      },
      {
        path: '/about-us',
        element: <AboutUs />,
      },
      {
        path: '/user-profile/:userId',
        element: <UserProfile />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/hotel/:hotelId',
        element: <HotelDetails />,
      },
      {
        path: '/forgot-password',
        element: <ForgotPassword />,
      },
      {
        path: '/checkout',
        element: <Checkout />,
      },
      {
        path: '/booking-confirmation',
        element: <BookingConfirmation />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

reportWebVitals();
