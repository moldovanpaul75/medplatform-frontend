import {HOST} from '../../../commons/hosts';
import RestApiClient from '../../../commons/api/rest-client';
import AuthenticationService from "../../../login/service/authentication-service";


const endpoint = {
    medications: '/medication',
    sideEffects: '/side_effect'
};



function getMedications(callback){

    const headers = new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    });

    // if(AuthenticationService.isUserLoggedIn()){
    //     headers.append('Authorization', AuthenticationService.createJWTToken())
    // }

    let request = new Request(HOST.backend_api + endpoint.medications, {
        method: 'GET',
        headers,
    });
    RestApiClient.performRequest(request, callback);
}


function getSideEffects(callback){

    const headers = new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    });

    // if(AuthenticationService.isUserLoggedIn()){
    //     headers.append('Authorization', AuthenticationService.createJWTToken())
    // }

    let request = new Request(HOST.backend_api + endpoint.sideEffects, {
        method: 'GET',
        headers,
    });
    RestApiClient.performRequest(request, callback);
}

function deleteMedication(medicationId, callback){

    const headers = new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    });

    let request = new Request(HOST.backend_api + endpoint.medications + "/" + medicationId, {
        method: 'DELETE',
        headers,
    });
    RestApiClient.performRequestWithoutResponse(request, callback);
}


function deleteSideEffect(sideEffectId, callback){

    const headers = new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    });

    let request = new Request(HOST.backend_api + endpoint.sideEffects + "/" + sideEffectId, {
        method: 'DELETE',
        headers,
    });
    RestApiClient.performRequestWithoutResponse(request, callback);
}


export {
    getMedications,
    getSideEffects,
    deleteMedication,
    deleteSideEffect
};