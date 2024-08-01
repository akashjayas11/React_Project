import { createContext, ReactNode, useContext, useState } from 'react';

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
  children: ReactNode;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: Product, index: number) => void;
  removeFromCart: (index: number, item: Product) => void;
  clearCart: () => void;
  buttonClicks: (index: number, isFromAdd: boolean) => void;
  buttonClicked: boolean[];
  error: string | null;
};

const CartContext = createContext<CartContextType>({} as CartContextType);

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }: Props) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [buttonClicked, setButtonClicked] = useState<boolean[]>([]);
  const [error, setError] = useState<string | null>(null);

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


  const removeFromCart = (index: number, item: Product) => {
    try {
      setCartItems((prevCartItems) => {
        const existingItem = prevCartItems.find((cartItem) => cartItem.id === item.id);

        if (existingItem && existingItem.quantity > 1) {
          return prevCartItems.map((cartItem) =>
            cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
          );
        } else {
          return prevCartItems.filter((cartItem) => cartItem.id !== item.id);
        }
      });

      buttonClicks(index, false);
    } catch (e) {
      setError('Error removing item from cart.');
    }
  };

  const buttonClicks = (index: number, isFromAdd: boolean) => {
    setButtonClicked((prevButtonClicked) => {
      const updatedButtonClicked = [...prevButtonClicked];
      updatedButtonClicked[index] = isFromAdd;
      return updatedButtonClicked;
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, buttonClicks, buttonClicked, error }}>
      {children}
    </CartContext.Provider>
  );
};
