import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addedToCart } from "../slices/ProductSlice";
import { useState, useEffect } from "react";

export default function Product({ product }) {
    const { id, title, thumbnail, price } = product;
    const dispatch = useDispatch();
    const { cart } = useSelector((store) => store.product);
    
    const isProductInCart = cart.some((item) => item.id === id);

    const handleAddToCart = () => {
        if (!isProductInCart) {
            dispatch(addedToCart(product));
        }
    };

    return (
        <div className="col-sm-6 col-md-4 col-lg-3 mb-4">
            <div className="card shadow-sm h-100">
                <Link to={`/products/${id}`} key={id} className="text-decoration-none">
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
                    <p className="card-text text-muted">${price}</p>
                </div>
                <div className="card-footer bg-transparent border-0">
                    <button
                        className="btn btn-clr w-100"
                        onClick={handleAddToCart}
                        disabled={isProductInCart} 
                    >
                        {isProductInCart ? "Added!" : "Add to Cart"}
                    </button>
                </div>
            </div>
        </div>
    );
}
