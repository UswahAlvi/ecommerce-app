import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CartButton() {
    const navigate = useNavigate();
    const { cart } = useSelector(store => store.cart);

    return (
        <div className="position-fixed top-0 z-3 end-0 m-2 mt-5 p-1">
            <button
                className="btn btn-clr d-flex align-items-center gap-2 fs-3"
                onClick={() => navigate('/checkout')}
            >
                🛒 Cart
                {cart.length > 0 && (
                    <span className="badge bg-danger fs-5">{cart.length}</span>
                )}
            </button>
        </div>
    );
};
