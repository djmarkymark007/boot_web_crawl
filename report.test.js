const {test, expect} = require('@jest/globals')
const {sortObj} = require('./report')

const testObj = {
    'hi': 5,
    'what': 1,
    'wow': 2,
}


test('sort object', () => {
    expect(sortObj(testObj)).toStrictEqual([['hi', 5], ['wow', 2], ['what', 1]])
})