import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Nav from '../Nav/Nav';

const URL = 'http://localhost:5000/users';

function Edituser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${URL}/${id}`);
        const userData = response.data;
        console.log("Fetched user data:", userData);
        if (userData) {
          setUser({
            name: userData.name || '',
            email: userData.email || '',
            address: userData.address || ''
          });
        }
      } catch (error) {
        setError('Error fetching user data');
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  const handleUpdate = async (updatedUser) => {
    try {
      await axios.put(`${URL}/${id}`, updatedUser);
      navigate(`/edituser/${id}`);
    } catch (error) {
      setError('Error updating user data');
      console.error('Error updating user data:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
        <Nav />
        <div className="edit-user-container">
        <h1>Edit User</h1>
        {user && (  
            <form onSubmit={(e) => {
                e.preventDefault();
                handleUpdate(user);
            }}>
                <div>
                <label>Name:</label>
                <input
                    type="text"
                    value={user.name}
                    onChange={(e) => {
                        const newValue = e.target.value;
                        console.log("New name:", newValue);
                        setUser({ ...user, name: newValue });
                    }}
                />
                </div>
                <div>
                <label>Email:</label>
                <input
                    type="email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
                </div>
                <div>
                <label>Address:</label>
                <input
                    type="text"
                    value={user.address}
                    onChange={(e) => setUser({ ...user, address: e.target.value })}
                />
                </div>
                <button type="submit">Update User</button>
            </form>
            )}
        </div>
    </div>
  )
}

export default Edituser;
