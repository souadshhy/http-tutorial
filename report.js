function printReport(pages){
    console.log(" ");
    console.log("================");
    console.log("REPORT");
    console.log("================");
    console.log(" ");
    
    const sortedPages = sortPages(pages);
    for(const page of sortedPages){
        const url = page[0];
        const hits = page[1];
        console.log(`Found ${hits} links to page: ${url}`);
    }

    console.log(" ");
    console.log("================");
    console.log("END REPORT");
    console.log("================");
    console.log(" ");
}

function sortPages(pages){
    
    const pagesArr = Object.entries(pages);
    const sortedPages = pagesArr.sort((a,b)=>{
        return a[1] > b[1] ? -1 : 1;
     });
    
     return sortedPages;
}

module.exports = 
{
    sortPages,
    printReport
};
