import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import "./components/comp.css"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Home from './components/home.js';
import Farmers from './components/farmers.js';
import Admin from './components/admin.js';
import Testers from './components/testers';
import Suppliers from './components/suppliers';


function App() {
  return (
    <>
    <Router>

      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">Agrochain</Navbar.Brand>
          <Nav className="me-auto">

            <Nav.Link as={Link} to="/farmers">Farmers</Nav.Link>
            <Nav.Link href="/testers">Testers</Nav.Link>
            <Nav.Link href="/suppliers">Suppliers</Nav.Link>
            <Nav.Link href="/admin">Admin</Nav.Link>

          </Nav>
        </Container>
      </Navbar>
      

        <Routes>
          <Route  exact path='/' element={<Home />} />
          <Route exact path='/farmers' element={<Farmers />} />
          <Route  path='/admin' element={<Admin />} />
          <Route  path='/testers' element={<Testers />} />
          <Route  path='/suppliers' element={<Suppliers />} />

        </Routes>
    </Router>

    </>

  );
}

export default App;
