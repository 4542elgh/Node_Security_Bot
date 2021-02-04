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

  sendToChannel(msgArray, description) {
    msgArray.forEach((msg) => {
      const outputMsg = new this.Discord.MessageEmbed()
        .setTitle(msg.title.trim())
        .setURL(msg.link.trim())
        .setDescription(
          description.flat().join("\n\n") +
            "\n\n" +
            "[more...](" +
            msg.link.trim() +
            ")"
        )
        .setAuthor(msg.author.trim())
        // .setThumbnail("./img/nodejs-logo.png")
        .setThumbnail(
          "https://firebearstudio.com/blog/wp-content/uploads/2015/10/Node-e1443953851722.png"
        )

        // .addField(msg.subtitle.trim(), msg.description.trim(), false)
        // .addField(msg.subtitle.trim(), ...description)
        .setTimestamp(new Date())
        .setFooter("Brought to you by node.js blog bot");

      this.client.channels
        .fetch(`${process.env.CHANNEL_ID}`)
        .then((channel) => {
          channel.send(outputMsg);
        });
    });
  }
}

module.exports = discord;
