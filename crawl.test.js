const { normalizeURL } = require("./crawl.js");
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