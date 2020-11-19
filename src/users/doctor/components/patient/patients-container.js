import React from "react";
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
import moment from "moment";

import * as API_COMMON from "../../../../commons/api/common-api";
import * as API_DOCTOR from "../../api/doctor-api";
import TableForm from "../../../../commons/tables/table-form";
import ModalForm from "../../../../commons/modal/modal-form";


import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import LibraryBooksSharpIcon from '@material-ui/icons/LibraryBooksSharp';
import LocalHospitalSharpIcon from '@material-ui/icons/LocalHospitalSharp';

const endpoint = {
    doctor: '/doctor',
    patient: '/patient',
    medication: '/medication',
    medicationPlan: '/medication_plan',
    medicalRecord: '/medical_record'
}


class PatientsContainer extends React.Component{

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.toggleForm2 = this.toggleForm2.bind(this);
        this.reload = this.reload.bind(this);

        this.state = {
            addPatient: false,
            updatePatient: false,
            addMedicalRecord: false,
            addMedicationPlan: false,
            patientRole: [],
            doctorId: null,
            patientsTableData: [],
            medicationTableData: [],
            itemToUpdate: {
                address: [],
                userAuthentication: [],
                medicalRecord: {
                    id: '',
                    releaseDate: '',
                    details: '',
                }
            },
            patientsLoaded: false,
            medicationsLoaded: false,
            errorStatus: 0,
            error: null
        }
    }

    componentDidMount() {
        this.fetchItems(endpoint.patient, ['patientsTableData', 'patientsLoaded']);
        this.fetchItems(endpoint.medication, ['medicationTableData', 'medicationsLoaded']);
        this.fetchPatientRole();
        this.fetchLoggedDoctor();
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
            patientsLoaded: false,
            medicationLoaded: false,
        });
        this.toggleForm(key);
        this.fetchPatientRole();
        this.fetchLoggedDoctor();
        this.fetchItems(endpoint.patient, ['patientsTableData', 'patientsLoaded']);
        this.fetchItems(endpoint.medication, ['medicationTableData', 'medicationsLoaded']);
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

    fetchPatientRole(){
        return API_DOCTOR.getRoleByName('ROLE_patient', (result, status, err) =>{
           if(result !== null && status === 200){
               this.setState(({
                   patientRole: result,
               }))
           } else {
               this.setState(({
                   errorStatus: status,
                   error: err
               }));
           }
        });
    }

    fetchLoggedDoctor() {
        return API_COMMON.getProfile(endpoint.doctor, (result, status, err) =>{
            if(result !== null && status === 200){
                this.setState(({
                    doctorId: result.id
                }));
            } else {
                this.setState(({
                    errorStatus: status,
                    error: err,
                }));
            }
        });
    }



    handleDelete(patientId){
        return API_COMMON.deleteItem(endpoint.patient, patientId,(status, err) =>{
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
                  <strong> Patients Management </strong>
              </CardHeader>
              <Card>
                  <br/>
                  <Row>
                      <Col sm={{size: '8', offset: 1}}>
                          <Button color="primary" onClick={() => this.toggleForm('addPatient')}>Add patient </Button>
                      </Col>
                  </Row>

                  <br/>
                  <Row>
                      <Col sm={{size: '8', offset: 1}}>
                          {this.state.patientsLoaded && <TableForm tableData = {this.state.patientsTableData}
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
                                                                     Header: 'Update MedicalRecord',
                                                                     Cell: row => (
                                                                         <div>
                                                                             <Button color="info"
                                                                                     onClick={() => this.toggleForm2('addMedicalRecord', row.original)}
                                                                             >{<LibraryBooksSharpIcon/>}<br/></Button>
                                                                         </div>
                                                                     )
                                                                 },
                                                                 {
                                                                     Header: 'Add MedicationPlan',
                                                                     Cell: row => (
                                                                         <div>
                                                                             <Button color="info"
                                                                                     onClick={() => this.toggleForm2('addMedicationPlan', row.original)}
                                                                             >{<LocalHospitalSharpIcon/>}<br/></Button>
                                                                         </div>
                                                                     )
                                                                 },
                                                                 {
                                                                     Header: 'Actions',
                                                                     Cell: row => (
                                                                         <div>
                                                                             <Button color="primary"
                                                                                     onClick={() => this.toggleForm2('updatePatient', row.original)}
                                                                             >{<EditIcon/>}</Button>&nbsp;&nbsp;
                                                                             <Button color="danger"
                                                                                     onClick={() => this.handleDelete(row.original.id)}
                                                                             >{<DeleteIcon/>}</Button>&nbsp;&nbsp;
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
                      </Col>
                  </Row>
              </Card>


              <Modal isOpen={this.state.addPatient} toggle={() => this.toggleForm('addPatient')}
                     className={this.props.className} sizze="lg">
                  <ModalHeader toggle={() => this.toggleForm('addPatient')}> Add patient: </ModalHeader>
                  <ModalBody>
                      <ModalForm type = {'0'}
                                 endpoint = {endpoint.patient}
                                 reloadHandler = {() => this.reload('addPatient')}
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
                                                     value: this.state.patientRole,
                                                     valid: true,
                                                     display: false
                                                 }

                                             ]
                                         },
                                     ]}
                                 />
                  </ModalBody>
              </Modal>


              <Modal isOpen={this.state.updatePatient} toggle={() => this.toggleForm('updatePatient')}
                     className={this.props.className} sizze="lg">
                  <ModalHeader toggle={() => this.toggleForm('updatePatient')}> Update patient: </ModalHeader>
                  <ModalBody>
                      <ModalForm type = {'1'}
                                 endpoint = {endpoint.patient}
                                 reloadHandler = {() => this.reload('updatePatient')}
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
                                         ]},
                                 ]}
                      />
                  </ModalBody>
              </Modal>

              <Modal isOpen={this.state.addMedicalRecord} toggle={() => this.toggleForm('addMedicalRecord')}
                     className={this.props.className} sizze="lg">
                  <ModalHeader toggle={() => this.toggleForm('addMedicalRecord')}> Add medical record: </ModalHeader>
                  <ModalBody>
                      <ModalForm type={'0'}
                                 endpoint = {endpoint.medicalRecord}
                                 reloadHandler = {() => this.reload('addMedicalRecord')}
                                 formControls = {[
                                             {
                                                 id: 'form',
                                                 values: [
                                                     {
                                                         id: 'releaseDate',
                                                         fieldName: 'releaseDateField',
                                                         value: moment().format("YYYY-MM-DD"),
                                                         placeholder: 'Release date...',
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
                                                         id: 'details',
                                                         fieldName: 'detailsField',
                                                         value: '',
                                                         placeholder: 'Details...',
                                                         valid: false,
                                                         touched: false,
                                                         display: true,
                                                         message: 'Medical record details',
                                                         validationRules: {
                                                             minLength: 21,
                                                             isRequired: true
                                                         }
                                                     },
                                         ]},
                                         {
                                             id: 'patient',
                                             values: [
                                                 {
                                                     id: 'id',
                                                     fieldName: 'idField',
                                                     value: this.state.itemToUpdate.id,
                                                     display: false,
                                                 },
                                         ]},
                                 ]}
                      />
                  </ModalBody>
              </Modal>

              <Modal isOpen={this.state.addMedicationPlan} toggle={() => this.toggleForm('addMedicationPlan')}
                     className={this.props.className} sizze="lg">
                  <ModalHeader toggle={() => this.toggleForm('addMedicationPlan')}> Add medication plan: </ModalHeader>
                  <ModalBody>
                      <ModalForm type={'0'}
                                 endpoint = {endpoint.medicationPlan}
                                 reloadHandler = {() => this.reload('addMedicationPlan')}
                                 formControls = {[
                                     {
                                         id: 'form',
                                         values: [
                                             {
                                                 id: 'dosage',
                                                 fieldName: 'dosageField',
                                                 value: '',
                                                 placeholder: 'Medication dosage...',
                                                 valid: false,
                                                 touched: false,
                                                 display: true,
                                                 message: 'mg',
                                                 validationRules: {
                                                     minLength: 1,
                                                     isRequired: true
                                                 }
                                             },
                                             {
                                                 id: 'start',
                                                 fieldName: 'startField',
                                                 value: '',
                                                 placeholder: 'When the medication plan starts...',
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
                                                 id: 'end',
                                                 fieldName: 'endField',
                                                 value: '',
                                                 placeholder: 'When the medication plan ends...',
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
                                                 id: 'morning',
                                                 fieldName: 'morningField',
                                                 value: '',
                                                 valid: false,
                                                 touched: false,
                                                 display: true,
                                                 message: 'true/false',
                                                 validationRules: {
                                                     booleanValidator: true
                                                 }
                                             },
                                             {
                                                 id: 'afternoon',
                                                 fieldName: 'afternoonField',
                                                 value: '',
                                                 valid: false,
                                                 touched: false,
                                                 display: true,
                                                 message: 'true/false',
                                                 validationRules: {
                                                     booleanValidator: true
                                                 }
                                             },
                                             {
                                                 id: 'evening',
                                                 fieldName: 'eveningField',
                                                 value: '',
                                                 valid: false,
                                                 touched: false,
                                                 display: true,
                                                 message: 'true/false',
                                                 validationRules: {
                                                     booleanValidator: true
                                                 }
                                             },
                                         ]
                                     },
                                     {
                                         id: 'patient',
                                         values: [
                                             {
                                                 id: 'id',
                                                 fieldName: 'idField',
                                                 value: this.state.itemToUpdate.id,
                                                 display: false,
                                             },
                                         ]
                                     },
                                     {
                                         id: 'doctor',
                                         values: [
                                             {
                                                 id: 'id',
                                                 fieldName: 'idField',
                                                 value: this.state.doctorId,
                                                 display: false,
                                             },
                                         ]
                                     },
                                 ]}
                                 multiselectDropDown = {{
                                     name: 'medication',
                                     displayValue: 'name',
                                     values: [],
                                     options: this.state.medicationTableData,
                                     selectionLimit: 1
                                    }
                                 }
                      />
                  </ModalBody>
              </Modal>

          </div>
        );
    }

}

export default PatientsContainer;