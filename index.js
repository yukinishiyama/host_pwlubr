const Discord = require("discord.js");
const bot     = new Discord.Client({fetchAllMembers: true});
const fs      = require("fs");
const moment  = require("moment");

var settings  = './settingsConfig/settings.json';
var file = require(settings)

var TOKEN = file.TOKEN;

const log = (msg) => {
  console.log(`[${moment().format("DD-MM-YYYY HH:mm:ss")}] ${msg}`);
};

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
fs.readdir("./cmd/", (err, files) => {
  if (err) console.error(err);
  log(`Carregando todo os ${files.length} comandos.`);
  files.forEach(f => {
    let props = require(`./cmd/${f}`);
    log(`Comandos carregados: ${props.help.name}`);
    bot.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      bot.aliases.set(alias, props.help.name);
    });
  });
});

bot.on("guildMemberAdd", function(member) {
  member.addRole(member.guild.roles.find("name", "Members")).then(() => {
  })
});

bot.on("message", msg => {

  var prefix = (file.prefix[msg.guild.id] === undefined) ? file.prefix["default"] : file.prefix[msg.guild.id];

  if (msg.author.bot) return;
  if (!msg.content.startsWith(prefix)) return;
  if (msg.channel.type === "dm") return;

  let command = msg.content.split(" ")[0].slice(prefix.length);
  let params = msg.content.split(" ").slice(1);
  let perms = bot.elevation(msg);
  let cmd;

  if (bot.commands.has(command)) {
    cmd = bot.commands.get(command);
  } else if (bot.aliases.has(command)) {
    cmd = bot.commands.get(bot.aliases.get(command));
  }
  if (cmd) {
    if (perms < cmd.conf.permLevel) return msg.channel.send(msg.author.toString() + " ops, parece que você não possuí permissão para utilizar esse comando. :(");
    cmd.run(bot, msg, params, perms, prefix);
    
  }
});

bot.on("ready", () => {
  log(`Iniciado no servidor com ${bot.users.size} usuários, em ${bot.channels.size} canais de ${bot.guilds.size} servidor.`);
  bot.user.setActivity(`Perfect World`);

  //Modo streamer ativado
  //setActivity("Teste Stream", {
    //type: "STREAMING",
    //url: "https://www.twitch.tv/lumaliana"
  //});

});


bot.on("error", console.error);
bot.on("warn", console.warn);

bot.login(TOKEN);

bot.on('disconnect', function(erMsg, code) {
  console.log('----- Sistema desconectado,', code, 'motivo:', erMsg, '-----');

  answered = true;
  cAnswer = "";
  userAnswer = "";

  bot.connect(TOKEN);
});

bot.reload = function (command) {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./cmd/${command}`)];
      let cmd = require(`./cmd/${command}`);
      bot.commands.delete(command);
      bot.aliases.forEach((cmd, alias) => {
        if (cmd === command) bot.aliases.delete(alias);
      });

      bot.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        bot.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};


bot.elevation = function (msg) {
  /* This function should resolve to an ELEVATION level which
     is then sent to the command handler for verification
     
     roles => roles.names === "Moderador"

     */

  let permlvl = 0;

  let mod_role = msg.guild.roles.find(role => role.name === "Moderador");
  if (mod_role && msg.member.roles.has(mod_role.id)) permlvl = 2;

  let admin_role = msg.guild.roles.find(role => role.name === "ADM");
  if (admin_role && msg.member.roles.has(admin_role.id)) permlvl = 3;

  if (msg.author.id === "103509994074312704") permlvl = 4;
 
  
  return permlvl;
};
