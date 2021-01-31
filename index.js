// Supply your own discord bot token in dotenv
const crawler = require("./crawler.js");
const discord = require("./discord.js");
const scheduler = require("./scheduler.js");
const db = require("./db.js");

const main = async () => {
  const announcements = await crawler.fetchBlogs;
  const announcementWithAuthor = await crawler.fetchChildBlogs(announcements);
  // console.log(announcementWithAuthor);

  const DBObj = new db();
  const lastEntry = await DBObj.lastEntry();

  let counter = -1;
  for (var i = 0; i < announcementWithAuthor.length; i++) {
    if (announcementWithAuthor.title == lastEntry[0].title) {
      counter = i;
      break;
    }
  }

  announcementWithAuthor.slice(0, counter);
};

main();

// scheduler(main)
