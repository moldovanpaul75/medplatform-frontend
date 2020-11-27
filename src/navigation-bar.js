import React from 'react'
import logo from './commons/images/icon2.png';
import AuthenticationService from './login/service/authentication-service.js'
import * as wsMiddleware from "./wsMiddleware/wsMiddleware";


import {
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Nav,
    Navbar,
    NavbarBrand,
    NavLink,
    UncontrolledDropdown,
    Button
} from 'reactstrap';
import Notifications from "react-notifications-menu";

const textStyle = {
    color: 'white',
    textDecoration: 'none'
};


const NavigationBar = (props) => (
    <div>
        <Navbar color="dark" light expand="md">
            <NavbarBrand href="/">
                <img alt={"logo"}
                    src={logo} width={"50"}
                     height={"50"} />
            </NavbarBrand>
            {AuthenticationService.isUserLoggedIn() && (AuthenticationService.getUserRole() === "ROLE_caregiver") && wsMiddleware.connect()}

            {AuthenticationService.isUserLoggedIn() && AuthenticationService.getUserRole()==="ROLE_caregiver" && <Notifications data={wsMiddleware.getMessages()}/>}

            {AuthenticationService.isUserLoggedIn() && (AuthenticationService.getUserRole() === "ROLE_doctor") &&
            <UncontrolledDropdown nav inNavbar>
                <DropdownToggle style={textStyle} nav caret>
                    Menu
                </DropdownToggle>


                <DropdownMenu>

                    <DropdownItem>
                        <NavLink href="/patients">Patients</NavLink>
                    </DropdownItem>


                    <DropdownItem>
                        <NavLink href="/caregivers">Caregivers</NavLink>
                    </DropdownItem>


                    <DropdownItem>
                        <NavLink href="/medications">Medications</NavLink>
                    </DropdownItem>


                    <DropdownItem>
                        <NavLink href="/medication_plans">Medication Plans</NavLink>
                    </DropdownItem>
                </DropdownMenu>

            </UncontrolledDropdown>
            }

            <Nav className="mr-auto" navbar>
                {AuthenticationService.isUserLoggedIn() && AuthenticationService.getUserRole() === "ROLE_doctor" &&<NavLink style={textStyle} href="/doctor" >Profile</NavLink>}

                {AuthenticationService.isUserLoggedIn() && AuthenticationService.getUserRole() === "ROLE_patient" &&<NavLink style={textStyle} href="/patient" >Profile</NavLink>}
                {AuthenticationService.isUserLoggedIn() && AuthenticationService.getUserRole() === "ROLE_patient" &&<NavLink style={textStyle} href="/medical_info">Medical Info</NavLink>}


                {AuthenticationService.isUserLoggedIn() && AuthenticationService.getUserRole() === "ROLE_caregiver" &&<NavLink style={textStyle} href="/caregiver" >Profile</NavLink>}
                {AuthenticationService.isUserLoggedIn() && AuthenticationService.getUserRole() === "ROLE_caregiver" &&<NavLink style={textStyle} href="/caregiver_patients" >Patients</NavLink>}
            </Nav>


            <Nav className="navbar-nav navbar-collapse justify-content-end" navbar>
                {!AuthenticationService.isUserLoggedIn() &&<Button color="primary" style={textStyle} href="/login">Login</Button>}
                {AuthenticationService.isUserLoggedIn() &&<Button onClick={AuthenticationService.logout} style={textStyle} href="/">Logout</Button>}
            </Nav>

        </Navbar>
    </div>
);

export default NavigationBar
