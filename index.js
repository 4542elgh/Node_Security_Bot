// Supply your own discord bot token in dotenv
const CronJob = require("cron").CronJob;
const fetchBlog = require("./crawler.js");
const discord = require("./discord.js");
const parser = require("./parser.js");

const frequency = "*/10 * * * * *";

const discordObj = new discord();
// Schedule the cron job
// var job = new CronJob(
//   // Every hour "0 * * * *"
//   // Below is every 10 min
//   frequency,
//   function () {
fetchBlog(discordObj.sendToChannel);
const filteredAnnouncements = parser(announcements);

//   },

//   // Executing on complete
//   null,

//   // Start when application launch
//   true,
//   "America/Los_Angeles"
// );

// job.start();
