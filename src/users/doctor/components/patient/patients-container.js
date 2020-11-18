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

import * as API_COMMON from "../../../../commons/api/common-api";
import TableForm from "../../../../commons/tables/table-form";
import ModalForm from "../../../../commons/modal/modal-form";

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";


const endpoint = {
    patient: '/patient'
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
            patientsTableData: [],
            itemToUpdate: {
                address: [],
                userAuthentication: []
            },
            isLoaded: false,
            errorStatus: 0,
            error: null
        }

    }

    componentDidMount() {
        this.fetchPatients();
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
            isLoaded: false,
        });
        this.toggleForm(key);
        this.fetchPatients();
    }


    fetchPatients(){
        return API_COMMON.getItems(endpoint.patient, (result, status, err) =>{
            if (result !== null && status === 200){
                this.setState({
                    patientTableData: result,
                    isLoaded: true
                });
                console.log(this.state.patientTableData);
            } else {
                this.setState(({
                    errorStatus: status,
                    error: err
                }));
            }
        });
    }

    handleDelete(patientId){
        console.log(patientId);
    }


    render(){
        return(
          <div>
              <CardHeader>
                  <strong> Patients Management </strong>
              </CardHeader>
              <Card>
                  <Row>
                      <Col sm={{size: '8', offset: 1}}>
                          <Button color="primary" onClick={() => this.toggleForm('addPatient')}>Add patient </Button>
                      </Col>
                  </Row>

                  <br/>
                  <Row>
                      <Col sm={{size: '8', offset: 1}}>
                          {this.state.isLoaded && <TableForm tableData = {this.state.patientTableData}
                                                             tableColumns = {[
                                                                 {
                                                                     Header: 'Id',
                                                                     accessor: 'id',
                                                                     show: false
                                                                 },
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
                                                                         addr.push(data.address.city);
                                                                         addr.push(data.address.state);
                                                                         addr.push(data.address.street);
                                                                         addr.push(data.address.zipCode);
                                                                         return (<pre>{addr.join('\n')}</pre>);
                                                                     }
                                                                 },
                                                                 {
                                                                     Header: 'Authentication',
                                                                     id: 'userAuthentication',
                                                                     accessor: data => {
                                                                         let auth = [];
                                                                         auth.push(data.userAuthentication.username)
                                                                         auth.push(data.userAuthentication.email)
                                                                         return (<pre>{auth.join('\n')}</pre>);
                                                                     }
                                                                 },

                                                                 {
                                                                     Header: '',
                                                                     Cell: row => (
                                                                         <div>
                                                                             <Button color="primary"
                                                                                     onClick={() => this.toggleForm2('updatePatient', row.original)}
                                                                             >{<EditIcon/>}</Button>&nbsp;&nbsp;
                                                                             <Button onClick={() => this.handleDelete(row.original.id)}>{<DeleteIcon/>}</Button>
                                                                         </div>
                                                                     )
                                                                 }
                                                             ]}
                                                             tableFilter = {
                                                                 [
                                                                     {accessor: 'name'}
                                                                 ]
                                                             }
                          />}
                      </Col>
                      {this.state.errorStatus > 0 && <APIResponseErrorMessage
                          errorStatus={this.state.errorStatus}
                          error={this.state.error}
                      />   }
                  </Row>
              </Card>


              <Modal isOpen={this.state.addPatient} toggle={() => this.toggleForm('addPatient')}
                     className={this.props.className} sizze="lg">
                  <ModalHeader toggle={() => this.toggleForm('addPatient')}> Add patient: </ModalHeader>
                  <ModalBody>
                      <p> to do</p>
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
                                                     display: true,

                                                 }
                                             ]
                                         }
                                 ]}
                      />
                  </ModalBody>
              </Modal>


          </div>
        );
    }

}

export default PatientsContainer;