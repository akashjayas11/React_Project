import './App.css';
import React from 'react';
import Header from './Components/Header/Header';
import ProductContainer from './Components/Product/productContainer';
import { CartProvider } from './Components/contexts/CartContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CartPage from './Components/Cart/CartPage';

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <CartProvider> 
          <Header />
          <Routes>
            <Route path="/" element={<ProductContainer />} />
            <Route path="/cart" element={<CartPage />}  />
          </Routes>
        </CartProvider>
      </Router>
    </div>
  );
};

export default App;
