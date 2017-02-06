function buildUri(url, params) {
    let uri = url;
    if (Object.keys(params).length > 0) {
        uri += "?";
        let firstParam = true;
        for (let paramName in params) {
            if (firstParam) {
                firstParam = false;
            }
            else {
                uri += "&";
            }
            uri += paramName + "=" + encodeURIComponent(params[paramName]);
        }
    }
    return uri;
}
function decodeHashFragment(hashFragmentQueryString) {
    let params = {};
    let regex = /([^&=]+)=([^&]*)/g;
    let m;
    while (m = regex.exec(hashFragmentQueryString)) {
        params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
    }
    return params;
}
function getLocationUrl() {
    return window.location.protocol + "//" + window.location.host + window.location.pathname;
}
//# sourceMappingURL=util.js.map