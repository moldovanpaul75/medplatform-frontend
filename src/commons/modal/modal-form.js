import React from 'react';
import validate from "../validators/validators";

import APIResponseErrorMessage from "../errorhandling/api-response-error-message";

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

            formIsValid: false,

            type: this.props.type,

            formControls: this.props.formControls,
        };

        this.handleChange = this.handleChange.bind(this);
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
        console.log(updatedControls[index]);
        this.setState({
            formControls: updatedControls,
            formIsValid: formIsValid
        });
    };


    createFormControls(){
        return this.state.formControls.map((item, index) =>
            <FormGroup key={index}
                       id={item.id}>
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




    render(){
        return(
            <div>
                {this.createFormControls()}

                {(this.state.type === '0') && <Button> Submit </Button>}
                {(this.state.type === '1') && <Button> Add </Button>}
            </div>
        );
    }

}

export default ModalForm;