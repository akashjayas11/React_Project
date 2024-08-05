import { createContext, ReactNode, useContext, useState } from 'react';

export interface Product {
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
  children: ReactNode;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: Product, index: number) => void;
  removeFromCart: (index: number, item: Product) => void;
  clearCart: () => void;
  handleButtonClicks: (index: number, isFromAdd: boolean) => void;
  buttonClickList: boolean[];
  error: string | null;
};

const CartContext = createContext<CartContextType>({} as CartContextType);


export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }: Props) => {

  //state varible for storing products in CART
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  //state variable for storing boolean value to diaplay either 'Add to Cart' button (or) 'quantity increment(+) and decrement(-)' buttons
  const [buttonClickList, setButtonClickList] = useState<boolean[]>([]);

  const [error, setError] = useState<string | null>(null);

  //method to add products and change quantity for products in CART
  const addToCart = (item: Product, index: number) => {
    try {
      setCartItems((prevCartItems) => {
        const existingItem = prevCartItems.find((cartItem) => cartItem.id === item.id);

        if (existingItem) {
          return prevCartItems.map((cartItem) =>
            cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
          );
        } else {
          return [...prevCartItems, { ...item, quantity: 1 }];
        }
      });
    } catch (e) {
      setError('Error adding item to cart.');
    }
  };


  //method to remove and decrement quantity of products in CART
  const removeFromCart = (index: number, item: Product) => {

    try {
      setCartItems((prevCartItems) => {
        const existingItem = prevCartItems.find((cartItem) => cartItem.id === item.id);

        if (existingItem && existingItem.quantity > 1) {
          return prevCartItems.map((cartItem) =>
            cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
          );
        } else {
          handleButtonClicks(index, false);
          return prevCartItems.filter((cartItem) => cartItem.id !== item.id);
        }
      });
    } 
    
    catch (e) {
      setError('Error removing item from cart.');
    }
  };

  //method to set boolean values whether 'Add to Cart' button is clicked for each product
  const handleButtonClicks = (index: number, isFromAdd: boolean) => {
    setButtonClickList((prevButtonClicked) => {
      const updatedButtonClicked = [...prevButtonClicked];
      updatedButtonClicked[index] = isFromAdd;
      return updatedButtonClicked;
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, handleButtonClicks, buttonClickList, error }}>
      {children}
    </CartContext.Provider>
  );
};
