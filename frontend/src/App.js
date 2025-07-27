import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './Componentes/Home/Home';
import Adduser from './Componentes/Add User/Adduser';
import Userdetail from './Componentes/User Details/Userdetail';
import Edituser from './Componentes/Edit user/Edituser';



function App() {
  return (
    <div>
      <React.Fragment>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/adduser" element={<Adduser />} />
        <Route path="/userdetails" element={<Userdetail />} />
        
        <Route path="/edituser/:id" element={<Edituser />} />
      </Routes>
      </React.Fragment>
    </div>

  );
}

export default App;
