import {  ReactNode, createContext, useState, useEffect } from 'react';


interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
  }

interface Props {
props: ReactNode; 
}

const MyContext = createContext<Product[]>([]);


const MyProvider : React.FC<Props> = ({ props }) => {

  const [data, setData] = useState<Product[]>([]);

  
  const fetchData = async () => {

    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const jsonData = await response.json();
      setData(jsonData);
    } 
    
    catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {

    fetchData(); 

  }, []);

  return (
    <MyContext.Provider value={ data }>
      {props}
    </MyContext.Provider>
  );
};

export { MyProvider, MyContext };
