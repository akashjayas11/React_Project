

import './App.css'
import Header from './components/Header/Header'
import ProductContainer from './components/productContainer'


function App() {

  return (
    <>
    < div className='navbar'>
<Header />
</div>
<div className='products'>
<ProductContainer />
</div>
    </>
  )
}

export default App
