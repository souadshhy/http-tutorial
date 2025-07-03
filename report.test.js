const {sortPages} = require("./report.js");
const {test, expect} = require("@jest/globals");

test("sortPages 2 pages", ()=>{
    const input = {
        "https://www.wagslane.dev/tags": 1,
        "https://www.wagslane.dev": 3
    }
    const actual = sortPages(input);
    const expected = [
        ["https://www.wagslane.dev", 3],
        ["https://www.wagslane.dev/tags", 1]
    ]
    expect(actual).toEqual(expected);
})

test("sortPages many pages", ()=>{
    const input = {
        "https://www.wagslane.dev/tags": 1,
        "https://www.wagslane.dev/tags2": 7,
        "https://www.wagslane.dev/tags3": 5,
        "https://www.wagslane.dev/tags4": 3,
        "https://www.wagslane.dev/tags5": 9
    }
    const actual = sortPages(input);
    const expected = [
        ["https://www.wagslane.dev/tags5", 9],
        ["https://www.wagslane.dev/tags2", 7],
        ["https://www.wagslane.dev/tags3", 5],
        ["https://www.wagslane.dev/tags4", 3],
        ["https://www.wagslane.dev/tags", 1]
    ]
    expect(actual).toEqual(expected);
})