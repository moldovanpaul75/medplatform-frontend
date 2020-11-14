import React from "react";
import APIResponseErrorMessage from "../../../commons/errorhandling/api-response-error-message";
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
import TableForm from "../../../commons/tables/table-form";

import * as API from "../api/medication-api";

const fakeData=[
    { id: 1, name: 'name1', type: 'test', sideEffectList: 'address1'}
    ]


class MedicationContainer extends React.Component{

    constructor(props){
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.reload = this.reload.bind(this);
        this.state = {
            selected: false,
            collapseForm: false,
            medicationTableData: [],
            sideEffectTableData: [],
            medicationsLoaded: false,
            sideEffectsLoaded: false,
            errorStatus: 0,
            error: null
        };
    }

    componentDidMount() {
        this.fetchMedications();
        this.fetchSideEffects();
    }

    toggleForm() {
        this.setState({selected: !this.state.selected});
    }

    reload() {
        this.setState({
            medicationsLoaded: false,
            sideEffectsLoaded: false
        });
        this.toggleForm();
        this.fetchMedications();
        this.fetchSideEffects();
    }


    fetchMedications(){
        return API.getMedications((result, status, err) =>{
            if (result !== null && status === 200){
                this.setState(({
                    medicationTableData: result,
                    medicationsLoaded: true
                })) ;
            } else {
                this.setState(({
                    errorStatus: status,
                    error: err
                }));
            }
        });
    }


    fetchSideEffects(){
        return API.getSideEffects((result, status, err) =>{
            if (result !== null && status === 200){
                this.setState(({
                    sideEffectTableData: result,
                    sideEffectsLoaded: true
                })) ;
            } else {
                this.setState(({
                    errorStatus: status,
                    error: err
                }));
            }
        });
    }

    handleDeleteMedication(medication){
        return API.deleteMedication(medication, (status, err) =>{
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



    handleDeleteSideEffect(sideEffect){
        return API.deleteSideEffect(sideEffect, (status, err) =>{
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
        return (
             <div>
                <CardHeader>
                    <strong> Medication Management </strong>
                </CardHeader>
                <Card>
                    <br/>
                    <Row>
                        <Col sm={{size:'8', offset: 1}}>
                            <Button color="primary">Add medication</Button>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col sm={{size: '8', offset: 1}}>
                            {this.state.medicationsLoaded && <TableForm tableData = {this.state.medicationTableData}
                                                                tableColumns = {
                                                                    [
                                                                        {
                                                                            Header: 'Id',
                                                                            accessor: 'id',
                                                                            show: false
                                                                        },
                                                                        {
                                                                            Header: 'Name',
                                                                            accessor: 'name'
                                                                        },
                                                                        {
                                                                            Header: 'Type',
                                                                            accessor: 'type',
                                                                        },
                                                                        {
                                                                            Header: 'Side Effects',
                                                                            id: 'sideEffectList',
                                                                            accessor: data => {
                                                                                let sideEffects = [];
                                                                                _.map(data.sideEffectList, sideEffect => {
                                                                                    sideEffects.push(sideEffect.name);
                                                                                });
                                                                                return (<pre>{sideEffects.join('\n')}</pre>);
                                                                            },
                                                                        },
                                                                        {
                                                                            Header: '',
                                                                            Cell: row => (
                                                                                <div>
                                                                                    <Button >{<EditIcon/>}</Button>&nbsp;
                                                                                    <Button onClick={() => this.handleDeleteMedication(row.original.id)}>{<DeleteIcon/>}</Button>
                                                                                </div>
                                                                            )
                                                                        }
                                                                    ]
                                                                }

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

                <CardHeader>
                    <strong> Side Effects Management </strong>
                </CardHeader>
                <Card>
                    <br/>
                    <Row>
                        <Col sm={{size:'8', offset: 1}}>
                            <Button color="primary">Add side effect</Button>
                        </Col>

                    </Row>
                    <br/>
                    <Row>
                        <Col sm={{size: '8', offset: 1}}>
                            {this.state.sideEffectsLoaded && <TableForm tableData = {this.state.sideEffectTableData}
                                        tableColumns = {
                                            [
                                                {
                                                    Header: 'Id',
                                                    accessor: 'id',
                                                    show: false
                                                },
                                                {
                                                    Header: 'Name',
                                                    accessor: 'name'
                                                },
                                                {
                                                    Header: 'Details',
                                                    accessor: 'details',
                                                },
                                                {
                                                    Header: '',
                                                    Cell: row => (
                                                        <div>
                                                            <Button >{<EditIcon/>}</Button>&nbsp;
                                                            <Button onClick={() => this.handleDeleteSideEffect(row.original.id)}>{<DeleteIcon/>}</Button>
                                                        </div>
                                                    )
                                                }
                                            ]
                                        }
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
            </div>
        )
    }
}

export default MedicationContainer;