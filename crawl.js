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

async function crawlPage(baseURL,currentURL, pages){
    
    const baseURLObj = new URL(baseURL);
    const currentURLObj = new URL(currentURL);
    
    // encountering an outside page
    if(baseURLObj.hostname !== currentURLObj.hostname){
        return pages;
    }

    // encountering an already crawled page
    const normalizedCurrentURL = normalizeURL(currentURL);
    if(pages[normalizedCurrentURL] > 0){
        pages[normalizedCurrentURL]++;
        return pages;
    }

    // crawling a page

    pages[normalizedCurrentURL] = 1;
    
    console.log(`actively crawling ${currentURL}`);

    try{
        // get req by default
        const resp = await fetch(currentURL);
        

        if(resp.status >399){
            console.log(`error in fetch with status code: ${resp.status}, on page: ${currentURL}`);
            return pages;
        }

        const contentType = resp.headers.get("Content-Type");
        if(!contentType.includes("text/html")){
            console.log(`non html response, content type: ${contentType}, on page: ${currentURL}`);
            return  pages;
        }
        
        // getting the html from the current webpage
        const htmlBody = await resp.text();
        
        // getting the links from the current webpage's HTML
        const nextURLs = getUrlsFromHTML(htmlBody, baseURL);
        
        // iterating over each webpage's link to crawl the webpage
        for( const nextURL of nextURLs){
            pages = await crawlPage(baseURL, nextURL, pages);
        }


    } catch(err){
        console.log(`error in fetch: ${err.message}, on page: ${currentURL}`);
    }

    return pages;
}



module.exports =
{
    normalizeURL,
    getUrlsFromHTML, 
    crawlPage
}