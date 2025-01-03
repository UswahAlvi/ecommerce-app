import { useParams } from "react-router-dom"; 
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../../slices/ProductSlice";

export default function ProductDetail() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { isLoading, currentProduct: product } = useSelector(store => store.product);

    useEffect(() => {
        if (id) {
            dispatch(fetchProduct(id));
        }
    }, [dispatch, id]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!product) {
        return <div>Product not found.</div>;
    }

    return (
        <div className="container my-5">
            <h1 className="text-center mb-4">{product?.title}</h1>
            <div className="row">
                <div className="col-md-6">
                    <img
                        src={product?.images?.[0]} 
                        alt={product?.title}
                        className="img-fluid"
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
                    <a href="/cart" className="btn btn-primary btn-lg mt-3">Add to Cart</a>
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
    );
}
