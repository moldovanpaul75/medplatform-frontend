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

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import TableForm from "../../../commons/tables/table-form";


const fakeData=[
    { id: 1, name: 'name1', type: 'test', sideEffectList: 'address1'}
    ]


class MedicationContainer extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            selected: false,
            collapseForm: false,
            medicationTableData: [],
            sideEffectTableData: [],
            isLoaded: false,
            errorStatus: 0,
            error: null
        };
    }


    fetchMedications(){


    }


    fetchSideEffects(){



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
                            {<TableForm tableData = {fakeData}
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
                                                                            accessor: 'sideEffectList',
                                                                        },
                                                                        {
                                                                            Header: 'Buttons',
                                                                            Cell: row => (
                                                                                <div>
                                                                                    <Button >{<EditIcon/>}</Button>&nbsp;
                                                                                    <Button >{<DeleteIcon/>}</Button>
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
                            {<TableForm tableData = {this.state.medicationTableData}
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
                                                    Header: 'Buttons',
                                                    Cell: row => (
                                                        <div>
                                                            <Button >{<EditIcon/>}</Button>&nbsp;
                                                            <Button >{<DeleteIcon/>}</Button>
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