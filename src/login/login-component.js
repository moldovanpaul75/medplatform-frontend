import React from 'react';
import {Col, FormGroup, Input, Label, Row} from 'reactstrap';
import Button from "react-bootstrap/Button";
import APIResponseErrorMessage from "../commons/errorhandling/api-response-error-message";
import validate from "../commons/validators/validators";
import * as API_LOGIN from "./api/login-api";
import AuthenticationService from "./service/authentication-service";

class LoginComponent extends React.Component{

    constructor(props) {
        super(props);


        this.state = {
            errorStatus: 0,
            error: null,
            hasLoginFailed: false,
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
                    placeholder: 'Enter your password',
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
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange = event => {
        const name = event.target.name;
        const value = event.target.value;

        const updatedControls = this.state.formControls;

        const updatedFormElement = updatedControls[name];

        updatedFormElement.value = value;
        updatedFormElement.touched = true;
        updatedFormElement.valid = validate(value, updatedFormElement.validationRules);
        updatedControls[name] = updatedFormElement;

        let formIsValid = true;
        for (let updatedFormElementName in updatedControls) {
            formIsValid = updatedControls[updatedFormElementName].valid && formIsValid;
        }

        this.setState({
            formControls: updatedControls,
            formIsValid: formIsValid
        });
    }


    loginUser(user){
        return API_LOGIN.postLogin(user, (result, status, error) => {
           if(result != null && (status === 200 || status === 201)) {
               console.log("Successfully sign in: " + JSON.stringify(result.username) + " " + JSON.stringify(result.roles));

                AuthenticationService.registerLogin(result.username, result.token, result.roles)

               this.setState(({
                   errorStatus: 0,
                   error: null,
                   hasLoginFailed: false
               }));


               this.props.history.push("/");

           } else {
               this.setState(({
                   errorStatus: status,
                   error: error,
                   hasLoginFailed:true
               }));
           }
        });
    }


    handleSubmit() {
        let user_object = {
            username: this.state.formControls.username.value,
            password: this.state.formControls.password.value
        };
        this.loginUser(user_object);

    }


    render() {
        return(
          <div>
              <div
                  style={{
                      position: 'absolute', left: '50%', top: '50%',
                      transform: 'translate(-50%, -50%)'
                  }}>
                  {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
                  <FormGroup id='username'>
                      <Label for='usernameField'> Username: </Label>
                      <Input name='username' id='usernameField' placeholder={this.state.formControls.username.placeholder}
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
                      <Input name='password' id='passwordField' type="password" placeholder={this.state.formControls.password.placeholder}
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
                          <Button type={"submit"} disabled={!this.state.formIsValid} onClick={this.handleSubmit}> Submit </Button>
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

export default LoginComponent;