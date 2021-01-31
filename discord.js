class discord {
  constructor() {
    require("dotenv").config();
    this.Discord = require("discord.js");

    this.client = new this.Discord.Client();
    this.client.login(`${process.env.D_TOKEN}`);
    this.client.on("ready", () => {
      console.log(`Logged in as ${this.client.user.tag}!`);
    });
  }

  sendToChannel(msg) {
    const outputMsg = new this.Discord.MessageEmbed()
      .setTitle(msg.title.trim())
      .setURL(msg.link.trim())
      .setAuthor(msg.author.trim())
      .addField(msg.subtitle.trim(), msg.description.trim(), false)
      .setTimestamp(new Date())
      .setFooter("Brought to you by node.js blog bot");

    this.client.channels.fetch(`${process.env.CHANNEL_ID}`).then((channel) => {
      channel.send(outputMsg);
    });
  }
}

module.exports = discord;
