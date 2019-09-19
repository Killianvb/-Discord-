const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {


    var kickUser = message.guild.member(message.mentions.users.first() || message.guild.members(arguments[0]));

    if (!kickUser) return message.channel.send("Deze gebruiker bestaat niet/zit niet in de server")

    var reason = arguments.join(" ").slice(22);

    if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Sorry, maar jij hebt de permissies niet om dit te doen!");

    if (kickUser.hasPermission("KICK_MEMBERS")) return message.channel.send("Je kan geen mensen kicken met dezelfde permissies als jij!")

    var kick = new discord.RichEmbed()
        .setTitle("**Kick**")
        .setColor("#ff5900")
        .addField("Kicked Gebruiker", kickUser)
        .addField("Gekicked door", message.author)
        .addField("Reden", reason);

    var kickChannel = message.guild.channels.find("name", "🔌logs");

    if (!kickChannel) return message.guild.send("Je moet nog een #🔌logs kanaal aanmaken!");

    message.guild.member(kickUser).kick(reason);

    kickChannel.send(kick);

    return;



};

module.exports.help = {
    name: "kick"
}