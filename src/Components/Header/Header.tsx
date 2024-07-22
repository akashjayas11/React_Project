import { useState, createContext } from 'react'
import styles from './Header.module.css'
import img from '../../assets/logo.png'
import Temp from '../../Temp.tsx'
import { Link } from 'react-router-dom'

// export const UserContext = createContext({})

function Header() {

  const [count, setCount] = useState(0)

  function changeCount() {
    setCount((c) => c + 1)
  }



  return (
    <>
      <div className={styles.header_Container}>

        <img src={img} />

        <span className={styles.cartIcon}>

          <Link to="/cart">
            <i className="bi bi-cart4" />
          </Link>

          <p className={styles.counter}>{count}</p>


          {/* <UserContext.Provider value={changeCount}>
           <Temp counter={changeCount}/>
     </UserContext.Provider> */}

        </span>

      </div>

      {/* <Temp counter={changeCount}/> */}

      {/* <p>Hi</p> */}

    </>
  )
}

export default Header