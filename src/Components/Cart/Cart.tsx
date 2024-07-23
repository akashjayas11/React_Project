import { useProducts } from "../../Contexts/ItemsContext"
import './Cart.css'

function Cart(){

    const {cartItems, setCartItems} = useProducts()

    function RemoveCartItem(id:number){
        setCartItems((c)=> 
            c.filter(c=> c.id!==id
            )
    )

     

    }

    return(
        // <div className="container">
        <div className="outer">
            {cartItems.map((product) => (
                // <div key={product.id} className="row mb-4">
                //     <div className="col">
                //         <div className="card h-100">
                //             <img
                //                 src={product.image}
                //                 className="card-img-top img-fluid"
                //                 alt={product.title}
                //                 style={{ maxHeight: '200px', objectFit: 'cover' }}
                //             />
                //             <div className="card-body">
                //                 <h5 className="card-title">{product.title}</h5>
                //                 <p className="card-text">{product.description}</p>
                //                 <p className="card-text">${product.price}</p>
                //                 <button className="btn btn-primary">Add to Cart</button>
                //             </div>
                //         </div>
                //     </div>
                // </div>
                <div  key={product.id} className="product">
                    <div className="product-image">
                        <img src={product.image} alt="Product Image"/>  
                    </div>
                    <div className="product-details">
                        <div className="product-title">{product.title}</div>
                        {/* <div className="product-description">{product.description}</div> */}
                        <div className="product-price">${product.price}</div>
                        <button onClick={()=>RemoveCartItem(product.id)} type="button" className="btn btn-danger btn-sm">Remove</button>
                    </div>
                </div>

            ))}
        </div>
        // </div>
    )

}

export default Cart