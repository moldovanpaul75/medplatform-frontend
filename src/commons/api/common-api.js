import AuthenticationService from "../../login/service/authentication-service";
import {HOST} from "../hosts";
import * as RestApiClient from "./rest-client";

function getProfile(path, callback){
    const headers = new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    })

    if(AuthenticationService.isUserLoggedIn()){
        headers.append('Authorization', AuthenticationService.createJWTToken())
    }

    let request = new Request(HOST.backend_api + path + '/profile/' + AuthenticationService.getUserId(), {
        method: 'GET',
        headers,
    });
     RestApiClient.performRequest(request, callback);
}

export {
  getProfile
};