import React, { useState, useEffect } from 'react';
import api from '../services/api';
import SweetList from '../components/SweetList'; // We'll create this next

const HomePage = () => {
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSweets = async () => {
      try {
        const response = await api.get('/sweets');
        setSweets(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch sweets:', error);
        setLoading(false);
      }
    };

    fetchSweets();
  }, []);

  if (loading) {
    return <p>Loading sweets...</p>;
  }

  return (
    <div>
      <h2>Our Sweets</h2>
      <SweetList sweets={sweets} />
    </div>
  );
};

export default HomePage;