import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import AccountView from 'src/views/account/AccountView';
import CustomerListView from 'src/views/customer/CustomerListView';
import DashboardView from 'src/views/reports/DashboardView';
import LoginView from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';
import ProductListView from 'src/views/product/ProductListView';
import RegisterView from 'src/views/auth/RegisterView';
import SettingsView from 'src/views/settings/SettingsView';
import FeedbackListView from 'src/views/feedback/feedbackListView';
import OrderListView from 'src/views/order/OrderListView';
import EmailListView from 'src/views/email/EmailListView';
import AdminListView from 'src/views/admin/AdminListView';
import AdminLogin from 'src/views/admin/AdminListView/AdminLogin';
import FoundPassword from 'src/views/admin/AdminListView/ForgetPassword';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'account', element: <AccountView /> },
      { path: 'customers', element: <CustomerListView /> },
      { path: 'dashboard', element: <DashboardView /> },
      { path: 'products', element: <ProductListView /> },
      { path: 'settings', element: <SettingsView /> },
      { path: 'feedbacks', element: <FeedbackListView /> },
      { path: 'orders', element: <OrderListView /> },
      { path: 'emails', element: <EmailListView /> },
      { path: '*', element: <Navigate to="/404" /> },
      { path: 'admin', element: <AdminListView /> },
      { path: 'adminlogin', element: <AdminLogin /> },
      { path: 'foundpassword', element: <FoundPassword /> },
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <LoginView /> },
      { path: 'register', element: <RegisterView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <Navigate to="/app/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> },
    ]
  }
];

export default routes;
