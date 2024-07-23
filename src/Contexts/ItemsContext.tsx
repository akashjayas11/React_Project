import React, {  ReactNode, createContext, useState, useEffect, useContext } from 'react'


type Product = {
    id: number
    title: string
    price: number
    description: string
    category: string;
    image: string;
  }

type Props = {
children: ReactNode
}

type ContextType = {
    // fetchData : () => Promise<void> 
    productsdata: Product[]
    cartItems : Product[]
    setCartItems : React.Dispatch<React.SetStateAction<Product[]>>;
    count : number
    setCount : React.Dispatch<React.SetStateAction<number>>;
}

const MyContext = createContext({} as ContextType)

const useProducts = () => useContext(MyContext)


const MyProvider = ({ children } : Props) => {

  const [productsdata, setData] = useState<Product[]>([])
  const [cartItems, setCartItems] = useState<Product[]>([])
  const [count, setCount] = useState(0)

  
  const fetchData  = async () => {

    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const jsonData = await response.json()
      setData(jsonData);
    } 
    
    catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {

    fetchData();

  }, [])

  return (
    <MyContext.Provider value={{productsdata, cartItems, setCartItems, count, setCount}}>
      {children}
    </MyContext.Provider>
  )
}

export { MyProvider, useProducts }
