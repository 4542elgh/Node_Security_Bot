const request = require ("request")
const cheerio = require ("cheerio")
const fs = require("fs")


// Fetching html page into file
// request('https://nodejs.org/en/blog', (err, res, html) => {
//   if (!err && res.statusCode == 200) {
// 		fs.writeFileSync('index.html', html)
// 	}
// })

const html = fs.readFileSync('./index.html', 'utf-8')

const $ = cheerio.load(html);

$('ul.blog-index').children().each(function(i, element){
	const entry = $($(this)
									.children()[1])

	const title = entry.text()
	const link = `https://nodejs.org${entry.attr('href')}`

	// Follow link to full article and download them to file
	// request(link, (err, res, html) => {
	// 	if (!err && res.statusCode == 200) {
	// 		fs.writeFileSync(`${title}.html`, html)
	// 	}
	// })

})
