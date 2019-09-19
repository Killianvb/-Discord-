const discord = require("discord.js");
const botConfig = require("./botconfig.json");

const fs = require("fs");

const bot = new discord.Client();
bot.commands = new discord.Collection();

const active = new Map();
 
var options = {
    active: active
}
 


fs.readdir("./commands/", (err, files) => {

    if (err) return console.log(err);

    var jsFiles = files.filter(f => f.split(".").pop());

    if (jsFiles.length <= 0) {

        console.log("Kon geen files vinden.");
        return;

    }

    jsFiles.forEach((f, i) => {

        var fileGet = require(`./commands/${f}`);
        console.log(`De file ${f} is geladen.`);

        bot.commands.set(fileGet.help.name, fileGet);
    })

});



bot.on("ready", async () => {

    console.log(`${bot.user.username} is online!`);
    bot.user.setActivity(`${bot.users.size} leden`, { type: "WATCHING" });

    var statuses = [
        "?bestel",
        "?help",
        `${bot.users.size} leden`,
        "NinjaDev | https://discord.gg/BdqPbB9"
    ];

    setInterval(function() {

        var status = statuses[Math.floor(Math.random() * statuses.length)];


        bot.user.setActivity(status, { type: "WATCHING" });
    });

});

bot.on("message", async message => {

    //Als bot een bericht stuurt, stuur dan return.
    if (message.author.bot) return;

    if (message.channel.type === "dm") return;

    var prefix = botConfig.prefix;

    var messageArray = message.content.split(" ");

    var command = messageArray[0];

    var arguments = messageArray.slice(1);

    var commands = bot.commands.get(command.slice(prefix.length));

    if (commands) commands.run(bot, message, arguments);
    if (commands) commands.run(bot, message, args, options);
    

    // if (command === `${prefix}hallo`) {

    //     return message.channel.send(`Hallo, ${message.author}!`);

    // };

    // if (command === `${prefix}info`) {

    //     var botIcon = bot.user.displayAvatarURL;

    //     var botEmbed = new discord.RichEmbed()
    //         .setTitle("**__Discord bot Info__**")
    //         .setColor("#ff5900")
    //         .setThumbnail(botIcon)
    //         .addField("Bot naam", bot.user.username)
    //         .addField("Gemaakt op", bot.user.createdAt);

    //     return message.channel.send(botEmbed);

    // };

    // if (command === `${prefix}serverinfo`) {

    //     var icon = message.guild.iconURL

    //     var serverEmbed = new discord.RichEmbed()
    //         .setTitle("**__Server Info__**")
    //         .setColor("#ff5900")
    //         .setThumbnail(icon)
    //         .addField("Server naam", message.guild.name)
    //         .addField("Je bent gejoind op", message.member.joinedAt)
    //         .addField("Totaal aantal members", message.guild.memberCount)
    //         .addField("Gemaakt op", message.guild.createdAt);




    //     return message.channel.send(serverEmbed);

    // };

    // if (command === `${prefix}kick`) {

    //     var kickUser = message.guild.member(message.mentions.users.first() || message.guild.members(arguments[0]));

    //     if (!kickUser) return message.channel.send("Deze gebruiker bestaat niet/zit niet in de server")

    //     var reason = arguments.join(" ").slice(22);

    //     if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Sorry, maar jij hebt de permissies niet om dit te doen!");

    //     if (kickUser.hasPermission("KICK_MEMBERS")) return message.channel.send("Je kan geen mensen kicken met dezelfde permissies als jij!")

    //     var kick = new discord.RichEmbed()
    //         .setTitle("**Kick**")
    //         .setColor("#ff5900")
    //         .addField("Kicked Gebruiker", kickUser)
    //         .addField("Gekicked door", message.author)
    //         .addField("Reden", reason);

    //     var kickChannel = message.guild.channels.find("name", "🔌logs");

    //     if (!kickChannel) return message.guild.send("Je moet nog een #🔌logs kanaal aanmaken!");

    //     message.guild.member(kickUser).kick(reason);

    //     kickChannel.send(kick);

    //     return;

    // };

    // if (command === `${prefix}ban`) {

    //     var banUser = message.guild.member(message.mentions.users.first() || message.guild.members(arguments[0]));

    //     if (!banUser) return message.channel.send("Deze gebruiker bestaat niet/zit niet in de server")

    //     var reason = arguments.join(" ").slice(22);

    //     if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Sorry, maar jij hebt de permissies niet om dit te doen!");

    //     if (banUser.hasPermission("BAN_MEMBERS")) return message.channel.send("Je kan geen mensen bannen met dezelfde permissies als jij!")

    //     var ban = new discord.RichEmbed()
    //         .setTitle("**Ban**")
    //         .setColor("#ff5900")
    //         .addField("Banned Gebruiker", banUser)
    //         .addField("Gebanned door", message.author)
    //         .addField("Reden", reason);

    //     var banChannel = message.guild.channels.find("name", "🔌logs");

    //     if (!banChannel) return message.guild.send("Je moet nog een #🔌logs kanaal aanmaken!");

    //     message.guild.member(banUser).ban(reason);

    //     banChannel.send(ban);

    //     return;

    // };

});

bot.login(botConfig.token);