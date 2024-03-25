const {argv} = require('node:process')
const {crawlPage} = require('./crawl')
const {printReport} = require('./report')

async function main() {
    //NOTE(Mark): argv[0] === node path, argv[1] === index.js path
    if (argv.length === 3) {
        startingUrl = argv[2]
        console.log(`starting the crawl at ${startingUrl}`)
        pages = await crawlPage(startingUrl, startingUrl, {})
        printReport(pages)
    } else {
        console.log('Error: requires one arg (http://www.google.com)')
    }
}

main()
