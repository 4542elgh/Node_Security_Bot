// Supply your own discord bot token in dotenv
require("dotenv").config();
const Discord = require("discord.js");
const client = new Discord.Client();
const CronJob = require("cron").CronJob;
const fetchBlog = require("./crawler.js");

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// Pass function to another class
const sendToChannel = (msg) => {
  client.channels.fetch(`${process.env.CHANNEL_ID}`).then((channel) => {
    channel.send(msg);
  });
};

// Login with your discord token
client.login(`${process.env.D_TOKEN}`);

// Schedule the cron job
var job = new CronJob(
  // Every hour "0 * * * *"
  // Below is every 10 min
  "*/10 * * * * *",
  function () {
    fetchBlog(sendToChannel);
  },

  // Executing on complete
  null,

  // Start when application launch
  true,
  "America/Los_Angeles"
);

job.start();
