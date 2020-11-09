import React from 'react'
import logo from './commons/images/icon.png';
import AuthenticationService from './login/service/authentication-service.js'

import {
    Nav,
    Navbar,
    NavbarBrand,
    NavLink,
} from 'reactstrap';

const textStyle = {
    color: 'white',
    textDecoration: 'none'
};

const NavigationBar = () => (
    <div>
        <Navbar color="dark" light expand="md">
            <NavbarBrand href="/">
                <img src={logo} width={"50"}
                     height={"35"} />
            </NavbarBrand>
            <Nav className="mr-auto" navbar>
                {!AuthenticationService.isUserLoggedIn() && <NavLink style={textStyle} href="/login">Login</NavLink>}
            </Nav>

            <Nav className="navbar-nav navbar-collapse justify-content-end" navbar>
                {AuthenticationService.isUserLoggedIn() &&<NavLink onClick={AuthenticationService.logout} style={textStyle} href="/" >Logout</NavLink>}
            </Nav>


        </Navbar>
    </div>
);

export default NavigationBar
