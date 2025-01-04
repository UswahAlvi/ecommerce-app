import { useParams, useNavigate } from "react-router-dom"; 
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../slices/ProductSlice";
import { addedToCart } from "../slices/CartSlice";
import SpinnerFullPage from "../components/SpinnerFullPage";
import Spinner from "../components/Spinner";
import CartButton from "../components/CartButton";

export default function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate(); 
    const dispatch = useDispatch();
    const { isLoading, currentProduct: product } = useSelector(store => store.product);
    const [imageLoading, setImageLoading] = useState(true);
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCart = () => {
        dispatch(addedToCart({
            id: product.id,
            thumbnail: product.thumbnail,
            title: product.title,
            category: product.category,
            price: product.price,
        }));
        setIsAdded(true);
    };

    useEffect(() => {
        if (id) {
            dispatch(fetchProduct(id));
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (isAdded) {
            setTimeout(() => setIsAdded(false), 1000); // Reset after 1 second
        }
    }, [isAdded]);

    if (isLoading) {
        return <SpinnerFullPage />;
    }

    return (
        product && (
            <>
                <CartButton />
                <div className="container my-5">
                    <button className="btn btn-clr mb-4" onClick={() => navigate(-1)}>
                        Go Back
                    </button>
                    <h1 className="text-center mb-4">{product?.title}</h1>
                    <div className="row">
                        <div className="col-md-6">
                            {imageLoading && <Spinner />}
                            <img
                                src={product?.images?.[0]} 
                                alt={product?.title}
                                className={`img-fluid ${imageLoading ? "d-none" : ""}`}
                                onLoad={() => setImageLoading(false)}
                            />
                        </div>

                        <div className="col-md-6">
                            <h2>${product?.price?.toFixed(2)}</h2>
                            <p className="text-muted">Category: {product?.category}</p>
                            <p>{product?.description}</p>
                            <p><strong>Brand:</strong> {product?.brand}</p>
                            <p><strong>Stock Status:</strong> {product?.availabilityStatus}</p>
                            <p><strong>Rating:</strong> {product?.rating} / 5</p>
                            <p><strong>Warranty:</strong> {product?.warrantyInformation}</p>
                            <p><strong>Shipping:</strong> {product?.shippingInformation}</p>
                            <p><strong>Return Policy:</strong> {product?.returnPolicy}</p>
                            <p><strong>Minimum Order Quantity:</strong> {product?.minimumOrderQuantity}</p>
                            <button
                                className="btn btn-clr px-5"
                                onClick={handleAddToCart}
                                disabled={isAdded}
                            >
                                {isAdded ? "Added!" : "Add to Cart"}
                            </button>
                        </div>
                    </div>

                    <div className="my-5">
                        <h3>Customer Reviews</h3>
                        <div>
                            {product?.reviews?.length > 0 ? (
                                product?.reviews.map((review, index) => (
                                    <div key={index} className="border-bottom py-3">
                                        <p><strong>{review?.reviewerName}</strong> - {review?.rating} / 5</p>
                                        <p>{review?.comment}</p>
                                        <p className="text-muted">Posted on: {new Date(review?.date).toLocaleDateString()}</p>
                                    </div>
                                ))
                            ) : (
                                <p>No reviews yet.</p>
                            )}
                        </div>
                    </div>

                    <div className="text-center my-4">
                        <h4>Scan the QR code for more details</h4>
                        <img
                            src={product?.meta?.qrCode}
                            alt="Product QR Code"
                            style={{ width: '150px', height: '150px' }}
                        />
                    </div>
                </div>
            </>
        )
    );
}
