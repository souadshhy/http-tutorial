function normalizeURL(url){
    const urlObj = new URL(url);
    const hostURL = `${urlObj.hostname}${urlObj.pathname}`;
    if(hostURL.length > 0 && hostURL.slice(-1) === '/'){
        return hostURL.slice(0,-1);
    }
    return hostURL;

}

module.exports ={
    normalizeURL
}