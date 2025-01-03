import { useDispatch, useSelector } from "react-redux";
import Product from "../../components/Product";

export default function ProductListing() {
    const dispatch = useDispatch();
    const { products, isLoading } = useSelector((store) => store.product);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container my-5">
            <h1 className="text-center mb-4">Product Listing</h1>
            <div
                className="d-flex flex-row flex-wrap justify-content-between"
                style={{ gap: '20px' }}
            >
                {products.map((product) => (
                  <Product product={product} key={product.id}/>
                ))}
            </div>
        </div>
    );
}
