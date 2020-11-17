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
import { Multiselect } from 'multiselect-react-dropdown';


class ModalForm extends React.Component {

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.reloadHandler = this.props.reloadHandler;

        this.state = {

            errorStatus: 0,
            error: null,

            formIsValid: false,

            endpoint: this.props.endpoint,
            type: this.props.type,

            formControls: this.props.formControls,
            dropDownOptions: this.props.dropDownOptions,
            dropDownSelectedValues: this.props.dropDownSelectedValues,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onRemove = this.onRemove.bind(this);
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
        if(this.state.formControls !== undefined) {
            return this.state.formControls.map((item, index) =>
                item.display &&
                <FormGroup key={index}
                           id={item.id}
                >
                    <Label for={item.fieldName}> {item.id}: </Label>
                    <Input name={item.id} id={item.fieldName} placeholder={item.placeholder}
                           onChange={(event) => this.handleChange(event, index)}
                           defaultValue={item.value}
                           touched={item.touched ? 1 : 0}
                           valid={item.valid}
                           required
                    />
                    {item.touched && !item.valid &&
                    <div className={"error-message"}> * {item.message}</div>}
                </FormGroup>
            );
        }
    }

    createDropDown(){
        if(this.state.dropDownOptions !== undefined) {
            return <Multiselect
                options={this.state.dropDownOptions}
                selectedValues={this.state.dropDownSelectedValues.values}
                onSelect={this.onSelect}
                onRemove={this.onRemove}
                displayValue="name"
            />
        }
    }


    onSelect(selectedList, selectedItem) {
        const items = this.state.dropDownSelectedValues
        items.values.push(selectedItem)

        this.setState({
            dropDownSelectedValues: items
        })
    }

    onRemove(selectedList, removedItem) {
        const items = this.state.dropDownSelectedValues
        const index = items.values.indexOf(removedItem);

        if(index !== -1){
            items.values.splice(index, 1);
        }

        this.setState({
            dropDownSelectedValues: items
        })
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
        let item = this.state.formControls.reduce(
            (obj, item) => Object.assign(obj, {[item.id]: item.value}), {}
        );

        if(this.state.dropDownSelectedValues !== undefined) {
            item[this.state.dropDownSelectedValues.name] = this.state.dropDownSelectedValues.values;
        }

        console.log(item)
        this.registerItem(item, 'POST');
    }

    handleUpdate(){
        const item = this.state.formControls.reduce(
            (obj, item) => Object.assign(obj, {[item.id]: item.value}), {}
        );

        if(this.state.dropDownSelectedValues !== undefined) {
            item[this.state.dropDownSelectedValues.name] = this.state.dropDownSelectedValues.values;
        }

        console.log(item)
        this.registerItem(item, 'PUT');
    }


    render(){
        return(
            <div>
                {this.createFormControls()}
                {this.createDropDown()}

                <Row>
                    <Col sm={{size: '4', offset: 8}}>
                {(this.state.type === '0') && <Button disabled={!this.state.formIsValid} onClick={this.handleAdd}> Add </Button>}
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