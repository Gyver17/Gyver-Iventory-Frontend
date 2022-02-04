import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import NavBar from '../components/NavBar/NavBar';
import Products from '../pages/Inventory/Products/Products';
import Home from '../pages/Home/Home';
import Category from '../pages/Inventory/Category/Category';
import Employee from '../pages/Persons/Employee/Employee';
import Supplier from '../pages/Persons/Supplier/Supplier';
import Client from '../pages/Persons/Client/Client';
import LogIn from '../pages/Log/LogIn';
import InvoicePurchases from '../pages/Purchases/InvoicePurchases/InvoicePurchases';
import ReturnPurchases from '../pages/Purchases/ReturnPurchases/ReturnPurchases';
import PayPurchases from '../pages/Purchases/PayPurchases/PayPurchases';
import InvoiceSales from '../pages/Sales/InvoiceSales/InvoiceSales';
import ReturnSales from '../pages/Sales/ReturnSales/ReturnSales';
import PaySales from '../pages/Sales/PaySales/PaySales';
import CategoryConsult from '../pages/Consult/Category/CategoryConsult';
import ProductsConsult from '../pages/Consult/Products/ProductsConsult';
import MovementsConsult from '../pages/Consult/Movements/MovementsConsult';
import InvoiceConsult from '../pages/Consult/Invoice/InvoiceConsult';
import SupplierConsult from '../pages/Consult/Supplier/SupplierConsult';
import ClientConsult from '../pages/Consult/Client/ClientConsult';
import CompanySetting from '../pages/Setting/Company/CompanySetting';
import FormatSetting from '../pages/Setting/Format/FormatSetting';
import MoneySetting from '../pages/Setting/Money/MoneySetting';
import UsersSetting from '../pages/Setting/Users/UsersSetting';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import PrivateRoute from './PrivateRoute';
import PublicRouter from './PublicRouter';

import { useContext } from 'react';
import { AuthContext } from '../context/authProvider';
import SessionExpired from "../components/SessionExpired/SessionExpired"

const AppRouter = () => {
  const [state] = useContext(AuthContext)
  const { sessionExpired } = state

  return (
    <>
    <Router>
      <NavBar />
      <Routes>

        {/* Private Routes*/}
        <Route element={<PrivateRoute />} >
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<Products />} />
          <Route path='/category' element={<Category />} />
          <Route path='/employee' element={<Employee />} />
          <Route path='/supplier' element={<Supplier />} />
          <Route path='/client' element={<Client />} />
          <Route path='/purchases/invoice' element={<InvoicePurchases />} />
          <Route path='/purchases/return' element={<ReturnPurchases />} />
          <Route path='/purchases/pay' element={<PayPurchases />} />
          <Route path='/sales/invoice' element={<InvoiceSales />} />
          <Route path='/sales/return' element={<ReturnSales />} />
          <Route path='/sales/pay' element={<PaySales />} />
          <Route path='/consult/category' element={<CategoryConsult />} />
          <Route path='/consult/products' element={<ProductsConsult />} />
          <Route path='/consult/movements' element={<MovementsConsult />} />
          <Route path='/consult/invoice' element={<InvoiceConsult />} />
          <Route path='/consult/supplier' element={<SupplierConsult />} />
          <Route path='/consult/client' element={<ClientConsult />} />
          <Route path='/setting/company' element={<CompanySetting />} />
          <Route path='/setting/format' element={<FormatSetting />} />
          <Route path='/setting/money' element={<MoneySetting />} />
          <Route path='/setting/users' element={<UsersSetting />} />
        </Route>

        {/* Public Routes */}
        <Route element={<PublicRouter />} >
          <Route path='/login' element={<LogIn />} />
        </Route>

        <Route path='*' element={<NotFoundPage />} />
        
      </Routes>
    </Router>
    {sessionExpired && <SessionExpired />}
    </>
  )
}

export default AppRouter
