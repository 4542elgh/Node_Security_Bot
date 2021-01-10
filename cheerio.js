const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");

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
const html = fs.readFileSync("./index.html", "utf-8");
const $ = cheerio.load(html);
// END OF STEP 2

/*
STEP 3
Copy html files that contain the details
*/

// START OF STEP 3
// $('ul.blog-index').children().each(function(i, element){
//     const entry = $($(this).children()[1])
//     const title = entry.text()
//     const link = `https://nodejs.org${entry.attr('href')}`

//     // Follow link to full article and download them to file
//     request(link, (err, res, html) => {
// 	    if (!err && res.statusCode == 200) {
// 		    fs.writeFileSync(`${title}.html`, html)
// 	    }
//     })
// })
// END OF STEP 3

/*
STEP 4
Create json objects that contain information for recent updates
*/

//START OF STEP 4
// array to store announcements
const announcements = [];

// Getting HTLM list and iterating through items
$("ul.blog-index")
  .children()
  .each(function (i, element) {
    const announced = $($(this).children()[0]).text();
    const entry = $($(this).children()[1]);
    const title = entry.text();

    let description = "";

    $($(this).children()[2])
      .children()

      // This remove the "Read more..." button which appear on every blog entry
      .slice(0, -1)
      .each(function () {
        // This determine if there are nested list
        console.log($(this).children().length);

        // TODO, find a way to iterate if there is nested list

        // let text = $(this).text().trim().replace("\n", " ");
        let text = $(this).text().trim().replace(/\s\s+/g, " ");
        console.log(text);
        if (!text.includes("Read more")) {
          description += text;
        }
      });

    console.log("");

    const link = `https://nodejs.org${entry.attr("href")}`;

    // creating announcement
    const annoucement = {
      id: i,
      announced: announced,
      title: title,
      link: link,
      description: description,
      path: `${title}.html`,
    };

    // adding announcement
    announcements.push(annoucement);
  });

// Getting details for each announcement
announcements.forEach((a) => {
  const page = fs.readFileSync(`./${a.path}`, "utf-8");
  const c = cheerio.load(page);

  c("#main")
    .find("div > div")
    .children()
    .each(function (i, element) {
      // This will iterate through all elements within div
      // const l = c(this).children()
      // for(let x = 0; x < l.length; x++){
      // 	console.log(c(l[x]).text())
      // }

      // This is one level deeper than last commit. Correctly display blog title and title only
      const blog_title = c(c(c(this).children()[0]).children()[0]).text();
      const blog_author = c(c(c(this).children()[0]).children()[1])
        .text()
        .substring(3) // remove the 'by ' string in the front
        .split(",")[0]; // remove the date after the comma

      const blog_subtitle = c(c(this).children()[1]).text().trim();
      const available = c(c(this).children()[2]).text().trim();
      const issues = c(c(this).children()[3]).text().trim();

      // object property shorthand
      const details = {
        blog_title,
        blog_author,
        blog_subtitle,
        available,
        issues,
      };

      a["details"] = details;
    });
});
// // END OF STEP 4

/* 
STEP 5
Writing json data to text file
*/

// START OF STEP 5
// Preparing data for text file
const objects = {
  announcements,
};
//

// Writing objects in objs array to text file
fs.writeFile("objects.txt", JSON.stringify(objects), function (err) {
  if (err) {
    console.log(err);
  }
});
// END OF STEP 5

// console.log(objects.announcements[0].details.blog_title[0]);
