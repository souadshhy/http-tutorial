const {crawlPage} = require("./crawl.js");

async function main() {

    if ( process.argv.length < 3){
        console.log(`no website was provided`);
    }

    if ( process.argv.length > 3){
        console.log(`too many command-line arguments`);
    }

    const webpage = process.argv[2];
    
    console.log(`crawling ${webpage}`);
    
    const pages = await crawlPage(webpage, webpage, {});
    
    Object.entries(pages).forEach(page => console.log(page))



}
main();