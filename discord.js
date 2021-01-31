const { Discord, MessageEmbed } = require("discord.js");
require("dotenv").config();

class discord {
  constructor() {
    this.client = new Discord.Client();
    this.client.login(`${process.env.D_TOKEN}`);
    this.client.on("ready", () => {
      console.log(`Logged in as ${client.user.tag}!`);
    });
  }

  sendToChannel(msg) {
    const outputMsg = new MessageEmbed()
      .setTitle(msg.title.trim())
      .setURL(msg.link.trim())
      .setAuthor(msg.author.trim())
      .addField(msg.subtitle.trim(), msg.description.trim(), false)
      .setTimestamp(new Date())
      .setFooter("Brought to you by node.js blog bot");

    client.channels.fetch(`${process.env.CHANNEL_ID}`).then((channel) => {
      channel.send(outputMsg);
    });
  }
}

module.exports = discord;
