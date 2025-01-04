import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addedToCart } from "../slices/CartSlice";
import { useEffect, useState } from "react"; 

export default function Product({ product }) {
    const { id, title, thumbnail, price, category } = product;
    const dispatch = useDispatch();
    const [isAdded,setIsAdded]=useState(false);

    const handleAddToCart = () => {
            dispatch(
                addedToCart({
                    id,        
                    thumbnail,   
                    title, 
                    category,    
                    price         
                })
            );
            setIsAdded(true);
    };

    useEffect(()=>{
        if(isAdded==true){
            setTimeout(()=>setIsAdded(false),800);
        }
    },[isAdded])

    return (
        <div className="col-sm-6 col-md-4 col-lg-3 mb-4">
            <div className="card shadow-sm h-100">
                <Link to={`/products/${id}`} className="text-decoration-none">
                    <img
                        src={thumbnail}
                        alt={title}
                        className="card-img-top"
                        style={{
                            height: "300px",  
                            objectFit: "cover",  
                        }}
                    />
                </Link>
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-dark">{title}</h5>
                    <p className="card-text text-muted">${price.toFixed(2)}</p>
                </div>
                <div className="card-footer bg-transparent border-0">
                    <button
                        className="btn btn-clr w-100"
                        onClick={handleAddToCart}>
                            {isAdded?'Added!':'Add to Cart'}
                    </button>
                </div>
            </div>
        </div>
    );
}
