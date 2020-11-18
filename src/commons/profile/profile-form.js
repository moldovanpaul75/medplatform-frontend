import React from 'react'
import {Form, FormGroup, Input, Label, Col} from "reactstrap";
import * as API_PROFILE from "../api/common-api";


class ProfileForm extends React.Component {

    constructor(props) {
        super(props);
        this.reload = this.reload.bind(this);

        this.state = {
            isLoaded: false,
            errorStatus: 0,
            error: null,
            failedToGetProfile: false,

            username: '',
            email: '',
            firstName: '',
            lastName: '',
            dateOfBirth: '',
            gender: '',
            address:{
                street: '',
                city: '',
                state: '',
                zipCode: ''
            }
        }
    }

    componentDidMount() {
        this.fetchProfile();
    }

    fetchProfile() {
        return API_PROFILE.getProfile(this.props.path, (result, status, err) =>{
            if(result !== null && status === 200){

                this.setState({
                    isLoaded: true,
                    failedToGetProfile: false,

                    username: result.userAuthentication.username,
                    email: result.userAuthentication.email,
                    firstName: result.firstName,
                    lastName: result.lastName,
                    dateOfBirth: result.dateOfBirth,
                    gender: result.gender,
                    address:{
                        street: result.address.street,
                        city: result.address.city,
                        state: result.address.state,
                        zipCode: result.address.zipCode
                    }
                });
            } else {
                this.setState(({
                    errorStatus: status,
                    error: err,
                    failedToGetProfile: true
                }));
            }
        });
    }


    reload() {
        this.setState({
            isLoaded: false,
            failedToGetProfile: false
        });
        this.fetchProfile();
    }


    render() {
        return(
            <div>
                <div
                    style={{
                        position: 'absolute', left: '50%', top: '50%',
                        transform: 'translate(-50%, -50%)'
                    }}>
                    {this.state.failedToGetProfile && <div className="alert alert-warning"> Failed to get profile </div>}
                    {!this.state.failedToGetProfile &&
                        <div className="container">
                            <h1>Profile</h1>
                            <FormGroup id='username'>
                                <Label for='username'> Username: </Label>
                                <Input id='username' disabled='disabled' defaultValue={this.state.username}/>
                            </FormGroup>

                            <FormGroup id='email'>
                                <Label for='email'> Email: </Label>
                                <Input id='email' disabled='disabled' defaultValue={this.state.email}/>
                            </FormGroup>

                            <FormGroup id='firstName'>
                                <Label for='firstName'> First name: </Label>
                                <Input id='firstName' disabled='disabled' defaultValue={this.state.firstName}/>
                            </FormGroup>


                            <FormGroup id='lastName'>
                                <Label for='lastName'> Last name: </Label>
                                <Input id='lastName' disabled='disabled' defaultValue={this.state.lastName}/>
                            </FormGroup>


                            <FormGroup id='dateOfBirth'>
                                <Label for='dateOfBirth'> Date of birth: </Label>
                                <Input id='dateOfBirth' disabled='disabled' defaultValue={this.state.dateOfBirth}/>
                            </FormGroup>

                            <FormGroup id='gender'>
                                <Label for='gender'> Gender: </Label>
                                <Input id='gender' disabled='disabled' defaultValue={this.state.dateOfBirth}/>
                            </FormGroup>

                            <Form id='address'>
                                <Label for='address'> Address: </Label>

                                <Col sm={10}>
                                    <Label for='street'> Street: </Label>
                                    <Input id='street' disabled='disabled' defaultValue={this.state.address.street}/>

                                    <Label for='city'> City: </Label>
                                    <Input id='city' disabled='disabled' defaultValue={this.state.address.city}/>

                                    <Label for='state'> State: </Label>
                                    <Input id='state' disabled='disabled' defaultValue={this.state.address.state}/>

                                    <Label for='zipCode'> Zip code: </Label>
                                    <Input id='zipCode' disabled='disabled' defaultValue={this.state.address.zipCode}/>
                                </Col>
                            </Form>
                        </div>
                    }
                </div>
            </div>
        )
    };
}

export default ProfileForm
