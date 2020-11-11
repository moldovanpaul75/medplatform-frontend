import React, {Component} from 'react'
import {Route, Redirect} from 'react-router-dom'
import AuthenticationService from "../login/service/authentication-service";



class AuthenticatedRoute extends Component {
    render() {
        if(AuthenticationService.isUserLoggedIn()) {
            if(this.props.path === "/login") {
                return <Redirect to="/"/>
            }
            else return <Route {...this.props}/>
        } else {
            if(this.props.path === "/login") {
               return <Route {...this.props}/>
            }
            else return <Redirect to="/login"/>
        }
    }
}

export default AuthenticatedRoute