const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {


    var icon = message.guild.iconURL

    var serverEmbed = new discord.RichEmbed()
        .setTitle("**__Server Info__**")
        .setColor("#ff5900")
        .setThumbnail(icon)
        .addField("Server naam", message.guild.name)
        .addField("Je bent gejoind op", message.member.joinedAt)
        .addField("Totaal aantal members", message.guild.memberCount)
        .addField("Gemaakt op", message.guild.createdAt);




    return message.channel.send(serverEmbed);


};

module.exports.help = {
    name: "serverinfo"
}


