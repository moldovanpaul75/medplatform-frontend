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

import * as API_COMMON from "../../../../commons/api/common-api";
import TableForm from "../../../../commons/tables/table-form";



const endpoint = {
    caregiver: '/caregiver'
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
            caregiversTableData: [],
            itemToUpdate: [],
            isLoaded: false,
            errorStatus: 0,
            error: null
        }
    }

    componentDidMount() {
        this.fetchCaregivers();
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
        this.fetchCaregivers();
    }

    fetchCaregivers(){
        return API_COMMON.getItems(endpoint.caregiver, (result, status, err) =>{
            if (result !== null && status === 200){
                this.setState({
                    caregiversTableData: result,
                    isLoaded: true
                });
            } else {
                this.setState(({
                    errorStatus: status,
                    error: err
                }));
            }
        });
    }

    handleDelete(caregiverId){
        console.log(caregiverId);
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
                          {this.state.isLoaded && <TableForm tableData = {this.state.caregiversTableData}
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
                                                                     Header: 'Patients',
                                                                     id: 'patients',
                                                                     accessor: data => {
                                                                         let patients = [];
                                                                         _.map(data.patients, patient =>{
                                                                             let name = patient.firstName + ' ' + patient.lastName;
                                                                            patients.push(name);
                                                                         });
                                                                         return (<pre>{patients.join('\n')}</pre>);
                                                                     }
                                                                 },

                                                                 {
                                                                     Header: '',
                                                                     Cell: row => (
                                                                         <div>
                                                                             <Button color="primary"
                                                                                     onClick={() => this.toggleForm2('updateCaregiver', row.original)}
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
                      <p> to do</p>
                  </ModalBody>
              </Modal>


              <Modal isOpen={this.state.updateCaregiver} toggle={() => this.toggleForm('updateCaregiver')}
                     className={this.props.className} sizze="lg">
                  <ModalHeader toggle={() => this.toggleForm('updateCaregiver')}> Update caregiver: </ModalHeader>
                  <ModalBody>
                      <p> to do</p>
                  </ModalBody>
              </Modal>


          </div>
        );
    }

}


export default CaregiversContainer;