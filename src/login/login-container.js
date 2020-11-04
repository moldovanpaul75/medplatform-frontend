import React from 'react';
import axios from 'axios';
import {Col, FormGroup, Input, Label, Row} from 'reactstrap';
import Button from "react-bootstrap/Button";
import APIResponseErrorMessage from "../commons/errorhandling/api-response-error-message";



class LoginContainer extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            errorStatus: 0,
            error: null,

            formIsValid: false,

            formControls:{
                username: {
                    value: '',
                    placeholder: 'Enter your username.',
                    valid: false,
                    touched: false,
                    validationRules:{
                        minLength: 4,
                        isRequired: true
                    }
                },
                password: {
                    value: '',
                    placeHolder: 'Enter your password',
                    valid: false,
                    touched: false,
                    validationRules:{
                        minLength: 5,
                        isRequired: true
                    }
                }
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }


    handleChange = event => {



    }



    handleFormSubmit() {



    }


    render() {
     return(
          <div>
              <div
                  style={{
                      position: 'absolute', left: '50%', top: '50%',
                      transform: 'translate(-50%, -50%)'
                  }}>
                  <FormGroup id='username'>
                      <Label for='usernameField'> Username: </Label>
                      <Input name='username' id='usernameField' placeHolder={this.state.formControls.username.placeholder}
                             onChange={this.handleChange}
                             defaultValue={this.state.formControls.username.value}
                             touched={this.state.formControls.username.touched? 1:0}
                             valid={this.state.formControls.username.valid}
                             required
                      />
                      {this.state.formControls.username.touched && !this.state.formControls.username.valid &&
                      <div className={"error-message row"}> * Username must have at least 4 characters </div>}
                  </FormGroup>

                  <FormGroup id='password'>
                      <Label for='passwordField'> Password: </Label>
                      <Input name='password' id='passwordField' type="password" placeHolder={this.state.formControls.password.placeHolder}
                             onChange={this.handleChange}
                             defaultValue={this.state.formControls.password.value}
                             touched={this.state.formControls.password.touched? 1:0}
                             valid={this.state.formControls.password.valid}
                             required
                      />
                      {this.state.formControls.password.touched && !this.state.formControls.password.valid &&
                      <div className={"error-message row"}> * Password must have at least 4 characters </div>}
                  </FormGroup>

                  <Row>
                      <Col sm={{size: '4', offset: 8}}>
                          <Button type={"submit"} disabled={!this.state.formIsValid} onClick={this.handleFormSubmit}> Submit </Button>
                      </Col>
                  </Row>

                  {
                      this.state.errorStatus > 0 &&
                      <APIResponseErrorMessage errorStatus={this.state.errorStatus} error={this.state.error}/>
                  }
              </div>
          </div>
        );
    }
}

export default LoginContainer;