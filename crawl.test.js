const {test, expect} = require('@jest/globals')
const {normalizeUrl, getURLsFromHTML} = require('./crawl')


test('normalizeUrl', ()=> {
    expect(normalizeUrl('https://blog.boot.dev/path/')).toBe('blog.boot.dev/path')
    expect(normalizeUrl('https://blog.boot.dev/path')).toBe('blog.boot.dev/path')
    expect(normalizeUrl('http://blog.boot.dev/path/')).toBe('blog.boot.dev/path')
    expect(normalizeUrl('http://blog.boot.dev/path')).toBe('blog.boot.dev/path')
})

const example_site = `<html>
    <body>
        <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
        <a href="https://blog.boot.dev/"><span>Go to Boot.dev</span></a>
        <a href="/wow.html"><span>Go to wow</span></a>
        <a href="path/one"><span>Boot.dev></span></a>
    </body>
</html>
`

test('getUrlFromHtml', () => {
    expect(getURLsFromHTML(example_site, 'https://blog.boot.dev')).toStrictEqual(['https://blog.boot.dev/', 
    'https://blog.boot.dev/',
    'https://blog.boot.dev/wow.html'])
})