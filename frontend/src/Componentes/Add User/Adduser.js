import React, {useState} from 'react'
import Nav from '../Nav/Nav'; 
import { useNavigate } from 'react-router-dom';

function Adduser() {
  const history = useNavigate();
  const [input, setInput] = useState({
    name: '',
    email: '',
    age: '',
    address: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const {name, value} = e.target;
    setInput({...input, [name]: value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic client-side validation
    if (!input.name.trim() || !input.email.trim() || !input.age.trim() || !input.address.trim()) {
      setMessage('All fields are required.');
      setTimeout(() => setMessage(''), 2000);
      return;
    }

    // Age validation
    if (isNaN(input.age) || Number(input.age) < 1) {
      setMessage('Please enter a valid age.');
      setTimeout(() => setMessage(''), 2000);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(input)
      });

      if (response.ok) {
        setMessage('User added successfully!');
        setTimeout(() => {
          setMessage('');
          history('/');
        }, 1500);
      } else {
        throw new Error('Failed to add user');
      }
    } catch (error) {
      console.error('Error adding user:', error);
      setMessage('Failed to add user');
    }
  };

  return (
    <div>
      <Nav />
      <div className="container mt-5">
        <h1>Add New User</h1>
        {message && <div className="alert alert-info" role="alert">{message}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input 
              type="text" 
              name="name"
              value={input.name}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input 
              type="email" 
              name="email"
              value={input.email}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Age</label>
            <input 
              type="number" 
              name="age"
              value={input.age}
              onChange={handleChange}
              className="form-control"
              required
              min="1"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Address</label>
            <textarea 
              name="address"
              value={input.address}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Add User</button>
        </form>
      </div>
    </div>
  );
}

export default Adduser;
