const jsdom = require("jsdom");
const { JSDOM } = jsdom;

function normalizeUrl(url) {
    urlObj = new URL(url);
    path = urlObj.pathname;
    if (path.length > 0 && path[path.length -1] === '/') {
        path = path.slice(0,-1);
    }
  return urlObj.hostname + path;
}

function getURLsFromHTML(html, baseURL) {
    const dom = new JSDOM(html);
    const aTags = dom.window.document.querySelectorAll('a')
    const result = [] 
    for (aTag of aTags) {
        url = aTag.href
        if (url[0] == '/') {
            try {
                result.push(new URL(url, baseURL).href)
            } catch(err) {
                console.log(`${err.message}: ${aTag.href}, base: ${baseURL}`)
            }
        } else {
            try {
                result.push(new URL(url).href)
            } catch(err) {
                console.log(`${err.message}: ${aTags.href}`)
            }
        }
    }
    return result
}

async function crawlPage(baseUrl, currentUrl, pages) {
    baseUrlObj = new URL(baseUrl)
    currentUrlObj = new URL(currentUrl)
    if (baseUrlObj.host != currentUrlObj.host) {
        return pages
    }
    const normalCurrentUrl = normalizeUrl(currentUrl)
    if (normalCurrentUrl in pages) {
        pages[normalCurrentUrl]++;
        return pages
    }

    pages[normalCurrentUrl] = 1;
    console.log(`crawling ${currentUrl}`)
    try {
        response = await fetch(currentUrl)
        if (response.ok) {
            const contentType = response.headers.get('content-type')
            if (contentType.includes('text/html') ) {
                data = await response.text()
                newUrls = getURLsFromHTML(data, baseUrl)
                for (url of newUrls) {
                    pages = await crawlPage(baseUrl, url, pages)
                }
                return pages
            } else {
                console.log(`Error: non-html content-type ${contentType}`)
            }
        } else {
            console.log(`Error: HTTP status ${response.status}`)
        }
    } catch (err) {
        console.log(`${err.message}: ${currentUrl}`)
    }

    return pages
}


module.exports = {
    normalizeUrl,
    getURLsFromHTML,
    crawlPage
}

