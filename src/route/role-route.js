import React, {Component} from 'react'
import {Route, Redirect} from 'react-router-dom'
import AuthenticationService from "../login/service/authentication-service";

class RoleRoute extends Component {
    render() {
        if(AuthenticationService.isUserLoggedIn()) {
            const role = AuthenticationService.getUserRole()
             if(this.props.role === role){
                 return <Route {...this.props}/>
             }
             else{
                 return <Redirect to="/error"/>
             }
        }else{
            return <Redirect to="/login"/>
        }
    }
}


export default RoleRoute