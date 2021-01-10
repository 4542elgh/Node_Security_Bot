const request = require ("request")
const cheerio = require ("cheerio")
const fs = require("fs")

/* 
STEP 1
** Uncomment the following code to create index.html **
Creates a HTML file with the contents of desired URL and creates an index.html in root directory
*/

// START OF STEP 1
// Fetching html page into file
// request('https://nodejs.org/en/blog', (err, res, html) => {
//   if (!err && res.statusCode == 200) {
// 		fs.writeFileSync('index.html', html)
// 	}
// })
// END OF STEP 1

/*
STEP 2
Create reference to index.html and load it
*/

// START OF STEP 2
const html = fs.readFileSync('./index.html', 'utf-8')
const $ = cheerio.load(html);
// END OF STEP 2

/*
STEP 3
Copy html files that contain the details
*/

// START OF STEP 3
// $('ul.blog-index').children().each(function(i, element){
// 	// Follow link to full article and download them to file
// 	request(link, (err, res, html) => {
// 		if (!err && res.statusCode == 200) {
// 			fs.writeFileSync(`${title}.html`, html)
// 		}
// 	})
// })
// END OF STEP 3


/*
STEP 4
Create json objects that contain information for recent updates
*/

//START OF STEP 4
// array to store announcements
const announcements = []

// Getting HTLM list and iterating through items
$('ul.blog-index').children().each(function(i, element){

	const announced = $($(this).children()[0]).text()
	const entry = $($(this).children()[1])
	const title = entry.text()
	const description = $($(this).children()[2]).text().trim().replace('\n', ' ')
	
	const link = `https://nodejs.org${entry.attr('href')}`

	// creating announcement
	const annoucement = {
		"id":			i,
		"announced":	announced,
		"title": 		title,
		"link": 		link,
		"description":	description,
		"path":			`${title}.html`
	}

	// adding announcement
	announcements.push(annoucement)

})

// Getting details for each announcement
announcements.forEach(a => {
	const page = fs.readFileSync(`./${a.path}`, 'utf-8')
	const c = cheerio.load(page);

	c('#main').find('div > div').children().each(function(i, element){

		// This will iterate through all elements within div
		// const l = c(this).children()
		// for(let x = 0; x < l.length; x++){
		// 	console.log(c(l[x]).text())
		// }

		const blog_title = c(c(this).children()[0]).text().trim()
		const blog_subtitle = c(c(this).children()[1]).text().trim()
		const available = c(c(this).children()[2]).text().trim()
		const issues = c(c(this).children()[3]).text().trim()

		const details = {
			'blog_title': 		blog_title,
			'blog_subtitle': 	blog_subtitle,
			'available': 		available,
			'issues': 			issues
		}

		a['details'] = details

	})
})
// END OF STEP 4


/* 
STEP 5
Writing json data to text file
*/

// START OF STEP 5
// Preparing data for text file
const objects = {
	"announcements": announcements
}
// 

// Writing objects in objs array to text file
fs.writeFile("objects.txt", JSON.stringify(objects), function(err) {
    if (err) {
        console.log(err);
    }
});
// END OF STEP 5
