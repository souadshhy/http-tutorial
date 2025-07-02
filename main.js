const {crawlPage} = require("./crawl.js");

function main() {

    if ( process.argv.length < 3){
        console.log(`no website was provided`);
    }

    if ( process.argv.length > 3){
        console.log(`too many command-line arguments`);
    }

    const webpage = process.argv[2];
    console.log(`crawling ${webpage}`);
    crawlPage(webpage);


}
main();