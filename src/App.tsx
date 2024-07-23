import './App.css'
import Header from './Components/Header/Header'
import ProductContainer from './Components/ProductiContainer/productContainer'
import Cart from './Components/Cart/Cart'
import {Route, Routes} from 'react-router-dom'
import { useEffect } from 'react'
import { MyProvider } from './Contexts/ItemsContext'


function App() {

  // useEffect(() => {
  
  // },);

  return (
    <>
    < div className='app'>
      <Header />

      <Routes >

        <Route path='/' element={<ProductContainer/>} />
        <Route path='/cart' element={<Cart/>} />

      </Routes>

    </div>
    

    </>
  )
}

export default App
