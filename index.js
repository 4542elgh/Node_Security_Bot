// Supply your own discord bot token in dotenv
const crawler = require("./crawler.js");
const discord = require("./discord.js");
const scheduler = require("./scheduler.js");
const db = require("./db.js");
const util = require("./util.js");
const filterAnnouncements = require("./util.js");

const discordObj = new discord();

const main = async () => {
  const announcements = await crawler.fetchBlogs;
  const announcementWithAuthor = await crawler.fetchChildBlogs(announcements);
  // console.log(announcementWithAuthor);

  const DBObj = new db();

  const lastEntry = await DBObj.lastEntry();

  const announcementsMissing = util.filterAnnouncements(
    lastEntry,
    announcementWithAuthor
  );

  const dbReady = util.announcementDBInsert(announcementsMissing);

  if (announcementsMissing.length != 0) {
    // await DBObj.insertIntoBlogNew(dbReady);
    let discordDescription = util.formatDescription(announcementsMissing);
    discordObj.sendToChannel(
      announcementsMissing.slice(0, 1),
      discordDescription.slice(0, 1)
    );

    // console.log(discordDescription);
  }

  DBObj.close();
};

main();

// scheduler(main)
