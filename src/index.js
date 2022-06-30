import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';


import App from './App';
import { UserProvider } from './contexts/user.context';
import { ProductsProvider } from './contexts/products.context';
import { CartProvider } from './contexts/cart.context';

import './index.scss';

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        {/* Products membutuhkan akses info user, maka urutannya UserProvider baru ProductsProvider */}
        <ProductsProvider>
          {/** Komponen apapun di bawah Provider (di dalam Komponen App termasuk App itu sendiri)
           *  memiliki akses thd CONTEXT value apapun yg disimpan di Provider 
           * Komponen BrowserRouter tidak bisa mengakses context */}
          <CartProvider>
            <App /> 
          </CartProvider>
        </ProductsProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
