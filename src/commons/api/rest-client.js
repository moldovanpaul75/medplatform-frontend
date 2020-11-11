function performRequest(request, callback){
    fetch(request)
        .then(
            function(response) {
                if (response.ok) {
                    response.json().then(json => callback(json, response.status, null))
                        .catch(error=> {
                            console.log("Successful request, Could not parse body as json", error);
                            callback(null, response.status, null)
                        });
                }
                else {
                    response.json().then(err => callback(null, response.status, err))
                        .catch(error=> {
                            console.log("Successful request, Could not parse body as json", error);
                            callback(null, response.status, null)
                        });
                }
            })
        .catch(function (err) {
            callback(null, 1, err)
        });
}


function performRequestTextResponse(request, callback){
    fetch(request)
        .then(
          function(response){
              if(response.ok) {
                  response.text().then(data => callback(data, response.status, null));
              }else{
                  response.text().then(err => callback(null, response.status, err));
              }
          })
        .catch(function (err){
           callback(null, 1, err);
        });
}


module.exports = {
    performRequest,
    performRequestTextResponse,
};
