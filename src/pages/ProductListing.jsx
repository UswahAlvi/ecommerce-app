import { useSelector } from "react-redux";
import Product from "../components/Product";
import SpinnerFullPage from "../components/SpinnerFullPage";

export default function ProductListing() {
    const { products, isLoading } = useSelector((store) => store.product);

    if (isLoading) {
        return <SpinnerFullPage />
    }

    return (
        <div className="container my-5">
            <h1 className="text-center mb-4">Product Listing</h1>
            <div
                className="d-flex flex-row flex-wrap justify-content-between"
                style={{ gap: '15px' }}
            >
                {products.map((product) => (
                  <Product product={product} key={product.id}/>
                ))}
            </div>
        </div>
    );
}
