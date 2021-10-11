import React,{useState} from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

import Login from './login';
import Register from './register'
import './components.css';
  
const Header = ({token,setToken}) => {

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  
  if(sessionStorage.getItem("token"))
  {
        return (
      <div>
        <Navbar style={{display:"flex",justifyContent:"space-between"}} color="danger" light expand="md">
          <NavbarBrand style={{fontFamily:"cursive"}} href="/home">Blood Bank</NavbarBrand>
          <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem className="navBtn">
              <NavLink href="/home" active>Home</NavLink>
            </NavItem>
            <NavItem className="navBtn">
              <NavLink href="/donors">Donors</NavLink>
            </NavItem>
            <NavItem className="navBtn">
              <NavLink href="/requests">Requests</NavLink>
            </NavItem>
            <NavItem className="navBtn">
              <NavLink href="/inventory">Inventory</NavLink>
            </NavItem >
            <NavItem className="navBtn">
              <NavLink href="/history">History</NavLink>
            </NavItem>
            <NavItem className="navBtn">
              <NavLink href="/logins">Logins</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
          <Login token={token} setToken={setToken}/>
          <Register/>
        </Navbar>
      </div>
    );
  }
  else{
    return(
            <div>
        <Navbar style={{display:"flex",justifyContent:"space-between"}} color="danger" light expand="md">
          <NavbarBrand style={{fontFamily:"cursive"}} href="/home">Blood Bank</NavbarBrand>
          <Nav className="mr-auto" navbar>
            <NavItem className="navBtn">
              <NavLink href="/home" active>Home</NavLink>
            </NavItem>
            </Nav>
          <Login token={token} setToken={setToken}/>
        </Navbar>
      </div>
    );
  }
}

export default Header;