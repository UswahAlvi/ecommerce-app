import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { emptyCart } from "../slices/CartSlice";
import FieldsForm from "./FieldsForm";
export default function ConfirmationModal({ 
    showConfirmationModal, 
    toggleConfirmationModal, 
    toggleFieldsModal,
  }) {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const handleYes=()=>{
        alert('order placed');
        dispatch(emptyCart());
        navigate('/products');
        toggleConfirmationModal();
    }
    const handleNo=()=>{
      toggleFieldsModal();
      toggleConfirmationModal();
    }
    return (
      <>
        
        {showConfirmationModal && <div className="modal-backdrop fade show"></div>}
  
        <div
          className={`modal fade ${showConfirmationModal ? 'show' : ''}`}
          tabIndex="-1"
          style={{ display: showConfirmationModal ? 'block' : 'none' }}
          aria-labelledby="confirmation-modal-label"
          aria-hidden={!showConfirmationModal}
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered text-color">
            <div className="modal-content p-5 modal-bg d-flex align-items-center mb-4">
              <h5 className="fw-normal fs-2 pb-5">Do you want to continue with previous address and payment details?</h5>
  
              <div className="w-100 d-flex justify-content-between">
                {/* No Button */}
                <button
                  type="button"
                  className="btn bg-transparent border-0 fs-4 text-muted"
                  onClick={handleNo}
                >
                  No
                </button>
  
                {/* Yes Button */}
                <button
                  type="button"
                  className="btn bg-transparent border-0 fs-4 text-primary"
                  onClick={handleYes}
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  