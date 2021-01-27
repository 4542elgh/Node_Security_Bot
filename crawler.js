const request = require("request");
const cheerio = require("cheerio");
const db = require("./db.js");
const { DiscordAPIError, MessageEmbed } = require("discord.js");

// Export as function
const fetchBlogs = (sendToChannel) => {
  request("https://nodejs.org/en/blog", (err, res, html) => {
    if (!err && res.statusCode == 200) {
      const $ = cheerio.load(html);
      let announcements = [];

      $("ul.blog-index")
        .children()
        .each(function (i, element) {
          const announced = $($(this).children()[0]).text();
          const entry = $($(this).children()[1]);
          const title = entry.text();
          let description = {};

          $($(this).children()[2])
            .children()
            // This remove the "Read more..." button which appear on every blog entry
            .slice(0, -1)
            .each(function () {
              // This is for plain text of the description object
              if (description["plaintext"] == undefined) {
                description["plaintext"] = [];
              }
              let plaintext = $(this)
                .contents()
                .filter(function () {
                  return this.type === "text";
                })
                .text();

              if (
                plaintext.includes("undefined") ||
                plaintext.includes("\n") ||
                plaintext == "" ||
                plaintext == undefined
              ) {
              } else {
                description["plaintext"].push(plaintext);
              }

              // Stores all text within post excluding first line and title
              let bullets = $(this).contents()
              .text()
              .split(/[\r\n]+/).filter(words => words !== '')

              console.log(bullets)

              // TODO parse strings to prepare them for message object
              
              // ----------------------------------------
              // THIS IS THE OLD PARSER
              // ----------------------------------------
              // // This determine if there are nested list
              // const is_nested = $(this).children().length > 0 ? true : false;

              // // Iterate through list if it exists
              // if (is_nested) {
              //   let outerMostCounter = 0;
              //   // Iterate through list and append text to description
              //   $($(this).children()).each(function () {
              //     const is_double_nested =
              //       $(this).children().length > 0 ? true : false;

              //     if (is_double_nested) {
              //       let outerCounter = 0;
              //       // is_double_nested = for 1 level bullet points in /en/blog/
              //       $($(this).children()).each(function () {
              //         const is_triple_nested =
              //           $(this).children().length > 0 ? true : false;

              //         if (is_triple_nested) {
              //           // is_triple_nested = for 2 level bullet points in /en/blog/
              //           $($(this).children()).each(function () {
              //             // // This is in charge of double bullet
              //             // This is used for naming description keys
              //             // let parentEle = $(this).parent().parent().text().split("\n")[0]
              //             // Format based on 'Vulnerabilities fixed', there are two formats even though they are both 2 level bullets
              //             // if (description[title] == null) {
              //             //   if (
              //             //     $(this)
              //             //       .parent()
              //             //       .parent()
              //             //       .parent()
              //             //       .parent()
              //             //       .parent()
              //             //       .text()
              //             //       .includes("Vulnerabilities fixed:")
              //             //   ) {
              //             //     description[title] = [];
              //             //   } else {
              //             //     description[title] = [$(this).text()];
              //             //   }
              //             // } else {
              //             //   description[title].push($(this).text());
              //             // }
              //           });
              //         } else {
              //           // // this is in charge of single bullet
              //           // if (description[title] == null) {
              //           //   description[title] = [];
              //           // } else {
              //           //   description[title].push(
              //           //     $(this).parent().text().trim()
              //           //   );
              //           // }
              //         }
              //       });
              //     }
              //   });
              // } else {
              //   // // else statement for if (nested)
              //   // let text = $(this).text().trim().replace(/\s\s+/g, " ");
              //   // if (!text.includes("Read more")) {
              //   //   if (description[title] == null) {
              //   //     description[title] = [text];
              //   //   } else {
              //   //     description[title].push(text);
              //   //   }
              //   // }
              // }
              // ----------------------------------------
              // THIS IS THE OLD PARSER END
              // ----------------------------------------
            });

          // console.log(description);

          announcements.push({
            announced: announced,
            title: title,
            link: `https://nodejs.org${entry.attr("href")}`,
            description: description,
          });
        });

      announcements = announcements.slice(0, 2);

      announcements.forEach((a) => {
        request(a.link, (err, res, page) => {
          const c = cheerio.load(page);

          // This loop is ok to be synchronized, code after this block will still run as expected
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
              a["author"] = blog_author;
              a["subtitle"] = blog_subtitle;
              a["available"] = available;
            });

          const dbConnection = new db();

          // This is a callback, you cannot do something after this function and rely on values inside async function. It will be undefined
          dbConnection.lastEntry(function (result) {
            const last_entry = result[0];
            if (a.title !== last_entry.title) {
              // console.log("update database");
              // dbConnection.insertIntoBlog(latest_entries.slice(0, 1));
              // const msg = new MessageEmbed()
              //   .setTitle(a.title.trim())
              //   .setURL(a.link.trim())
              //   .setAuthor(a.author.trim())
              //   .addField(a.subtitle.trim(), a.description.trim(), false)
              //   .setTimestamp(new Date())
              //   .setFooter("Brought to you by node.js version bot");
              // sendToChannel(msg);
            } else {
              // console.log("No update necessary");
              sendToChannel(`No new announcements available`);
            }
            dbConnection.close();
          });
        });
      });
    }
  });
};

// function yellow(s){
//   const tilde = '```'
//   return `**${tilde}fix\n${s}\n${tilde}**`
// }

module.exports = fetchBlogs;
