import {HOST} from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";
import AuthenticationService from "../service/authentication-service"

const endpoint = {
    login: '/auth'
};


function getCurrentUser(callback) {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })

    if(AuthenticationService.isUserLoggedIn()){
        headers.append('Authorization', AuthenticationService.createJWTToken())
    }

    let request = new Request(HOST.backend_api + endpoint.login, {
        method: 'GET',
        headers,
    });
    RestApiClient.performRequestTextResponse(request, callback);
}


function postLogin(user, callback){
    let request = new Request(HOST.backend_api + endpoint.login , {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    });
    RestApiClient.performRequest(request, callback);
}

export {
    getCurrentUser,
    postLogin
};