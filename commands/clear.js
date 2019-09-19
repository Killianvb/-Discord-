const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermissions("MANAGE_MESSAGES")) return message.reply("Je hebt geen toestemming!");

    if(!args[0]) return message.reply("Geef een aantal op.");

    if(Number.isInteger(parseInt(args[0]))) {

        var amount = parseInt(args[0]) + 1;

        message.channel.bulkDelete(amount).then(() => {


            message.channel.send(`Je hebt ${amount - 1} bericht(en) verwijderd.`).then(msg => msg.delete(3000));


         });

    }else{

        return message.reply("Je moet een getal opgeven.");

    }

};

module.exports.help = {
    name: "clear"
}