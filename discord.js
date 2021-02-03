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

  sendToChannel(msgArray) {
    const that = this;
    msgArray.forEach((msg) => {
      const outputMsg = new that.Discord.MessageEmbed()
        .setTitle(msg.title.trim())
        .setURL(msg.link.trim())
        .setAuthor(msg.author.trim())
        .setThumbnail("./img/nodejs-logo.png")
        // .addField(msg.subtitle.trim(), msg.description.trim(), false)
        .addField(msg.subtitle.trim())
        .setTimestamp(new Date())
        .setFooter("Brought to you by node.js blog bot");

      that.client.channels
        .fetch(`${process.env.CHANNEL_ID}`)
        .then((channel) => {
          console.log(channel);
          channel.send(outputMsg);
        });
    });
  }
}

module.exports = discord;
