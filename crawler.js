const request = require("request");
const cheerio = require("cheerio");
const db = require("./db.js");

const fetchBlogs = (sendToChannel) => {
  request("https://nodejs.org/en/blog", (err, res, html) => {
    if (!err && res.statusCode == 200) {
      const $ = cheerio.load(html);

      // array to store announcements
      let announcements = [];

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
              const is_nested = $(this).children().length > 0 ? true : false;

              // Iterate through list if it exists
              if (is_nested) {
                // Iterate through list and append text to description
                $($(this).children()).each(function () {
                  // Appending list (<li>) text to description
                  description += $(this).text().replace(/\s\s+/g, " ");
                });
              } else {
                let text = $(this).text().trim().replace(/\s\s+/g, " ");
                if (!text.includes("Read more")) {
                  description += text;
                }
              }
            });

          const link = `https://nodejs.org${entry.attr("href")}`;

          // creating announcement
          const announcement = {
            // id: i,
            announced: announced,
            title: title,
            link: link,
            description: description,
            path: `${title}.html`,
          };

          // adding announcement
          announcements.push(announcement);
        });

      announcements = announcements.slice(0, 2);

      announcements.forEach((a) => {
        request(a.link, (err, res, page) => {
          const c = cheerio.load(page);

          c("#main")
            .find("div > div")
            .children()
            .each(function (i, element) {
              // This is one level deeper than last commit. Correctly display blog title and title only
              // const blog_title = c(c(c(this).children()[0]).children()[0]).text();
              const blog_author = c(c(c(this).children()[0]).children()[1])
                .text()
                .substring(3) // remove the 'by ' string in the front
                .split(",")[0]; // remove the date after the comma

              const blog_subtitle = c(c(this).children()[1]).text().trim();
              const available = c(c(this).children()[2]).text().trim();

              // Details;
              a["author"] = blog_author;
              a["subtitle"] = blog_subtitle;
              a["available"] = available;
            });

          const dbConnection = new db();

          dbConnection.lastEntry(function (result) {
            const last_entry = result[0];

            if (a.title !== last_entry.title) {
              console.log("update database");
              // dbConnection.insertIntoBlog(latest_entries.slice(0, 1));
              console.log("Inserted new entries");
              console.log(a.title);
              sendToChannel(a.title);
            } else {
              console.log("No update necessary");
            }
            dbConnection.close();
          });
        });
      });
    }
  });
};

module.exports = fetchBlogs;
