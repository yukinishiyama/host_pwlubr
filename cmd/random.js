const Discord = module.require('discord.js')
//const talkedRecently = new Set();

exports.run = (bot, msg, params) => {

var Responses = [
  " Desculpe, você não conseguiu nenhum item. :(",
  " Desculpe, você não conseguiu nenhum item. :(",
  " Desculpe, você não conseguiu nenhum item. :(",
  " Desculpe, você não conseguiu nenhum item. :(",
  " Desculpe, você não conseguiu nenhum item. :(",
  " Desculpe, você não conseguiu nenhum item. :(",
  " Desculpe, você não conseguiu nenhum item. :(",
  " Desculpe, você não conseguiu nenhum item. :(",
  " Desculpe, você não conseguiu nenhum item. :(",
  " Desculpe, você não conseguiu nenhum item. :(",
  " Desculpe, você não conseguiu nenhum item. :(",
  " Desculpe, você não conseguiu nenhum item. :(",
  " Desculpe, você não conseguiu nenhum item. :(",
  " Desculpe, você não conseguiu nenhum item. :(",
  " Desculpe, você não conseguiu nenhum item. :(",
  " Parabéns, você conquistou um **ITEM RARO** no baú! Contate um moderador para mais informações.",
  " Parabéns, você conquistou um **ITEM RARO** no baú! Contate um moderador para mais informações."
];

exports.run = (bot, msg, params) => {

  //if (talkedRecently.has(msg.author.id))
  //return;

// Adds the user to the set so that they can't talk for 2.5 seconds
//talkedRecently.add(msg.author.id);
//setTimeout(() => {
  // Removes the user from the set after 2.5 seconds
  //talkedRecently.delete(msg.author.id);
 //}, 1000 * 30);

  let memberInfo = msg.mentions.members.first();

  var DAD = new Discord.RichEmbed()
      .setTitle('[Evento] Ao abrir o baú você encontrou..')

      .setDescription(Responses[Math.floor(Math.random() * Responses.length)])
      .addField("Informações de Usuário ",
      "**Mensagem enviada de: **" + `${msg.author.username}` + "\n" +
      "**ID: **" + msg.author.id, true)
      .addField("Menção de Usuário", (msg.author.toString()), true)

      .setColor("#f8c300")
      .setThumbnail(msg.author.avatarURL)

      msg.channel.send(DAD);

};


};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 3

};

exports.help = {
  name: "random",
  description: "Use ! + loot",
  usage: ""
};
