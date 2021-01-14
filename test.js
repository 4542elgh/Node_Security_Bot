// // Supply your own discord bot token in dotenv
require("dotenv").config();
const Discord = require("discord.js");
const client = new Discord.Client();
// const CronJob = require("cron").CronJob;

// const db = require("./db.js");

// const prefix = "!";

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  // console.log(client.channels)
  client.channels.fetch(`${process.env.CHANNEL_ID}`).then(channel => {
    // console.log(channel.name)
    channel.send('Hello from nodeJS!')
    channel.send(`This took me forever to figure out! <('.')>`)
  })
});

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

// // Schedule the cron job
// var job = new CronJob(
//   // Every hour "0 * * * *"
//   // Below is every min
//   "* * * * * *",
//   function () {
//     console.log("Cron Job is working");
//   },
//   // Executing on complete
//   null,
//   // Start when application launch
//   true,
//   "America/Los_Angeles"
// );

// job.start();

// const dbConnection = new db();
// Create database scheme with these 2 lines

// dbConnection.createDatabase();
// dbConnection.insertIntoBlog([
//   {
//     announced_date: "1",
//     title: "1",
//     link: "1",
//     description: "1",
//     path: "1"
//     author: "1",
//     subtitle: "1",
//     available: "1"
//   },
// ]);

// Get output using this line
// dbConnection.showBlog(function (result) {
//   console.log(result);
// });

// Closing db connection
// dbConnection.close();
