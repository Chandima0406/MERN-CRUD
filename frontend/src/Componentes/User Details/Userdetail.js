import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../Nav/Nav'; 
import axios from 'axios';

const URL = 'http://localhost:5000/users';

function Userdetail() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);  // Initialize as empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHandler = async () => {
    try {
      setLoading(true);
      const response = await axios.get(URL);
      console.log('API Response:', response.data); // Add this line
      // Check if response.data is an array
      if (Array.isArray(response.data)) {
        setUsers(response.data);
      } else if (response.data.users) {
        // If data is wrapped in an object
        setUsers(response.data.users);
      } else {
        setUsers([]); // Set empty array if no valid data
        setError('Invalid data format received');
      }
    } catch (error) {
      setError('Error fetching user data');
      console.error('Error fetching data:', error);
      setUsers([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHandler();
  }, []);

  const handleViewDetails = (userId) => {
    navigate(`/edituser/${userId}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <Nav />
      <div className="user-details-container">
        <h1>User Details</h1>
        <div className="users-grid">
          {users && users.map((user) => (
            <div key={user._id} className="user-card">
              <h2>{user.name}</h2>
              <div className="user-info">
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Address:</strong> {user.address}</p>
                <button 
                  onClick={() => handleViewDetails(user._id)}
                  className="view-details-btn"
                >
                  Edit User Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Userdetail;
