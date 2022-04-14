import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from "../components/NavBar/NavBar";
import Products from "../pages/Inventory/Products/Products";
import Home from "../pages/Home/Home";
import Category from "../pages/Inventory/Category/Category";
import Services from "../pages/Inventory/Services/Services";
import Employee from "../pages/Persons/Employee/Employee";
import Supplier from "../pages/Persons/Supplier/Supplier";
import Client from "../pages/Persons/Client/Client";
import LogIn from "../pages/Log/LogIn";
import InvoicePurchases from "../pages/Purchases/InvoicePurchases/InvoicePurchases";
import ReturnPurchases from "../pages/Purchases/ReturnPurchases/ReturnPurchases";
import PayPurchases from "../pages/Purchases/PayPurchases/PayPurchases";
import InvoiceSales from "../pages/Sales/InvoiceSales/InvoiceSales";
import ReturnSales from "../pages/Sales/ReturnSales/ReturnSales";
import PaySales from "../pages/Sales/PaySales/PaySales";
import CategoryConsult from "../pages/Consult/Category/CategoryConsult";
import ProductsConsult from "../pages/Consult/Products/ProductsConsult";
import MovementsConsult from "../pages/Consult/Movements/MovementsConsult";
import InvoiceConsult from "../pages/Consult/Invoice/InvoiceConsult";
import SupplierConsult from "../pages/Consult/Supplier/SupplierConsult";
import ClientConsult from "../pages/Consult/Client/ClientConsult";
import CompanySetting from "../pages/Setting/Company/CompanySetting";
import MoneySetting from "../pages/Setting/Money/MoneySetting";
import UsersSetting from "../pages/Setting/Users/UsersSetting";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import PrivateRoute from "./PrivateRoute";
import PublicRouter from "./PublicRouter";

import { useContext } from "react";
import { AuthContext } from "../context/authProvider";
import SessionExpired from "../components/SessionExpired/SessionExpired";

const AppRouter = () => {
  const [state] = useContext(AuthContext);
  const { user, permissions, sessionExpired } = state;

  return (
    <>
      <Router>
        {user && <NavBar />}
        <Routes>
          {/* Private Routes*/}
          <Route element={<PrivateRoute />}>
            <Route path='/' element={<Home />} />
            {permissions?.products && (
              <Route path='/products' element={<Products />} />
            )}
            {permissions?.category && (
              <Route path='/category' element={<Category />} />
            )}
            {permissions?.services && (
              <Route path='/services' element={<Services />} />
            )}
            {permissions?.employee && (
              <Route path='/employee' element={<Employee />} />
            )}
            {permissions?.supplier && (
              <Route path='/supplier' element={<Supplier />} />
            )}
            {permissions?.client && (
              <Route path='/client' element={<Client />} />
            )}
            {permissions?.buy && (
              <Route path='/purchases/invoice' element={<InvoicePurchases />} />
            )}
            {permissions?.buy_return && (
              <Route path='/purchases/return' element={<ReturnPurchases />} />
            )}
            {permissions?.buy_pay && (
              <Route path='/purchases/pay' element={<PayPurchases />} />
            )}
            {permissions?.sell && (
              <Route path='/sales/invoice' element={<InvoiceSales />} />
            )}
            {permissions?.sell_return && (
              <Route path='/sales/return' element={<ReturnSales />} />
            )}
            {permissions?.sell_pay && (
              <Route path='/sales/pay' element={<PaySales />} />
            )}
            {permissions?.consult_category && (
              <Route path='/consult/category' element={<CategoryConsult />} />
            )}
            {permissions?.consult_product && (
              <Route path='/consult/products' element={<ProductsConsult />} />
            )}
            {permissions?.consult_movement && (
              <Route path='/consult/movements' element={<MovementsConsult />} />
            )}
            {permissions?.consult_invoice && (
              <Route path='/consult/invoice' element={<InvoiceConsult />} />
            )}
            {permissions?.consult_supplier && (
              <Route path='/consult/supplier' element={<SupplierConsult />} />
            )}
            {permissions?.consult_client && (
              <Route path='/consult/client' element={<ClientConsult />} />
            )}
            {permissions?.setting && (
              <Route path='/setting/company' element={<CompanySetting />} />
            )}
            {permissions?.setting && (
              <Route path='/setting/money' element={<MoneySetting />} />
            )}
            {permissions?.setting && (
              <Route path='/setting/users' element={<UsersSetting />} />
            )}
          </Route>

          {/* Public Routes */}
          <Route element={<PublicRouter />}>
            <Route path='/login' element={<LogIn />} />
          </Route>

          <Route path='*' element={<NotFoundPage />} />
        </Routes>
        {sessionExpired && <SessionExpired serverError={false} />}
      </Router>
    </>
  );
};

export default AppRouter;
