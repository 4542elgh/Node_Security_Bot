// // Supply your own discord bot token in dotenv
require("dotenv").config();
const Discord = require("discord.js");
const client = new Discord.Client();
const CronJob = require("cron").CronJob;
const fetchBlog = require("./crawler.js");

// const db = require("./db.js");

// const prefix = "!";

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  // console.log(client.channels)
});

const sendToChannel = (msg) => {
  client.channels.fetch(`${process.env.CHANNEL_ID}`).then((channel) => {
    channel.send(msg);
  });
};

// // When discord received a message
// client.on("message", (msg) => {
//   // Only reply when the message starts with prefix command
//   if (!message.content.startsWith(prefix)) return;

//   if (msg.content === prefix + "ping") {
//     msg.reply("Pong!");
//   }
// });

// // Login with your discord token
client.login(`${process.env.D_TOKEN}`);

// Schedule the cron job
var job = new CronJob(
  // Every hour "0 * * * *"
  // Below is every min
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
