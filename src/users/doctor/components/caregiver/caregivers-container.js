import React from "react";
import APIResponseErrorMessage from "../../../../commons/errorhandling/api-response-error-message";
import {
    Button,
    Card,
    CardHeader,
    Col,
    Modal,
    ModalBody,
    ModalHeader,
    Row
} from "reactstrap";
import _ from "lodash";

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import PersonAddSharpIcon from '@material-ui/icons/PersonAddSharp';

import * as API_COMMON from "../../../../commons/api/common-api";
import * as API_DOCTOR from "../../api/doctor-api";

import TableForm from "../../../../commons/tables/table-form";
import ModalForm from "../../../../commons/modal/modal-form";



const endpoint = {
    caregiver: '/caregiver',
    patient: '/patient',
    updatePatients: '/caregiver/patients',
}

class CaregiversContainer extends React.Component{

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.toggleForm2 = this.toggleForm2.bind(this);
        this.reload = this.reload.bind(this);

        this.state = {
            addCaregiver: false,
            updateCaregiver: false,
            updatePatients: false,
            caregiverRole: [],
            caregiversTableData: [],
            patientsTableData: [],
            itemToUpdate: {
                address: [],
                userAuthentication: [],
                patients: []
            },
            caregiversLoaded: false,
            patientsLoaded: false,
            errorStatus: 0,
            error: null
        }
    }

    componentDidMount() {
        this.fetchItems(endpoint.caregiver, ['caregiversTableData', 'caregiversLoaded'])
        this.fetchItems(endpoint.patient, ['patientsTableData', 'patientsLoaded'])
        this.fetchCaregiverRole();
    }

    toggleForm(key){
        let state = !this.state[key];
        this.setState({
            [key] : state,
        })
    }

    toggleForm2(key, item){
        let state = !this.state[key];
        this.setState({
            [key] : state,
            itemToUpdate: item,
        })
    }

    reload(key){
        this.setState({
           caregiversLoaded: false,
           patientsLoaded: false,
        });
        this.toggleForm(key);
        this.fetchItems(endpoint.caregiver, ['caregiversTableData', 'caregiversLoaded'])
        this.fetchItems(endpoint.patient, ['patientsTableData', 'patientsLoaded'])
    }

    fetchItems(endpoint, states){
        return API_COMMON.getItems(endpoint, (result, status, err) =>{
            if (result !== null && status === 200){
                this.setState({
                    [states[0]]: result,
                    [states[1]]: true
                });
            } else {
                this.setState(({
                    errorStatus: status,
                    error: err
                }));
            }
        });
    }

    fetchCaregiverRole(){
        return API_DOCTOR.getRoleByName('ROLE_caregiver', (result, status, err) =>{
            if(result !== null && status === 200){
                this.setState(({
                    caregiverRole: result,
                }))
            } else {
                this.setState(({
                    errorStatus: status,
                    error: err
                }));
            }
        });
    }

    handleDelete(caregiverId){
        return API_COMMON.deleteItem(endpoint.caregiver, caregiverId,(status, err) =>{
            if (status === 200 || status === 201){
                window.location.reload(false);
            } else {
                this.setState(({
                    errorStatus: status,
                    error: err
                }));
            }
        });
    }



    render(){
        return(
          <div>
              <CardHeader>
                  <strong> Caregivers Management </strong>
              </CardHeader>
              <Card>
                  <br/>
                  <Row>
                      <Col sm={{size: '8', offset: 1}}>
                          <Button color="primary" onClick={() => this.toggleForm('addCaregiver')}>Add caregiver </Button>
                      </Col>
                  </Row>



                  <br/>
                  <Row>
                      <Col sm={{size: '8', offset: 1}}>
                          {this.state.caregiversLoaded && <TableForm tableData = {this.state.caregiversTableData}
                                                             tableColumns = {[
                                                                 {
                                                                     Header: 'First Name',
                                                                     accessor: 'firstName',
                                                                 },
                                                                 {
                                                                     Header: 'Last Name',
                                                                     accessor: 'lastName',
                                                                 },
                                                                 {
                                                                     Header: 'Date of birth',
                                                                     accessor: 'dateOfBirth',
                                                                 },
                                                                 {
                                                                     Header: 'Gender',
                                                                     accessor: 'gender',
                                                                 },
                                                                 {
                                                                     Header: 'Address',
                                                                     id: 'address',
                                                                     accessor: data => {
                                                                         let addr = [];
                                                                         addr.push('Street: '+data.address.street);
                                                                         addr.push('City: '+data.address.city);
                                                                         addr.push('State: '+data.address.state);
                                                                         addr.push('Zip code: '+data.address.zipCode);
                                                                         return (<pre>{addr.join('\n')}</pre>);
                                                                     }
                                                                 },
                                                                 {
                                                                     Header: 'Authentication',
                                                                     id: 'userAuthentication',
                                                                     accessor: data => {
                                                                         let auth = [];
                                                                         auth.push('Username: '+data.userAuthentication.username);
                                                                         auth.push('Email: '+data.userAuthentication.email);
                                                                         return (<pre>{auth.join('\n')}</pre>);
                                                                     }
                                                                 },
                                                                 {
                                                                     Header: 'Patients',
                                                                     id: 'patients',
                                                                     accessor: data => {
                                                                         let patients = [];
                                                                         _.map(data.patients, (patient, index) =>{
                                                                             let name = index+1 + '. ' + patient.firstName + ' ' + patient.lastName;
                                                                            patients.push(name);
                                                                         });
                                                                         return (<pre>{patients.join('\n')}</pre>);
                                                                     }
                                                                 },
                                                                 {
                                                                     Header: 'Actions',
                                                                     Cell: row => (
                                                                         <div>
                                                                             <Button color="primary"
                                                                                     onClick={() => this.toggleForm2('updateCaregiver', row.original)}
                                                                             >{<EditIcon/>}</Button>&nbsp;&nbsp;
                                                                             <Button color="danger" onClick={() => this.handleDelete(row.original.id)}>{<DeleteIcon/>}</Button>&nbsp;&nbsp;
                                                                             <Button color="info"
                                                                                     onClick={() => this.toggleForm2('updatePatients', row.original)}
                                                                             >{<PersonAddSharpIcon/>}<br/>Patients</Button>
                                                                         </div>
                                                                     )
                                                                 }
                                                             ]}
                                                             tableFilter = {
                                                                 [
                                                                     {accessor: 'firstName'}
                                                                 ]
                                                             }
                          />}
                          {this.state.errorStatus > 0 && <APIResponseErrorMessage
                              errorStatus={this.state.errorStatus}
                              error={this.state.error}
                          />   }
                      </Col>
                  </Row>
              </Card>



              <Modal isOpen={this.state.addCaregiver} toggle={() => this.toggleForm('addCaregiver')}
                     className={this.props.className} sizze="lg">
                  <ModalHeader toggle={() => this.toggleForm('addCaregiver')}> Add caregiver: </ModalHeader>
                  <ModalBody>
                      <ModalForm type = {'0'}
                                 endpoint = {endpoint.caregiver}
                                 reloadHandler = {() => this.reload('addCaregiver')}
                                 formControls =
                                     {[
                                         {
                                             id: 'form',
                                             values: [
                                                 {
                                                     id: 'firstName',
                                                     fieldName: 'firstNameField',
                                                     value: '',
                                                     placeholder: 'First name...',
                                                     valid: false,
                                                     touched: false,
                                                     display: true,
                                                     message: 'First name too short!',
                                                     validationRules: {
                                                         minLength: 3,
                                                         isRequired: true
                                                     }
                                                 },
                                                 {
                                                     id: 'lastName',
                                                     fieldName: 'lastNameField',
                                                     value: '',
                                                     placeholder: 'Last name...',
                                                     valid: false,
                                                     touched: false,
                                                     display: true,
                                                     message: 'Last name too short!',
                                                     validationRules: {
                                                         minLength: 3,
                                                         isRequired: true
                                                     }
                                                 },
                                                 {
                                                     id: 'dateOfBirth',
                                                     fieldName: 'dateOfBirthField',
                                                     value: '',
                                                     placeholder: 'Date of birth...',
                                                     valid: false,
                                                     touched: false,
                                                     display: true,
                                                     message: 'yyyy-mm-dd',
                                                     validationRules: {
                                                         minLength: 10,
                                                         isRequired: true
                                                     }
                                                 },
                                                 {
                                                     id: 'gender',
                                                     fieldName: 'genderField',
                                                     value: '',
                                                     placeholder: 'Gender...',
                                                     valid: false,
                                                     touched: false,
                                                     display: true,
                                                     message: 'M/F',
                                                     validationRules: {
                                                         minLength: 1,
                                                         isRequired: true
                                                     }
                                                 },
                                             ]
                                         },
                                         {
                                             id: 'address',
                                             values: [
                                                 {
                                                     id: 'street',
                                                     fieldName: 'streetField',
                                                     value: '',
                                                     placeholder: 'street name...',
                                                     valid: false,
                                                     touched: false,
                                                     display: true,
                                                     message: 'Street name too short!',
                                                     validationRules: {
                                                         minLength: 3,
                                                         isRequired: true
                                                     }
                                                 },
                                                 {
                                                     id: 'city',
                                                     fieldName: 'cityField',
                                                     value: '',
                                                     placeholder: 'city name...',
                                                     valid: false,
                                                     touched: false,
                                                     display: true,
                                                     message: 'City name too short!',
                                                     validationRules: {
                                                         minLength: 3,
                                                         isRequired: true
                                                     }
                                                 },
                                                 {
                                                     id: 'state',
                                                     fieldName: 'stateField',
                                                     value: '',
                                                     placeholder: 'state name...',
                                                     valid: false,
                                                     touched: false,
                                                     display: true,
                                                     message: 'state name too short!',
                                                     validationRules: {
                                                         minLength: 3,
                                                         isRequired: true
                                                     }
                                                 },
                                                 {
                                                     id: 'zipCode',
                                                     fieldName: 'zipCodeField',
                                                     value: '',
                                                     placeholder: 'zipCode name...',
                                                     valid: false,
                                                     touched: false,
                                                     display: true,
                                                     message: 'zipCode name too short!',
                                                     validationRules: {
                                                         minLength: 3,
                                                         isRequired: true
                                                     }
                                                 },
                                             ]
                                         },
                                         {
                                             id: 'userAuthentication',
                                             values: [
                                                 {
                                                     id: 'username',
                                                     fieldName: 'usernameField',
                                                     value: '',
                                                     placeholder: 'username...',
                                                     valid: false,
                                                     touched: false,
                                                     display: true,
                                                     message: 'Username too short!',
                                                     validationRules: {
                                                         minLength: 4,
                                                         isRequired: true
                                                     }
                                                 },
                                                 {
                                                     id: 'password',
                                                     fieldName: 'passwordField',
                                                     value: '',
                                                     placeholder: 'password...',
                                                     valid: false,
                                                     touched: false,
                                                     display: true,
                                                     message: 'Password too short!',
                                                     validationRules: {
                                                         minLength: 5,
                                                         isRequired: true
                                                     }
                                                 },
                                                 {
                                                     id: 'email',
                                                     fieldName: 'emailField',
                                                     value: '',
                                                     placeholder: 'email...',
                                                     valid: false,
                                                     touched: false,
                                                     display: true,
                                                     message: 'Email invalid!',
                                                     validationRules: {
                                                         emailValidator: true
                                                     }
                                                 },
                                                 {
                                                     id: 'userRole',
                                                     fieldName: 'userRoleField',
                                                     value: this.state.caregiverRole,
                                                     valid: true,
                                                     display: false
                                                 }

                                             ]
                                         }
                                     ]}
                      />
                  </ModalBody>
              </Modal>


              <Modal isOpen={this.state.updateCaregiver} toggle={() => this.toggleForm('updateCaregiver')}
                     className={this.props.className} sizze="lg">
                  <ModalHeader toggle={() => this.toggleForm('updateCaregiver')}> Update caregiver: </ModalHeader>
                  <ModalBody>
                      <ModalForm type = {'1'}
                                 endpoint = {endpoint.caregiver}
                                 reloadHandler = {() => this.reload('updateCaregiver')}
                                 formControls =
                                     {[
                                         {
                                             id: 'form',
                                             values:[
                                                 {
                                                     id: 'id',
                                                     fieldName: 'idField',
                                                     value: this.state.itemToUpdate.id,
                                                     display: false,
                                                 },
                                                 {
                                                     id: 'userAuthentication',
                                                     fieldName: 'userAuthenticationField',
                                                     value: this.state.itemToUpdate.userAuthentication,
                                                     display: false,
                                                 },
                                                 {
                                                     id: 'patients',
                                                     fieldName: 'patients',
                                                     value: this.state.itemToUpdate.patients,
                                                     display: false,
                                                 },
                                                 {
                                                     id: 'firstName',
                                                     fieldName: 'firstNameField',
                                                     value: this.state.itemToUpdate.firstName,
                                                     placeholder: 'First name...',
                                                     valid: true,
                                                     touched: false,
                                                     display: true,
                                                     message: 'First name too short!',
                                                     validationRules: {
                                                         minLength: 3,
                                                         isRequired: true
                                                     }
                                                 },
                                                 {
                                                     id: 'lastName',
                                                     fieldName: 'lastNameField',
                                                     value: this.state.itemToUpdate.lastName,
                                                     placeholder: 'Last name...',
                                                     valid: true,
                                                     touched: false,
                                                     display: true,
                                                     message: 'Last name too short!',
                                                     validationRules: {
                                                         minLength: 3,
                                                         isRequired: true
                                                     }
                                                 },
                                                 {
                                                     id: 'dateOfBirth',
                                                     fieldName: 'dateOfBirthField',
                                                     value: this.state.itemToUpdate.dateOfBirth,
                                                     placeholder: 'Date of birth...',
                                                     valid: true,
                                                     touched: false,
                                                     display: true,
                                                     message: 'yyyy-mm-dd',
                                                     validationRules: {
                                                         minLength: 10,
                                                         isRequired: true
                                                     }
                                                 },
                                                 {
                                                     id: 'gender',
                                                     fieldName: 'genderField',
                                                     value: this.state.itemToUpdate.gender,
                                                     placeholder: 'Gender...',
                                                     valid: true,
                                                     touched: false,
                                                     display: true,
                                                     message: 'M/F',
                                                     validationRules: {
                                                         minLength: 1,
                                                         isRequired: true
                                                     }
                                                 },
                                             ]},
                                         {
                                             id: 'address',
                                             values: [
                                                 {
                                                     id: 'id',
                                                     fieldName: 'idField',
                                                     value: this.state.itemToUpdate.address.id,
                                                     display: false,
                                                 },
                                                 {
                                                     id: 'street',
                                                     fieldName: 'streetField',
                                                     value: this.state.itemToUpdate.address.street,
                                                     placeholder: 'street name...',
                                                     valid: true,
                                                     touched: false,
                                                     display: true,
                                                     message: 'Street name too short!',
                                                     validationRules: {
                                                         minLength: 3,
                                                         isRequired: true
                                                     }
                                                 },
                                                 {
                                                     id: 'city',
                                                     fieldName: 'cityField',
                                                     value: this.state.itemToUpdate.address.city,
                                                     placeholder: 'city name...',
                                                     valid: true,
                                                     touched: false,
                                                     display: true,
                                                     message: 'City name too short!',
                                                     validationRules: {
                                                         minLength: 3,
                                                         isRequired: true
                                                     }
                                                 },
                                                 {
                                                     id: 'state',
                                                     fieldName: 'stateField',
                                                     value: this.state.itemToUpdate.address.state,
                                                     placeholder: 'state name...',
                                                     valid: true,
                                                     touched: false,
                                                     display: true,
                                                     message: 'state name too short!',
                                                     validationRules: {
                                                         minLength: 3,
                                                         isRequired: true
                                                     }
                                                 },
                                                 {
                                                     id: 'zipCode',
                                                     fieldName: 'zipCodeField',
                                                     value: this.state.itemToUpdate.address.zipCode,
                                                     placeholder: 'zipCode name...',
                                                     valid: true,
                                                     touched: false,
                                                     display: true,
                                                     message: 'zipCode name too short!',
                                                     validationRules: {
                                                         minLength: 3,
                                                         isRequired: true
                                                     }
                                                 },

                                             ]
                                         }
                                     ]}
                      />
                  </ModalBody>
              </Modal>

              <Modal isOpen={this.state.updatePatients} toggle={() => this.toggleForm('updatePatients')}
                     className={this.props.className} sizze="lg">
                  <ModalHeader toggle={() => this.toggleForm('updatePatients')}> Add patients: </ModalHeader>
                  <ModalBody>
                      <ModalForm type={'1'}
                                 endpoint = {endpoint.updatePatients}
                                 reloadHandler = {() => this.reload('updatePatients')}
                                 formControls = {[
                                     {
                                         id: 'form',
                                         values: [
                                             {
                                                 id: 'id',
                                                 fieldName: 'idField',
                                                 value: this.state.itemToUpdate.id,
                                                 display: false,
                                             },
                                         ]
                                     }
                                 ]}
                                 multiselectDropDown = {{
                                     name: 'patients',
                                     displayValue: 'firstName',
                                     values: this.state.itemToUpdate.patients,
                                     options: this.state.patientsTableData
                                    }
                                 }
                      />
                  </ModalBody>
              </Modal>

          </div>
        );
    }

}


export default CaregiversContainer;