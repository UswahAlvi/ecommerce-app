import { useState, useEffect } from "react";
import CardFields from "./CardFields";
import PersonalDetailsField from "./PersonalDetailsField";
import RadioButtonsContainer from "./RadioButtonsContainer";

export default function FieldsForm({ showFieldsModal, toggleFieldsModal}) {
  const [showPersonalDetailFields, setShowPersonalDetailFields] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    cardNumber: "",
    cardholderName: "",
    expirationDate: "",
    cvv: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);

  // Load data from local storage when the component mounts
  useEffect(() => {
    const savedData = localStorage.getItem("formData");
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData(parsedData);
        validateForm(parsedData);
      } catch (error) {
        console.error("Error parsing local storage data:", error);
      }
    }
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => {
      const updatedData = { ...prevData, [name]: value };

      // Validate after state is updated
      validateForm(updatedData);

      return updatedData;
    });
  };

  const validateForm = (data) => {
    let isValid = false;
    isValid =
      data.name &&
      data.email &&
      data.phone &&
      data.address &&
      data.cardNumber &&
      data.cardholderName &&
      data.expirationDate &&
      data.cvv &&
      validateEmail(data.email) &&
      validatePhone(data.phone) &&
      validateCardNumber(data.cardNumber) &&
      validateCVV(data.cvv) &&
      validateExpirationDate(data.expirationDate);

    console.log("Form Validity:", isValid);
    setIsFormValid(isValid);
  };

  // Validations for each input field
  const validatePhone = (phone) => {
    const phonePattern = /^[0-9]{10}$/; // 10 digits
    return phonePattern.test(phone);
  };

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Basic email pattern
    return emailPattern.test(email);
  };

  const validateCardNumber = (cardNumber) => {
    const cardNumberPattern = /^\d{16}$/; // 16 digits
    return cardNumberPattern.test(cardNumber.replace(/\s/g, "")); // Remove spaces for validation
  };

  const validateExpirationDate = (expirationDate) => {
    const expirationPattern = /^(0[1-9]|1[0-2])\/\d{2}$/; // MM/YY format
    return expirationPattern.test(expirationDate);
  };

  const validateCVV = (cvv) => {
    const cvvPattern = /^\d{3,4}$/; // 3 or 4 digits
    return cvvPattern.test(cvv);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Save the form data to local storage
    localStorage.setItem("formData", JSON.stringify(formData));

    console.log("Form Data Saved:", formData);
    alert("order placed successfully!");

    toggleFieldsModal();
  };

  return (
    <>
      
      {showFieldsModal && <div className="modal-backdrop fade show"></div>}
      

      <div
        className={`modal fade ${showFieldsModal ? "show" : ""}`}
        tabIndex="-1"
        style={{ display: showFieldsModal ? "block" : "none" }}
        aria-labelledby="FieldsModalLabel"
        aria-hidden={!showFieldsModal}
        aria-modal={showFieldsModal}
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered text-color">
          <div className="modal-content p-5 modal-bg d-flex flex-column align-items-center mb-4">
            <h2 className="fw-normal fs-2 pb-3">Order Details</h2>

            <form className="w-100" onSubmit={handleSubmit}>
              {/* Toggling the sections using radio buttons */}
              <RadioButtonsContainer
                showPersonalDetailFields={showPersonalDetailFields}
                setShowPersonalDetailFields={setShowPersonalDetailFields}
              />

              {/* Conditional Fields */}
              {showPersonalDetailFields ? (
                <PersonalDetailsField
                  formData={formData}
                  handleInputChange={handleInputChange}
                />
              ) : (
                <CardFields formData={formData} handleInputChange={handleInputChange}/>
              )}

              {/* Buttons */}
              <div className="w-100 d-flex justify-content-between">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={toggleFieldsModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={!isFormValid}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
