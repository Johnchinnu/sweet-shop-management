import React from 'react';
import api from '../services/api'; // <-- This is the missing line

const SweetList = ({ sweets }) => {
  const handlePurchase = async (sweetId) => {
    try {
      await api.post(`/sweets/${sweetId}/purchase`);
      alert('Purchase successful!');
      window.location.reload();
    } catch (error) {
      alert('Purchase failed. Sweet may be out of stock.');
      console.error(error);
    }
  };
  
  if (!sweets || sweets.length === 0) {
    return <p>No sweets available. Please ask an admin to add some.</p>;
  }

  return (
    <div className="sweet-grid">
      {sweets.map((sweet) => (
        <div key={sweet._id} className="sweet-card">
          <h3>{sweet.name}</h3>
          <p>Category: {sweet.category}</p>
          <p>Price: ${sweet.price}</p>
          <p>In Stock: {sweet.quantity}</p>
          <button onClick={() => handlePurchase(sweet._id)} disabled={sweet.quantity === 0}>
            Purchase
          </button>
        </div>
      ))}
    </div>
  );
};

export default SweetList;