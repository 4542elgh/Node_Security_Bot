const request = require("request");
const cheerio = require("cheerio");
const db = require("./db.js");
const parser = require("./parser.js");
const got = require("got");

// Export as function
// const fetchBlogs = () => {
const fetchBlogs = new Promise(function executor(resolve) {
  request("https://nodejs.org/en/blog", (err, res, html) => {
    if (!err && res.statusCode == 200) {
      const $ = cheerio.load(html);
      let announcements = [];

      $("ul.blog-index")
        .children()
        .each(function () {
          // Datetime attribute is more precise
          const announced = $($(this).children()[0]).attr("datetime");
          const entry = $($(this).children()[1]);
          const title = entry.text();
          let description = [];

          $($(this).children()[2])
            .children()
            // Remove "Read more..." button
            .slice(0, -1)
            .each(function () {
              // Stores all text within post excluding first line and title
              let bullets = $(this)
                .contents()
                .text()
                .split(/[\r\n]+/)
                .filter((words) => words !== "");

              description.push(...bullets);
            });

          announcements.push({
            announced: announced,
            title: title,
            link: `https://nodejs.org${entry.attr("href")}`,
            description: parser(description),
          });
        });

      resolve(announcements);
    }
  });
});

// const fetchChildBlogs = async (announcements) => {
const fetchChildBlogs = async (announcements) => {
  const promises = announcements.map(async (a, index) => {
    const response = await got(a.link);
    return response;
  });

  const responses = await Promise.all(promises);
  responses.forEach((response, index) => {
    const c = cheerio.load(response.body);
    c("#main")
      .find("div > div")
      .children()
      .each(function (i, element) {
        // Display blog title and title only
        const blog_author = c(c(c(this).children()[0]).children()[1])
          .text()
          .substring(3) // remove the 'by ' string in the front
          .split(",")[0]; // remove the date after the comma
        const blog_subtitle = c(c(this).children()[1]).text().trim();
        const available = c(c(this).children()[2]).text().trim();
        // Details;
        announcements[index]["author"] = blog_author;
        announcements[index]["subtitle"] = blog_subtitle;
        announcements[index]["available"] = available;
      });
  });

  // const dbConnection = new db();
  // // This is a callback, you cannot do something after this function and rely on values inside async function. It will be undefined
  // dbConnection.lastEntry(function (result) {
  //   const last_entry = result[0];
  //   if (a.title !== last_entry.title) {
  //     // console.log("update database");
  //     // dbConnection.insertIntoBlog(latest_entries.slice(0, 1));
  //     // sendToChannel(a);
  //   } else {
  //     console.log("No update necessary");
  //     // sendToChannel(`No new announcements available`);
  //   }
  //   dbConnection.close();
  // });
  // });
  // });
  // setTimeout(() => {
  //   console.log(announcements);
  // }, 2000);

  return announcements;
};

module.exports.fetchBlogs = fetchBlogs;
module.exports.fetchChildBlogs = fetchChildBlogs;
