// https://netproject1617.azurewebsites.net/
const oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth";
const tokenInfoEndpoint = "https://www.googleapis.com/oauth2/v3/tokeninfo"
const listFilesEndpoint = "https://www.googleapis.com/drive/v3/files";
const revokeTokenEndpoint = "https://accounts.google.com/o/oauth2/revoke";

const clientId = "521276716409-ib243g6vit5fqh5on5fgvsg27r2qsabd.apps.googleusercontent.com";
const clientSecret = "";

var accessToken;

function signIn() {
    let params = {
        scope: "email profile",
        // state: "",
        redirect_uri: getLocationUrl(),
        response_type: "token",
        client_id: clientId
    }
    let signInUri = buildUri(oauth2Endpoint, params);
    let signInLink = <HTMLLinkElement>document.getElementById("signin-link");
    signInLink.href = signInUri;
    signInLink.innerHTML = signInUri;
    // window.location.href = signInUri;
}

function validateToken() {
    if (!accessToken) {
        return;
    }
    let params = {
        access_token: accessToken
    };
    let tokenValidationUri = buildUri(tokenInfoEndpoint, params);
    let validateTokenLink = <HTMLLinkElement>document.getElementById("validate-link");
    validateTokenLink.href = tokenValidationUri;
    validateTokenLink.innerHTML = tokenValidationUri;

    let req = new XMLHttpRequest();
    req.open('GET', tokenValidationUri, true);
    req.onreadystatechange = function (error) {
        if (req.readyState === XMLHttpRequest.DONE) {
            let tokenValidation = JSON.parse(req.responseText);
            let tokenValidationString = JSON.stringify(tokenValidation, null, 4);
            document.getElementById("validate-response").innerHTML = tokenValidationString;
            // audience, scope, user_id, expires_in
        }
    };
    req.send(null);
}

function listFiles() {
    let params = {
        access_token: accessToken,
        q: "'root' in parents" // get only files in the root directory
    };
    let listFilesUrl = buildUri(listFilesEndpoint, params);
    document.getElementById('listfiles-link').innerHTML = listFilesUrl;
    
    let req = new XMLHttpRequest();
    req.open('GET', listFilesUrl, true);
    req.onreadystatechange = function (error) {
        if (req.readyState === XMLHttpRequest.DONE) {
            let data = req.responseText && JSON.parse(req.responseText);
            let dataString = data && JSON.stringify(data, null, 4);
            document.getElementById("listfiles-response").innerHTML = dataString;
            // audience, scope, user_id, expires_in
        }
    };
    req.send(null);
}

function getFilesPermission() {
    let params = {
        scope: "https://www.googleapis.com/auth/drive.metadata.readonly",
        // state:"",
        redirect_uri: getLocationUrl(),
        response_type: "token",
        client_id: clientId,
        approval_prompt: "force",
        include_granted_scopes: true // combine all previous access tokens
    };
    let getFilesPermissionUri = buildUri(oauth2Endpoint, params);
    let getFilesPermissionLink = <HTMLLinkElement>document.getElementById("getfilespermission-link");
    getFilesPermissionLink.href = getFilesPermissionUri;
    getFilesPermissionLink.innerHTML = getFilesPermissionUri;
    // window.location.href = getFilesPermissionUri;
}

function revokeToken() {
    if (!accessToken) {
        return;
    }
    let params = {
        token: accessToken
    };
    let revokeTokenUri = buildUri(revokeTokenEndpoint, params);
    let revokeTokenLink = <HTMLLinkElement>document.getElementById("revoketoken-link");
    revokeTokenLink.href = revokeTokenUri;
    revokeTokenLink.innerHTML = revokeTokenUri;
}

window.onload = function () {
    let hashFragment = location.hash.substring(1);
    if (hashFragment) {
        let tokenParams = decodeHashFragment(hashFragment);
        let tokenString = JSON.stringify(tokenParams, null, 4);
        document.getElementById("signin-response").innerHTML = tokenString;

        if (tokenParams.hasOwnProperty("error")) {
        } else if (tokenParams.hasOwnProperty("access_token")) {
            accessToken = tokenParams["access_token"];
            // expires_in, token_type
        }
    }
};