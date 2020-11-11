import React from 'react'
import logo from './commons/images/icon2.png';
import AuthenticationService from './login/service/authentication-service.js'

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


const textStyle = {
    color: 'white',
    textDecoration: 'none'
};

const NavigationBar = () => (
    <div>
        <Navbar color="dark" light expand="md">
            <NavbarBrand href="/">
                <img src={logo} width={"50"}
                     height={"50"} />
            </NavbarBrand>

            {AuthenticationService.isUserLoggedIn() && !(AuthenticationService.getUserRole() === "ROLE_caregiver") &&
            <UncontrolledDropdown nav inNavbar>
                <DropdownToggle style={textStyle} nav caret>
                    Menu
                </DropdownToggle>

                {AuthenticationService.getUserRole() === "ROLE_doctor" &&
                <DropdownMenu left>

                    <DropdownItem>
                        <NavLink href="/caregivers">Caregivers</NavLink>
                    </DropdownItem>


                    <DropdownItem>
                        <NavLink href="/caregivers">Patients</NavLink>
                    </DropdownItem>


                    <DropdownItem>
                        <NavLink href="/medications">Medications</NavLink>
                    </DropdownItem>


                    <DropdownItem>
                        <NavLink href="/medical_records">Medical Records</NavLink>
                    </DropdownItem>


                    <DropdownItem>
                        <NavLink href="/medical_records">Medication Plans</NavLink>
                    </DropdownItem>
                </DropdownMenu>
                }

                {AuthenticationService.getUserRole() === "ROLE_patient" &&
                <DropdownMenu left>
                    <DropdownItem>
                        <NavLink href="/medication_plan">Medication Plan</NavLink>
                    </DropdownItem>

                    <DropdownItem>
                        <NavLink href="/medical_record">Medical Record</NavLink>
                    </DropdownItem>
                </DropdownMenu>
                }

            </UncontrolledDropdown>
            }

            <Nav className="mr-auto" navbar>
                {AuthenticationService.isUserLoggedIn() && AuthenticationService.getUserRole() === "ROLE_doctor" &&<NavLink style={textStyle} href="/doctor" >Profile</NavLink>}

                {AuthenticationService.isUserLoggedIn() && AuthenticationService.getUserRole() === "ROLE_patient" &&<NavLink style={textStyle} href="/patient" >Profile</NavLink>}

                {AuthenticationService.isUserLoggedIn() && AuthenticationService.getUserRole() === "ROLE_caregiver" &&<NavLink style={textStyle} href="/caregiver" >Profile</NavLink>}
                {AuthenticationService.isUserLoggedIn() && AuthenticationService.getUserRole() === "ROLE_caregiver" &&<NavLink style={textStyle} href="/patients" >Patients</NavLink>}
            </Nav>


            <Nav className="navbar-nav navbar-collapse justify-content-end" navbar>
                {!AuthenticationService.isUserLoggedIn() &&<Button style={textStyle} href="/login">Login</Button>}
                {AuthenticationService.isUserLoggedIn() &&<Button onClick={AuthenticationService.logout} style={textStyle} href="/">Logout</Button>}
            </Nav>

        </Navbar>
    </div>
);

export default NavigationBar
