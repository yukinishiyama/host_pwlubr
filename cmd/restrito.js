const Discord = require('discord.js')

exports.run = (bot, msg, params) => {
        if (msg.channel.id === '650333091310731306') {

  var DAD = new Discord.RichEmbed()
      .setDescription("Parabéns " + `${msg.author.toString()}` + ", você acaba de ganhar o **primeiro prêmio** do evento!")

      .setColor("0x#FF0000")

      msg.channel.send(DAD);
    }

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['restrito'],
  permLevel: 3
};

exports.help = {
  name: "restrito",
  description: "Get a random dad joke",
  usage: "restrito"
};
