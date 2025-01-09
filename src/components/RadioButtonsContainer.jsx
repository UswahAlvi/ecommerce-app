
export default function RadioButtonsContainer({showPersonalDetailFields, setShowPersonalDetailFields}) {
  return (
    <div className="gap-2 mb-3 d-flex flex-row justify-content-around">
                <div>
                  <input
                    type="radio"
                    id="personalDetails"
                    name="fieldToggle"
                    checked={showPersonalDetailFields}
                    onChange={() => setShowPersonalDetailFields(true)}
                  />
                  <label htmlFor="personalDetails" className="ms-2">
                    Personal Details
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="cardDetails"
                    name="fieldToggle"
                    checked={!showPersonalDetailFields}
                    onChange={() => setShowPersonalDetailFields(false)}
                  />
                  <label htmlFor="cardDetails" className="ms-2">
                    Card Details
                  </label>
                </div>
              </div>
  )
}
