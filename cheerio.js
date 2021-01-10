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

const objs = []

// Getting HTLM list and iterating through items
$('ul.blog-index').children().each(function(i, element){

	const announced = $($(this).children()[0]).text()
	const entry = $($(this).children()[1])
	const title = entry.text()
	const details = $($(this).children()[2]).text().trim().replace('\n', ' ')
	
	const link = `https://nodejs.org${entry.attr('href')}`

	// creating json objects
	const ver_details = {
		"announced":	announced,
		"title": 		title,
		"link": 		link,
		"details":		details
	}

	objs.push(ver_details)

	// Follow link to full article and download them to file
	// request(link, (err, res, html) => {
	// 	if (!err && res.statusCode == 200) {
	// 		// fs.writeFileSync(`${title}.html`, html)
	// 		console.log(link)
	// 	}
	// })

})

// Writing objects in objs array to text file
fs.writeFile("objects.txt", JSON.stringify(objs), function(err) {
    if (err) {
        console.log(err);
    }
});

