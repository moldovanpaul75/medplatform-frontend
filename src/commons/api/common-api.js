import AuthenticationService from "../../login/service/authentication-service";
import {HOST} from "../hosts";
import * as RestApiClient from "./rest-client";


function buildHeaders(){
    const headers = new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    })
    // if(AuthenticationService.isUserLoggedIn()){
    //     headers.append('Authorization', AuthenticationService.createJWTToken())
    // }
    return headers;
}


function getProfile(path, callback){
    let request = new Request(HOST.backend_api + path + '/profile/' + AuthenticationService.getUserId(), {
        method: 'GET',
        headers: buildHeaders(),
    });
     RestApiClient.performRequest(request, callback);
}


function getItems(endpoint, callback){
    let request = new Request(HOST.backend_api + endpoint, {
        method: 'GET',
        headers: buildHeaders(),
    });
    RestApiClient.performRequest(request, callback);
}


function deleteItem(endpoint, id, callback){
    let request = new Request(HOST.backend_api + endpoint + "/" + id, {
        method: 'DELETE',
        headers: buildHeaders(),
    });
    RestApiClient.performRequestWithoutResponse(request, callback);
}


function saveItem(endpoint, method, item, callback){
    let request = new Request(HOST.backend_api + endpoint, {
        method: method,
        headers: buildHeaders(),
        body: JSON.stringify(item)
    });
    RestApiClient.performRequest(request, callback);
}


export {
    getProfile,
    getItems,
    deleteItem,
    saveItem
};