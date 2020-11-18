import {HOST} from "../../../commons/hosts";
import * as RestApiClient from "../../../commons/api/rest-client";
import * as API_COMMON from "../../../commons/api/common-api";

const endpoint = {
    userRole: '/user_role'
}

function getRoleByName(name, callback){
    let request = new Request(HOST.backend_api + endpoint.userRole + '/name=' + name,{
       method: 'GET',
       headers: API_COMMON.buildHeaders(),
    });
    RestApiClient.performRequest(request, callback);
}


export {
    getRoleByName,
};