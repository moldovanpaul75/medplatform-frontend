import React from "react";
import APIResponseErrorMessage from "../../../commons/errorhandling/api-response-error-message";
import {
    Button,
    Card,
    CardHeader,
    Col,
    Row
} from "reactstrap";


import * as API_COMMON from "../../../commons/api/common-api";
import AuthenticationService from "../../../login/service/authentication-service"

import TableForm from "../../../commons/tables/table-form";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";


const endpoint = {
    patient: '/patient',
    medicationPlan: '/medication_plan/patient=',
    medicalRecord: '/medical_record/patient='
}

class PatientMedicalInfo extends React.Component{

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.reload = this.reload.bind(this);

        this.state = {
            medicationPlansTableData: [],
            medicalRecordsTableData: [],
            medicationPlansLoaded: false,
            medicalRecordsLoaded: false,
            errorStatus: 0,
            error: null
        }
    }


    componentDidMount() {
        this.fetchItems(endpoint.medicationPlan, ['medicationPlansTableData', 'medicationPlansLoaded']);
        this.fetchItems(endpoint.medicalRecord, ['medicalRecordsTableData', 'medicalRecordsLoaded']);
    }



    toggleForm(key){
        let state = !this.state[key];
        this.setState({
            [key] : state,
        })
    }


    reload(key){
        this.setState({
            isLoaded: false,
        });
        this.toggleForm(key);
        this.fetchPatients();
    }

    fetchItems(endpoint, states){
        return API_COMMON.getItems(endpoint+AuthenticationService.getUserId(), (result, status, err) =>{
            if (result !== null && status === 200){
                this.setState({
                    [states[0]]: result,
                    [states[1]]: true
                });
                console.log(result);
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
                    <strong> Medication plans: </strong>
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
                                                                                }
                                                                            ]}
                                                                            tableFilter = {
                                                                                [
                                                                                    {accessor: 'name'}
                                                                                ]
                                                                            }
                            />}
                        </Col>
                    </Row>
                </Card>

                <CardHeader>
                    <strong> Medical records: </strong>
                </CardHeader>
                <Card>
                    <br/>
                    <Row>
                        <Col sm={{size: '8', offset: 1}}>
                            {this.state.medicalRecordsLoaded && <TableForm tableData = {this.state.medicalRecordsTableData}
                                                                            tableColumns = {[
                                                                                {
                                                                                    Header: 'Release date',
                                                                                    accessor: 'releaseDate'
                                                                                },
                                                                                {
                                                                                    Header: 'Details',
                                                                                    accessor: 'details'
                                                                                }

                                                                            ]}
                                                                            tableFilter = {
                                                                                [
                                                                                    {accessor: 'details'}
                                                                                ]
                                                                            }
                            />}
                        </Col>
                    </Row>
                </Card>



            </div>
        );
    }

}

export default PatientMedicalInfo;