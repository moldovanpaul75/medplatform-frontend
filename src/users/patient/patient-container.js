// import React from 'react'
// import {Form, FormGroup, Input, Label, Col} from "reactstrap";
// import * as API_PROFILE from "./api/patient-api";
//
//
//
// class PatientContainer extends React.Component {
//
//     constructor(props) {
//         super(props);
//         this.reload = this.reload.bind(this);
//
//         this.state = {
//             isLoaded: false,
//             errorStatus: 0,
//
//             firstName: '',
//             lastName: '',
//             dateOfBirth: '',
//             gender: '',
//             address:{
//                 street: '',
//                 city: '',
//                 state: '',
//                 zipCode: ''
//             }
//         }
//     }
//
//     componentDidMount() {
//         this.fetchProfile();
//     }
//
//     fetchProfile() {
//         return API_PROFILE.getProfile((result, status, err) =>{
//
//            if(result !== null && (status === 200 || status ===201)){
//                console.log("firstname:" + result.firstName);
//
//                this.setState({
//                    firstName: result.firstName,
//                    lastName: result.lastName,
//                    dateOfBirth: result.dateOfBirth,
//                    gender: result.gender,
//                    address:{
//                        street: result.address.street,
//                        city: result.address.city,
//                        state: result.address.state,
//                        zipCode: result.address.zipCode
//                    },
//
//                    isLoaded: true,
//                });
//            } else {
//                this.setState(({
//                    errorStatus: status,
//                    error: err
//                }));
//            }
//         });
//     }
//
//
//     reload() {
//         this.setState({
//             isLoaded: false
//         });
//         this.fetchProfile();
//     }
//
//
//     render() {
//         return(
//                 <div>
//                     <div
//                         style={{
//                             position: 'absolute', left: '50%', top: '50%',
//                             transform: 'translate(-50%, -50%)'
//                         }}>
//                         <div className="container">
//                         <h1>Profile</h1>
//
//                             <FormGroup id='firstName'>
//                                 <Label for='firstName'> First name: </Label>
//                                 <Input id='firstName' disabled='disabled' defaultValue={this.state.firstName}/>
//                             </FormGroup>
//
//                             <FormGroup id='lastName'>
//                                 <Label for='lastName'> Last name: </Label>
//                                 <Input id='lastName' disabled='disabled' defaultValue={this.state.lastName}/>
//                             </FormGroup>
//
//                             <FormGroup id='dateOfBirth'>
//                                 <Label for='dateOfBirth'> Date of birth: </Label>
//                                 <Input id='dateOfBirth' disabled='disabled' defaultValue={this.state.dateOfBirth}/>
//                             </FormGroup>
//
//                             <FormGroup id='gender'>
//                                 <Label for='gender'> Gender: </Label>
//                                 <Input id='gender' disabled='disabled' defaultValue={this.state.dateOfBirth}/>
//                             </FormGroup>
//
//                             <Form id='address'>
//                                 <Label for='address'> Address: </Label>
//
//                                 <Col sm={10}>
//                                     <Label for='street'> Street: </Label>
//                                     <Input id='street' disabled='disabled' defaultValue={this.state.address.street}/>
//
//                                     <Label for='city'> City: </Label>
//                                     <Input id='city' disabled='disabled' defaultValue={this.state.address.city}/>
//
//                                     <Label for='state'> State: </Label>
//                                     <Input id='state' disabled='disabled' defaultValue={this.state.address.state}/>
//
//                                     <Label for='zipCode'> Zip code: </Label>
//                                     <Input id='zipCode' disabled='disabled' defaultValue={this.state.address.zipCode}/>
//                                 </Col>
//                             </Form>
//                         </div>
//                     </div>
//                 </div>
//         )
//     };
// }
//
// export default PatientContainer
