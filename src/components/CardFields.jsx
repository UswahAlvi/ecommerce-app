

export default function CardFields({formData,handleInputChange}) {
  return (
    <>
    <div className="mb-3">
      <label htmlFor="cardNumber" className="form-label">
        Card Number
      </label>
      <input
        type="text"
        className="form-control"
        id="cardNumber"
        name="cardNumber"
        value={formData.cardNumber}
        placeholder="1234 5678 9012 3456"
        maxLength="19"
        onChange={handleInputChange}
        required
      />
    </div>

    <div className="mb-3">
      <label htmlFor="cardholderName" className="form-label">
        Cardholder Name
      </label>
      <input
        type="text"
        className="form-control"
        id="cardholderName"
        name="cardholderName"
        value={formData.cardholderName}
        placeholder="Uswah Alvi"
        onChange={handleInputChange}
        required
      />
    </div>

    <div className="row">
      <div className="col-md-6 mb-3">
        <label htmlFor="expirationDate" className="form-label">
          Expiration Date
        </label>
        <input
          type="text"
          className="form-control"
          id="expirationDate"
          name="expirationDate"
          value={formData.expirationDate}
          placeholder="MM/YY"
          maxLength="5"
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="col-md-6 mb-3">
        <label htmlFor="cvv" className="form-label">
          CVV
        </label>
        <input
          type="text"
          className="form-control"
          id="cvv"
          name="cvv"
          value={formData.cvv}
          placeholder="123"
          maxLength="4"
          onChange={handleInputChange}
          required
        />
      </div>
    </div>
  </>
  );
}
