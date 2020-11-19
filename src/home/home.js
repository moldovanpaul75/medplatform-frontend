import React from 'react';

import BackgroundImg from '../commons/images/future-medicine.jpg';

import {Button, Container, Jumbotron, NavLink} from 'reactstrap';
import AuthenticationService from "../login/service/authentication-service";

const backgroundStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: "100%",
    height: "1920px",
    backgroundImage: `url(${BackgroundImg})`
};
const textStyle = {color: 'white', };

class Home extends React.Component {


    render() {

        return (

            <div>
                <Jumbotron fluid style={backgroundStyle}>
                    <Container fluid>
                        {AuthenticationService.isUserLoggedIn() &&  <h1 className="display-3" style={textStyle}>Welcome!</h1>}


                        <h3 className="display-4" style={textStyle}>Integrated Medical Monitoring Platform for Home-care assistance</h3>
                        <p className="lead" style={textStyle}> <b>Enabling real time monitoring of patients, remote-assisted care services and
                            smart intake mechanism for prescribed medication.</b> </p>
                        <hr className="my-2"/>
                        <p  style={textStyle}> <b>This assignment represents the first module of the distributed software system "Integrated
                            Medical Monitoring Platform for Home-care assistance that represents the final project
                            for the Distributed Systems course. </b> </p>
                        <p className="lead">
                            <Button color="primary" onClick={() => window.open('http://coned.utcluj.ro/~salomie/DS_Lic/')}>Learn
                                More</Button>
                        </p>
                    </Container>
                </Jumbotron>

            </div>
        )
    };
}

export default Home
