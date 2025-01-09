import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateQuantity, removeFromCart, deSelectParticularProduct } from "../slices/CartSlice";
import { useEffect, useState } from "react";
import FieldsForm from "../components/FieldsForm";
import ConfirmationModal from "../components/ConfirmationModal";

export default function Checkout() {
  
  const { cart, isParticularProductSelected, particularProduct } = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showFieldsModal,setShowFieldsModal]=useState(false);
  const toggleFieldsModal=()=>{
    setShowFieldsModal(!showFieldsModal);
  }
  const [showConfirmationModal,setShowConfirmationModal]=useState(false);
  const toggleConfirmationModal=()=>{
    setShowConfirmationModal(!showConfirmationModal);
  }


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
  const handleGoBack=()=>{
    dispatch(deSelectParticularProduct());
    navigate(-1);
  }

  const handlePlaceOrder=()=>{
    const savedData=localStorage.getItem('formData');
    savedData?toggleConfirmationModal():toggleFieldsModal()
  }

  return (
    <>
    <FieldsForm showFieldsModal={showFieldsModal} toggleFieldsModal={toggleFieldsModal} />
    <ConfirmationModal toggleFieldsModal={toggleFieldsModal}  showConfirmationModal={showConfirmationModal} toggleConfirmationModal={toggleConfirmationModal} />
    <div className="container my-5">
      <h1 className="text-center mb-4">Checkout</h1>

      {isParticularProductSelected ? (
        //  Particular product
        particularProduct ? (
          <>
            <button className="btn btn-clr mb-4" onClick={handleGoBack}>
                        Go Back
                    </button>
            <div className="row">
              <div className="col-md-8">
                <h3>Selected Product</h3>
                <div className="list-group-item d-flex align-items-center">
                  <img
                    src={particularProduct.thumbnail}
                    alt={particularProduct.title}
                    className="img-thumbnail me-3"
                    style={{ width: "80px", height: "80px", objectFit: "cover" }}
                  />
                  <div className="flex-grow-1">
                    <h5>{particularProduct.title}</h5>
                    <p className="mb-1 text-muted">{particularProduct.category}</p>
                    <p className="mb-1">Price: ${particularProduct.price.toFixed(2)}</p>
                  </div>
                  <span>${particularProduct.price.toFixed(2)}</span>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card">
                  <div className="card-body">
                    <h3>Order Summary</h3>
                    <p className="d-flex justify-content-between">
                      <span>Subtotal:</span>
                      <span>${particularProduct.price.toFixed(2)}</span>
                    </p>
                    <p className="d-flex justify-content-between">
                      <span>Tax (0%):</span>
                      <span>${(particularProduct.price * 0.0).toFixed(2)}</span>
                    </p>
                    <hr />
                    <h4 className="d-flex justify-content-between">
                      <span>Total:</span>
                      <span>${(particularProduct.price * 1.0).toFixed(2)}</span>
                    </h4>
                    <button className="btn btn-clr w-100 mt-3" onClick={()=>handlePlaceOrder()}>Place Order</button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <p className="text-center">No particular product selected.</p>
        )
      ) : (
        // Cart
        <>
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
            <div className="row">
              <div className="col-md-8">
                <h3>Cart Items</h3>
                <ul className="list-group">
                  {cart.map((item, index) => (
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
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </li>
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
                    <button className="btn btn-clr w-100 mt-3" onClick={()=>handlePlaceOrder()}>Place Order</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
    </>
  );
}
