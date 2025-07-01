const { normalizeURL, getUrlsFromHTML } = require("./crawl.js");
const {test, expect} = require("@jest/globals");

test("normalizeURL strip protocol", ()=>{
    const input ="https://google.com/user";
    const actual = normalizeURL(input);
    const expected ="google.com/user";
    expect(actual).toEqual(expected);
});

test("normalizeURL strip trailing slash", ()=>{
    const input ="https://google.com/user/";
    const actual = normalizeURL(input);
    const expected ="google.com/user";
    expect(actual).toEqual(expected);
});

test("normalizeURL capitals", ()=>{
    const input ="https://GOOGLE.com/user";
    const actual = normalizeURL(input);
    const expected ="google.com/user";
    expect(actual).toEqual(expected);
});

test("normalizeURL strip http", ()=>{
    const input ="http://google.com/user/";
    const actual = normalizeURL(input);
    const expected ="google.com/user";
    expect(actual).toEqual(expected);
});

test("getUrlFromHTML absolute", ()=>{
    const inputBodyHTML= `
    <html>
        <body>
            <a href="https://google.com/">
             Google!
            </a>
        </body>
    </html>
`
    const inputBaseURL= "https://google.com";
    const actual = getUrlsFromHTML(inputBodyHTML, inputBaseURL);
    const expected =["https://google.com/"];
    expect(actual).toEqual(expected);
})


test("getUrlFromHTML relative", ()=>{
    const inputBodyHTML= `
    <html>
        <body>
            <a href="/user/">
             Google!
            </a>
        </body>
    </html>
`
    const inputBaseURL= "https://google.com";
    const actual = getUrlsFromHTML(inputBodyHTML, inputBaseURL);
    const expected =["https://google.com/user/"];
    expect(actual).toEqual(expected);
})

test("getUrlFromHTML both", ()=>{
    const inputBodyHTML= `
    <html>
        <body>
            <a href="/user1/">
             Google!
            </a>
             <a href="https://google.com/user2/">
             Google!
            </a>
        </body>
    </html>
`
    const inputBaseURL= "https://google.com";
    const actual = getUrlsFromHTML(inputBodyHTML, inputBaseURL);
    const expected =["https://google.com/user1/", "https://google.com/user2/"];
    expect(actual).toEqual(expected);
})

test("getUrlFromHTML invalid url", ()=>{
    const inputBodyHTML= `
    <html>
        <body>

            <a href="invalid">
             Google! or is it...
            </a>
             
        </body>
    </html>
`
    const inputBaseURL= "https://google.com";
    const actual = getUrlsFromHTML(inputBodyHTML, inputBaseURL);
    const expected =[];
    expect(actual).toEqual(expected);
})