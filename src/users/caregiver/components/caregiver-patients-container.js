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

import * as API_COMMON from "../../../commons/api/common-api";
import TableForm from "../../../commons/tables/table-form";
import AutheticationService from "../../../login/service/authentication-service";

const endpoint = {
    getPatients: '/caregiver/patients='
}

class CaregiverPatientsContainer extends React.Component{

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.reload = this.reload.bind(this);

        this.state = {
            patientsTableData: [],
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

    reload(key){
        this.setState({
            isLoaded: false,
        });
        this.toggleForm(key);
        this.fetchPatients();
    }


    fetchPatients(){
        return API_COMMON.getItems(endpoint.getPatients+AutheticationService.getUserId(), (result, status, err)=>{
            if (result !== null && status === 200){
                this.setState({
                    patientsTableData: result,
                    isLoaded: true
                });
                console.log(this.state.patientsTableData);
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
                    <strong> Patients: </strong>
                </CardHeader>
                <Card>

                    <br/>
                    <Row>
                        <Col sm={{size: '8', offset: 1}}>
                            {this.state.isLoaded && <TableForm tableData = {this.state.patientsTableData}
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
                                                               ]}
                                                               tableFilter = {
                                                                   [
                                                                       {accessor: 'firstName'}
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
            </div>
        );
    }

}

export default CaregiverPatientsContainer;