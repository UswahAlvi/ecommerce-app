import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateQuantity, removeFromCart } from "../slices/CartSlice"; 

export default function Checkout() {
  const { cart } = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalPrice = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  const handleIncrease = (id) => {
    dispatch(updateQuantity({ id, quantity: 1 })); 
  };

  const handleDecrease = (id) => {
    const item = cart.find((product) => product.id === id);
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id, quantity: -1 })); 
    } else {
      dispatch(removeFromCart(id));
    }
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Checkout</h1>

      {cart.length === 0 ? (
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{ height: "50vh" }}
        >
          <p className="text-center">Your cart is empty. Add some products to proceed to checkout.</p>
          <button className="btn btn-clr mt-3" onClick={() => navigate('/products')}>
            Go to Products
          </button>
        </div>
      ) : (
        <>
          <div className="row">
            <div className="col-md-8">
              <h3>Cart Items</h3>
              <ul className="list-group">
                {cart.map((item, index) => (
                  <>
                  <li key={index} className="list-group-item d-flex align-items-center">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="img-thumbnail me-3"
                      style={{ width: "80px", height: "80px", objectFit: "cover" }}
                    />
                    <div className="flex-grow-1">
                      <h5>{item.title}</h5>
                      <p className="mb-1 text-muted">{item.category}</p>
                      <p className="mb-1">Price: ${item.price.toFixed(2)}</p>
                      <div className="d-flex align-items-center gap-2">
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => handleDecrease(item.id)}
                        >
                          -
                        </button>
                        <span>{item.quantity || 1}</span>
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => handleIncrease(item.id)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <span>${(item.price * (item.quantity)).toFixed(2)}</span>
                    
                  </li>
                  </>
                ))}
              </ul>
              <button className="btn btn-clr mt-3" onClick={() => navigate('/products')}>
                        Add more Products
                    </button>
            </div>

            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h3>Order Summary</h3>
                  <p className="d-flex justify-content-between">
                    <span>Subtotal:</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </p>
                  <p className="d-flex justify-content-between">
                    <span>Tax (0%):</span>
                    <span>${(totalPrice * 0.0).toFixed(2)}</span>
                  </p>
                  <hr />
                  <h4 className="d-flex justify-content-between">
                    <span>Total:</span>
                    <span>${(totalPrice * 1.0).toFixed(2)}</span>
                  </h4>
                  <button className="btn btn-clr w-100 mt-3">Place Order</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
