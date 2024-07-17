import img from './assets/logo.png'

type Props = {
    counter:()=>void
}

function Temp ({counter}:Props) {

    return(
    <div className="row row-cols-1 row-cols-md-3 g-4" style={{margin:'100px 10px' }}>

        <div className="col">
            <div className="card h-100">
                <img src={img} className="card-img-top" alt="..."/>

                <div className="card-body"> 
                    <button onClick={counter}>Add</button>
                </div>

            </div>
        </div>

        {/* <div className="col">
            <div className="card h-100">
            <img src="..." className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">This is a short card.</p>
            </div>
            </div>
        </div>   */}
        
        {/* <div className="col">
            <div className="card h-100">
            <img src="..." className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.</p>
            </div>
            </div>
        </div>
        <div className="col">
            <div className="card h-100">
            <img src="..." className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            </div>
            </div>
        </div> */}
    </div>
    )

}
export default Temp