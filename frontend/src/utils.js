import fetch from "isomorphic-fetch"

export  function request(url, options, success, error400, error, failure) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    options["headers"] = headers;
    options["method"] = "POST";
    options["body"] = JSON.stringify({username:"testUser4", password:"12345"});
    fetch(url, options)
        .then(res => {
            console.log(res.status);
        if (res.status >= 200 && res.status < 300) {
            // for anything in 200-299 we expect our API to return a JSON response
            res.json().then(json => { success(json) })
        } else if (res.status === 400) {
            // even for 400 we expect a JSON response with form errors
            res.json().then(json => { error400(json) })
        } else {
            // For all other errors we are not sure if the response is JSON,
            // so we just want to display a generic error modal
            error(res)
        }
        }).catch((ex) => { failure(ex) })
}

