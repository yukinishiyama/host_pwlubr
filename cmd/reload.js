exports.run = (bot, msg, params) => {
  let command;
  if (bot.commands.has(params[0])) {
    command = params[0];
  } else if (bot.aliases.has(params[0])) {
    command = bot.aliases.get(params[0]);
  }
  if (!command) {
    return msg.channel.sendMessage(`Não consigo encontrar o comando: ${params[0]}`);
  } else {
    msg.channel.sendMessage(`Recarregando comando: ${command}`)
    .then(m => {
      bot.reload(command)
      .then(() => {
        m.edit(`Comando recarregado com sucesso: ${command}`);
      })
      .catch(e => {
        m.edit(`Falha ao recarregar comando: ${command}\n\`\`\`${e.stack}\`\`\``);
      });
    });
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["reload"],
  permLevel: 3
};

exports.help = {
  name: "reload",
  description: "Reloads the command file, if it's been updated or modified.",
  usage: "reload [COMMAND]"
};
