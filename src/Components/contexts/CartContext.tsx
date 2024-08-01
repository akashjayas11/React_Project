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

type Props = {
children:ReactNode
}

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: Product, index:number) => void;
  removeFromCart: (index:number, item: Product) => void;
  clearCart: () => void;
  buttonClicks: (index: number, isfromAdd:boolean ) => void;
  buttonClicked: boolean[];
}

export const CartContext = createContext({} as CartContextType);

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }:Props) => {

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const a = new Array(20);
  const [buttonClicked, setButtonClicked] = useState(a.map(()=> false));

  const addToCart = (item: Product, index:number) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        )
      );
    }
    
    else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
    
  };

  // const removeFromCart = (itemId: number) => {
  //   const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
  //   setCartItems(updatedCartItems);
  // };

  const buttonClicks = (index: number, isfromAdd: boolean)=>{
    
    // const Item = cartItems.find((item)=> item.id==product.id)
        const updateButtonsClick = buttonClicked

        if(isfromAdd)
        {
        updateButtonsClick[index] = true
        
        setButtonClicked(updateButtonsClick);
        }

        else
        {
          updateButtonsClick[index] = false
        
          setButtonClicked(updateButtonsClick);
        }

    }

  const removeFromCart = (index:number, item: Product) => {

    const quantity1 = cartItems.find((cartItem) => (cartItem.id === item.id) &&(cartItem.quantity>1) );

    if(quantity1){
    setCartItems( cartItems.map((cartItem) =>
      cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem))
    }

    else{
    const updatedCartItems = cartItems.filter((cartitem) => cartitem.id !== item.id );
     setCartItems(updatedCartItems);
     buttonClicks(index,false);
    }

  };


  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, buttonClicks, buttonClicked}}>
      {children}
    </CartContext.Provider>
  );
};
