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


import TableForm from "../../../../commons/tables/table-form";
import ModalForm from "../../../../commons/modal/modal-form";
import * as API_COMMON from "../../../../commons/api/common-api";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const endpoint = {
    medicationPlan: '/medication_plan',
    medication: '/medication',
    patient: '/patient',
}

class MedicationPlansContainer extends React.Component{

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.toggleForm2 = this.toggleForm2.bind(this);
        this.reload = this.reload.bind(this);

        this.state = {
            updateMedicationPlan: false,
            medicationTableData: [],
            medicationPlansTableData: [],
            itemToUpdate: {
                patient: [],
                doctor: [],
                medication: [],
            },
            medicationPlansLoaded: false,
            medicationsLoaded: false,
            errorStatus: 0,
            error: null
        }
    }

    componentDidMount() {
        this.fetchItems(endpoint.medicationPlan, ['medicationPlansTableData', 'medicationPlansLoaded']);
        this.fetchItems(endpoint.medication, ['medicationTableData', 'medicationsLoaded']);
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
            medicationPlansLoaded: false,
            patientsLoaded: false,
            medicationsLoaded: false,
        });
        this.toggleForm(key);
        this.fetchItems(endpoint.medicationPlan, ['medicationPlansTableData', 'medicationPlansLoaded']);
        this.fetchItems(endpoint.medication, ['medicationTableData', 'medicationsLoaded']);
    }

    fetchItems(endpoint, states){
        return API_COMMON.getItems(endpoint, (result, status, err) =>{
            if (result !== null && status === 200){
                this.setState({
                    [states[0]]: result,
                    [states[1]]: true
                });
                //console.log(result);
            } else {
                this.setState(({
                    errorStatus: status,
                    error: err
                }));
            }
        });
    }

    handleDelete(planId){
        console.log(planId);
        return API_COMMON.deleteItem(endpoint.medicationPlan, planId,(status, err) =>{
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
                  <strong> Medication Plans Management </strong>
              </CardHeader>
              <Card>

                  <br/>
                  <Row>
                      <Col sm={{size: '8', offset: 1}}>
                          {this.state.medicationPlansLoaded && <TableForm tableData = {this.state.medicationPlansTableData}
                                                             tableColumns = {[
                                                                 {
                                                                     Header: 'Patient name',
                                                                     id: 'patient',
                                                                     accessor: data =>{
                                                                         let patient = data.patient.firstName + ' ' + data.patient.lastName;
                                                                        return patient;
                                                                     }
                                                                 },
                                                                 {
                                                                     Header: 'Doctor name',
                                                                     id: 'doctor',
                                                                     accessor: data =>{
                                                                         let doctor = data.doctor.firstName + ' ' + data.doctor.lastName;
                                                                         return doctor;
                                                                     }
                                                                 },
                                                                 {
                                                                     Header: 'Medication',
                                                                     id: 'medication',
                                                                     accessor: data =>{
                                                                         let medication = [];
                                                                         medication.push('Name: '+data.medication.name);
                                                                         medication.push('Type: '+data.medication.type);
                                                                         return(<pre>{medication.join('\n')}</pre>);
                                                                     }
                                                                 },
                                                                 {
                                                                     Header: 'Dosage',
                                                                     accessor: 'dosage'
                                                                 },
                                                                 {
                                                                     Header: 'Medication plan interval',
                                                                     id: 'period',
                                                                     accessor: data => {
                                                                         let period = [];
                                                                         period.push('From: '+data.start);
                                                                         period.push('To: '+data.end);
                                                                         return(<pre>{period.join('\n')}</pre>);
                                                                     }
                                                                 },
                                                                 {
                                                                     Header: 'Intake intervals',
                                                                     id: 'interval',
                                                                     accessor: data => {
                                                                         let interval = [];
                                                                            if(data.morning) interval.push('Morning: yes');
                                                                                else interval.push('Morning: no');
                                                                            if(data.afternoon) interval.push('Afternoon: yes');
                                                                                else interval.push('Afternoon: no');
                                                                            if(data.evening) interval.push('Evening: yes');
                                                                                else interval.push('Evening: no');
                                                                         return(<pre>{interval.join('\n')}</pre>);
                                                                     }
                                                                 },
                                                                 {
                                                                     Header: 'Actions',
                                                                     Cell: row => (
                                                                         <div>
                                                                             <Button color="primary"
                                                                                     onClick={() => this.toggleForm2('updateMedicationPlan', row.original)}
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
                                                                     {accessor: 'patient'}
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


              <Modal isOpen={this.state.updateMedicationPlan} toggle={() => this.toggleForm('updateMedicationPlan')}
                     className={this.props.className} sizze="lg">
                  <ModalHeader toggle={() => this.toggleForm('updateMedicationPlan')}> Update medication plan: </ModalHeader>
              <ModalBody>
                  <ModalForm type={'1'}
                             endpoint = {endpoint.medicationPlan}
                             reloadHandler = {() => this.reload('updateMedicationPlan')}
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
                                         {
                                             id: 'dosage',
                                             fieldName: 'dosageField',
                                             value: this.state.itemToUpdate.dosage,
                                             placeholder: 'Medication dosage...',
                                             valid: true,
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
                                             value: this.state.itemToUpdate.start,
                                             placeholder: 'When the medication plan starts...',
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
                                             id: 'end',
                                             fieldName: 'endField',
                                             value: this.state.itemToUpdate.end,
                                             placeholder: 'When the medication plan ends...',
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
                                             id: 'morning',
                                             fieldName: 'morningField',
                                             value: this.state.itemToUpdate.morning,
                                             valid: true,
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
                                             value: this.state.itemToUpdate.afternoon,
                                             valid: true,
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
                                             value: this.state.itemToUpdate.evening,
                                             valid: true,
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
                                             value: this.state.itemToUpdate.patient.id,
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
                                             value: this.state.itemToUpdate.doctor.id,
                                             display: false,
                                         },
                                     ]
                                 },
                             ]}
                             multiselectDropDown = {{
                                 name: 'medication',
                                 displayValue: 'name',
                                 values: [this.state.itemToUpdate.medication],
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

};

export default MedicationPlansContainer;