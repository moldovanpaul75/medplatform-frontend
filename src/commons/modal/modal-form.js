import React from 'react';
import validate from "../validators/validators";

import APIResponseErrorMessage from "../errorhandling/api-response-error-message";
import * as API from "../../commons/api/common-api";


import {Col, Row} from "reactstrap";
import {
    FormGroup,
    Input,
    Label,
    Button,
} from 'reactstrap';

class ModalForm extends React.Component {

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.reloadHandler = this.props.reloadHandler;

        this.state = {

            errorStatus: 0,
            error: null,

            formIsValid: true,

            endpoint: this.props.endpoint,
            type: this.props.type,

            formControls: this.props.formControls,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }


    toggleForm() {
        this.setState({collapseForm: !this.state.collapseForm});
    }


    handleChange = (event, index) => {
        const value = event.target.value;

        const updatedControls = this.state.formControls;
        const updatedFormElement = updatedControls[index];

        updatedFormElement.value = value;
        updatedFormElement.touched = true;
        updatedFormElement.valid = validate(value, updatedFormElement.validationRules);
        updatedControls[index] = updatedFormElement;

        let formIsValid = true;

        updatedControls.map(item =>{
            formIsValid = item.valid && formIsValid;
        });
        this.setState({
            formControls: updatedControls,
            formIsValid: formIsValid
        });
    };


    createFormControls(){
        return this.state.formControls.map((item, index) =>
            item.display &&
            <FormGroup key={index}
                       id={item.id}
                       >
                <Label for={item.fieldName}> {item.id}: </Label>
                <Input name={item.id} id={item.fieldName} placeholder={item.placeholder}
                       onChange={(event) => this.handleChange(event, index)}
                       defaultValue={item.value}
                       touched={item.touched? 1 : 0}
                       valid={item.valid}
                       required
                />
                {item.touched && !item.valid &&
                    <div className={"error-message"}> * {item.message}</div>}
            </FormGroup>
        );
    }

    registerItem(item, method){
        return API.saveItem(this.state.endpoint, method, item, (result, status, error)=> {
            if(result !== null && (status === 200 || status === 201)){
                this.reloadHandler();
            } else {
                this.setState(({
                    errorStatus: status,
                    error: error
                }))
            }
        });
    }



    handleAdd() {
        const item = this.state.formControls.reduce(
            (obj, item) => Object.assign(obj, {[item.id]: item.value}), {}
        );

        this.registerItem(item, 'POST');
    }

    handleUpdate(){
        const item = this.state.formControls.reduce(
            (obj, item) => Object.assign(obj, {[item.id]: item.value}), {}
        );

        console.log(item);
        this.registerItem(item, 'PUT');
    }


    render(){
        return(
            <div>
                {this.createFormControls()}

                <Row>
                    <Col sm={{size: '4', offset: 8}}>
                {(this.state.type === '0') && <Button onClick={this.handleAdd}> Add </Button>}
                {(this.state.type === '1') && <Button onClick={this.handleUpdate}> Update </Button>}
                    </Col>
                </Row>

                {
                    this.state.errorStatus > 0 &&
                    <APIResponseErrorMessage errorStatus={this.state.errorStatus} error={this.state.error}/>
                }
            </div>
        );
    }

}

export default ModalForm;