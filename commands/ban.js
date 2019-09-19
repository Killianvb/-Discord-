const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {


        var banUser = message.guild.member(message.mentions.users.first() || message.guild.members(arguments[0]));

        if (!banUser) return message.channel.send("Deze gebruiker bestaat niet/zit niet in de server")

        var reason = arguments.join(" ").slice(22);

        if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Sorry, maar jij hebt de permissies niet om dit te doen!");

        if (banUser.hasPermission("BAN_MEMBERS")) return message.channel.send("Je kan geen mensen bannen met dezelfde permissies als jij!")

        var ban = new discord.RichEmbed()
            .setTitle("**Ban**")
            .setColor("#ff5900")
            .addField("Banned Gebruiker", banUser)
            .addField("Gebanned door", message.author)
            .addField("Reden", reason);

        var banChannel = message.guild.channels.find("name", "🔌logs");

        if (!banChannel) return message.guild.send("Je moet nog een #🔌logs kanaal aanmaken!");

        message.guild.member(banUser).ban(reason);

        banChannel.send(ban);

        return;


};

module.exports.help = {
    name: "ban"
}