import React, { useState } from 'react';

export default function PersonalDetailsField({ formData, handleInputChange }) {
  const initialDnDState = {
    draggedFrom: null,
    draggedTo: null,
    isDragging: false,
    updatedOrder: []
  };

  const [dragAndDrop, setDragAndDrop] = useState(initialDnDState);
  const [fieldsOrder, setFieldsOrder] = useState([
    "name", "phone", "email", "address"
  ]);

  const handleDragStart = (event, fieldName) => {
    const initialPosition = fieldsOrder.indexOf(fieldName);
    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: initialPosition,
      isDragging: true,
      updatedOrder: fieldsOrder
    });
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    const draggedFrom = dragAndDrop.draggedFrom;
    const draggedTo = event.currentTarget.dataset.position;

    if (draggedFrom === draggedTo) return;

    const newOrder = [...fieldsOrder];
    const itemDragged = newOrder[draggedFrom];
    newOrder.splice(draggedFrom, 1);
    newOrder.splice(draggedTo, 0, itemDragged);

    if (draggedTo !== dragAndDrop.draggedTo) {
      setDragAndDrop({
        ...dragAndDrop,
        draggedTo: draggedTo,
        updatedOrder: newOrder
      });
    }
  };

  const handleDrop = (event) => {
    const newOrder = dragAndDrop.updatedOrder;
    setFieldsOrder(newOrder);
    setDragAndDrop(initialDnDState);
  };

  return (
    <>
      {fieldsOrder.map((fieldName, index) => (
        <div
          key={fieldName}
          className="mb-3"
          data-position={index}
          draggable="true"
          onDragStart={(e) => handleDragStart(e, fieldName)}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <label htmlFor={fieldName} className="form-label">
            {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
          </label>
          {fieldName === "address" ? (
            <textarea
              className="form-control"
              id={fieldName}
              name={fieldName}
              value={formData[fieldName]}
              rows="3"
              placeholder={`Enter your ${fieldName}`}
              onChange={handleInputChange}
              required
            />
          ) : (
            <input
              type={fieldName === "phone" ? "tel" : fieldName === "email" ? "email" : "text"}
              className="form-control"
              id={fieldName}
              name={fieldName}
              value={formData[fieldName]}
              placeholder={`Enter your ${fieldName}`}
              onChange={handleInputChange}
              required
            />
          )}
        </div>
      ))}
    </>
  );
}
