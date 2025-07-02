const {JSDOM} = require("jsdom");
const { skip } = require("node:test");

function getUrlsFromHTML (htmlBody, BaseURL ){
    const url = [];
    const dom = new JSDOM(htmlBody);
    const linkElements = dom.window.document.querySelectorAll("a");
    
    for( const link of linkElements ){
        
        if(link.href.slice(0,1) === '/'){
            // relative 
            try{
                const hostURL = new URL(`${BaseURL}${link.href}`);
                url.push(hostURL.href);
            }
            catch(err){
                console.log(`Error in relative link: ${err.message}`);
            }
        }
        else{
            try{
                // absolute
                const hostURL = new URL(link.href);
                url.push(hostURL.href);
            }
            catch( err){
                console.log(`Error in absolute link: ${err.message}`)
            }
        }
    }
    return url;
}

function normalizeURL(url){
    const urlObj = new URL(url);
    const hostURL = `${urlObj.hostname}${urlObj.pathname}`;
    if(hostURL.length > 0 && hostURL.slice(-1) === '/'){
        return hostURL.slice(0,-1);
    }
    return hostURL;

}

async function crawlPage(webpage){

    console.log(`actively crawling ${webpage}`);
    try{ 
        const resp = await fetch(webpage);

        if(resp.status >399){
            console.log(`error in fetch with status code: ${resp.status}, on page: ${webpage}`);
        }
        const contentType = resp.headers.get("Content-Type");
        if(!contentType.includes("text/html")){
            console.log(`non html response, content type: ${contentType}, on page: ${webpage}`);
            return;
        }
        console.log( await resp.text());
        

    } catch(err){
        console.log(`error in fetch: ${err.message}, on page: ${webpage}`);
    }

}



module.exports ={
    normalizeURL,
    getUrlsFromHTML, 
    crawlPage
}