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

import TableForm from "../../../../commons/tables/table-form";
import ModalForm from "../../../../commons/modal/modal-form";

import * as API_COMMON from "../../../../commons/api/common-api";


const endpoint = {
    medications: '/medication',
    sideEffects: '/side_effect'
};


class MedicationContainer extends React.Component{

    constructor(props){
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.toggleForm2 = this.toggleForm2.bind(this);
        this.reload = this.reload.bind(this);
        this.state = {
            addSideEffect: false,
            updateSideEffect: false,
            addMedication: false,
            updateMedication: false,
            medicationTableData: [],
            sideEffectTableData: [],
            itemToUpdate: [],
            medicationsLoaded: false,
            sideEffectsLoaded: false,
            errorStatus: 0,
            error: null
        };
    }

    componentDidMount() {
        this.fetchItems(endpoint.medications, ['medicationTableData', 'medicationsLoaded'])
        this.fetchItems(endpoint.sideEffects, ['sideEffectTableData', 'sideEffectsLoaded'])
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


    reload(key) {
        this.setState({
            medicationsLoaded: false,
            sideEffectsLoaded: false
        });
        this.toggleForm(key);
        this.fetchItems(endpoint.medications, ['medicationTableData', 'medicationsLoaded'])
        this.fetchItems(endpoint.sideEffects, ['sideEffectTableData', 'sideEffectsLoaded'])
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


    handleDelete(endpoint, itemId){
        return API_COMMON.deleteItem(endpoint, itemId, (status, err) =>{
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
                            <Button color="primary" onClick={() => this.toggleForm('addMedication')}>Add medication</Button>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col sm={{size: '8', offset: 1}}>
                            {this.state.medicationsLoaded && <TableForm tableData = {this.state.medicationTableData}
                                                                tableColumns = {
                                                                    [
                                                                        {
                                                                            Header: 'Name',
                                                                            accessor: 'name'
                                                                        },
                                                                        {
                                                                            Header: 'Type',
                                                                            accessor: 'type',
                                                                        },
                                                                        {
                                                                            Header: 'Side effects',
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
                                                                            Header: 'Actions',
                                                                            Cell: row => (
                                                                                <div>
                                                                                    <Button color="primary"
                                                                                            onClick={() => this.toggleForm2('updateMedication', row.original)}
                                                                                    >{<EditIcon/>}</Button>&nbsp;&nbsp;
                                                                                    <Button color="danger" onClick={() => this.handleDelete(endpoint.medications, row.original.id)}>{<DeleteIcon/>}</Button>
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
                            <Button color="primary" onClick={() => this.toggleForm('addSideEffect')}>Add side effect</Button>
                        </Col>

                    </Row>
                    <br/>
                    <Row>
                        <Col sm={{size: '8', offset: 1}}>
                            {this.state.sideEffectsLoaded && <TableForm tableData = {this.state.sideEffectTableData}
                                        tableColumns = {
                                            [
                                                {
                                                    Header: 'Name',
                                                    accessor: 'name'
                                                },
                                                {
                                                    Header: 'Details',
                                                    accessor: 'details',
                                                },
                                                {
                                                    Header: 'Actions',
                                                    Cell: row => (
                                                        <div>
                                                            <Button color="primary"
                                                                    onClick={() => this.toggleForm2('updateSideEffect', row.original)}
                                                            >{<EditIcon/>}</Button>&nbsp;&nbsp;
                                                            <Button color="danger" onClick={() => this.handleDelete(endpoint.sideEffects, row.original.id)}>{<DeleteIcon/>}</Button>
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

                 <Modal isOpen={this.state.addSideEffect} toggle={() => this.toggleForm('addSideEffect')}
                        className={this.props.className} sizze="lg">
                     <ModalHeader toggle={() => this.toggleForm('addSideEffect')}> Add side effect: </ModalHeader>
                     <ModalBody>
                        <ModalForm type = {'0'}
                                   endpoint = {endpoint.sideEffects}
                                   reloadHandler = {() => this.reload('addSideEffect')}
                                   formControls = {[
                                           {
                                               id: 'form',
                                               values: [
                                                   {
                                                       id: 'name',
                                                       fieldName: 'nameField',
                                                       value: '',
                                                       placeholder: 'Enter side effect name...',
                                                       valid: false,
                                                       touched: false,
                                                       display: true,
                                                       message: 'Invalid name',
                                                       validationRules: {
                                                           minLength: 3,
                                                           isRequired: true
                                                       }
                                                   },
                                                   {
                                                       id: 'details',
                                                       fieldName: 'detailsField',
                                                       value: '',
                                                       placeholder: 'Details about the side effect...',
                                                       valid: false,
                                                       touched: false,
                                                       display: true,
                                                       message: 'Too short',
                                                       validationRules: {
                                                           minLength: 3,
                                                           isRequired: true
                                                       }
                                                   },]
                                           },
                                       ]}
                        />
                     </ModalBody>
                 </Modal>


                 <Modal isOpen={this.state.addMedication} toggle={() => this.toggleForm('addMedication')}
                        className={this.props.className} sizze="lg">
                     <ModalHeader toggle={() => this.toggleForm('addMedication')}> Add medication: </ModalHeader>
                     <ModalBody>
                         <ModalForm type={'0'}
                                    endpoint = {endpoint.medications}
                                    reloadHandler = {() => this.reload('addMedication')}
                                    formControls = {[
                                        {
                                            id: 'form',
                                            values: [{
                                                id: 'name',
                                                fieldName: 'nameField',
                                                value: '',
                                                placeholder: 'Enter medication name...',
                                                valid: false,
                                                touched: false,
                                                display: true,
                                                message: 'Invalid name',
                                                validationRules: {
                                                    minLength: 3,
                                                    isRequired: true
                                                }
                                            },
                                                {
                                                    id: 'type',
                                                    fieldName: 'typeField',
                                                    value: '',
                                                    placeholder: 'Enter medication type...',
                                                    valid: false,
                                                    touched: false,
                                                    display: true,
                                                    message: 'Too short',
                                                    validationRules: {
                                                        minLength: 3,
                                                        isRequired: true
                                                    }
                                                },]
                                        },
                                    ]}
                                    multiselectDropDown = {{
                                            name: 'sideEffectList',
                                            displayValue: 'name',
                                            values: [],
                                            options: this.state.sideEffectTableData
                                         }
                                    }
                         />
                     </ModalBody>
                 </Modal>


                 <Modal isOpen={this.state.updateSideEffect} toggle={() => this.toggleForm('updateSideEffect')}
                        className={this.props.className} sizze="lg">
                     <ModalHeader toggle={() => this.toggleForm('updateSideEffect')}> Update side effect: </ModalHeader>
                     <ModalBody>
                         <ModalForm type = {'1'}
                                    endpoint = {endpoint.sideEffects}
                                    reloadHandler = {() => this.reload('updateSideEffect')}
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
                                                    id: 'name',
                                                    fieldName: 'nameField',
                                                    value: this.state.itemToUpdate.name,
                                                    placeholder: 'Rename side effect...',
                                                    valid: true,
                                                    touched: false,
                                                    display: true,
                                                    message: 'Invalid name',
                                                    validationRules: {
                                                        minLength: 3,
                                                        isRequired: true
                                                    }
                                                },
                                                {
                                                    id: 'details',
                                                    fieldName: 'detailsField',
                                                    value: this.state.itemToUpdate.details,
                                                    placeholder: 'Details about the side effect...',
                                                    valid: true,
                                                    touched: false,
                                                    display: true,
                                                    message: 'Too short',
                                                    validationRules: {
                                                        minLength: 3,
                                                        isRequired: true
                                                    }
                                                },]
                                        },
                                    ]}
                         />
                     </ModalBody>
                 </Modal>


                 <Modal isOpen={this.state.updateMedication} toggle={() => this.toggleForm('updateMedication')}
                        className={this.props.className} sizze="lg">
                     <ModalHeader toggle={() => this.toggleForm('updateMedication')}> Update medication: </ModalHeader>
                     <ModalBody>
                         <ModalForm type={'1'}
                                    endpoint = {endpoint.medications}
                                    reloadHandler = {() => this.reload('updateMedication')}
                                    formControls = {[
                                        {
                                            id: 'form',
                                            values: [{
                                                id: 'id',
                                                fieldName: 'idField',
                                                value: this.state.itemToUpdate.id,
                                                display: false,
                                            },
                                                {
                                                    id: 'name',
                                                    fieldName: 'nameField',
                                                    value: this.state.itemToUpdate.name,
                                                    placeholder: 'Enter medication name...',
                                                    valid: true,
                                                    touched: false,
                                                    display: true,
                                                    message: 'Invalid name',
                                                    validationRules: {
                                                        minLength: 3,
                                                        isRequired: true
                                                    }
                                                },
                                                {
                                                    id: 'type',
                                                    fieldName: 'typeField',
                                                    value: this.state.itemToUpdate.type,
                                                    placeholder: 'Enter medication type...',
                                                    valid: true,
                                                    touched: false,
                                                    display: true,
                                                    message: 'Too short',
                                                    validationRules: {
                                                        minLength: 3,
                                                        isRequired: true
                                                    }
                                                },]
                                        },
                                    ]}
                                    multiselectDropDown = {
                                        {
                                            name: 'sideEffectList',
                                            displayValue: 'name',
                                            values: this.state.itemToUpdate.sideEffectList,
                                            options: this.state.sideEffectTableData
                                        }
                                    }
                         />
                     </ModalBody>
                 </Modal>

            </div>
        )
    }
}

export default MedicationContainer;