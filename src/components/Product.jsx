import { Link } from "react-router-dom";

export default function Product({ product }) {
    const { id, title, thumbnail, price } = product;

    return (
        <Link to={`/products/${id}`} key={id} className="col-sm-6 col-md-4 col-lg-3 mb-4">
            <div className="card shadow-sm h-100">
                <img
                    src={thumbnail}
                    alt={title}
                    className="card-img-top"
                    style={{
                        height: '300px',  
                        objectFit: 'cover',  
                    }}
                />
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text text-muted">${price}</p>
                </div>
            </div>
        </Link>
    );
}
