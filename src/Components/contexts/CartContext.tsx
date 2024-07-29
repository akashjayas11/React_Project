import React, { createContext, ReactNode, useContext, useState } from 'react';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}
type Props={
children:ReactNode
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Product) => void;
  removeFromCart: (item: Product) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {}
});

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }:Props) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const addToCart = (item: Product) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  // const removeFromCart = (itemId: number) => {
  //   const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
  //   setCartItems(updatedCartItems);
  // };
  const removeFromCart = (item: Product) => {
    const quantity1 = cartItems.find((cartItem) => (cartItem.id === item.id) &&(cartItem.quantity>1) );
    if(quantity1){
    setCartItems( cartItems.map((cartItem) =>
      cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem))
    }
    else{
      const updatedCartItems = cartItems.filter((cartitem) => cartitem.id !== item.id );
     setCartItems(updatedCartItems);
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
