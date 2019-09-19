const discord = require("discord.js");
 
module.exports.run = async (bot, message, args) => {
 
    // Id van category van tickets.
    const categoryId = "610070471328923688";
 
    var ticketUser = message.guild.member(message.mentions.users.first() || message.guild.member(arguments[0]));
    // Als bericht in ticket kanaal is dan verwijder kanaal ander zend bericht
    if (message.channel.parentID == categoryId) {
        if(args[0]) {
        var embedCloseTicket = new discord.RichEmbed()
        .setTitle(message.channel.name)
        .setDescription("Je ticket is gemarkeerd als **compleet**. Dit kanaal verwijdert zich na 10 seconden.")
        .setColor("#ff5900")
        .setFooter("Ticket gesloten");
        
        var channel = message.channel.name

        message.channel.send(embedCloseTicket)
        function myFunction() {
            message.channel.delete();
        }
        
        // stop for sometime if needed
        setTimeout(myFunction, 10000);

        var logChannel = message.guild.channels.find("name", "🔌logs");
    if (!logChannel) return message.channel.send("Kanaal bestaat niet");
 
    var logEmbed = new discord.RichEmbed()
    .setTitle("Ticket")
    .addField("Gemaakt door: ", ticketUser)
    .addField("Gesloten door: ", message.author)
    .addField("Kanaal: ", channel )
    .setColor("#ff5900")
    .setFooter("Ticket Compleet");

    logChannel.send(logEmbed);
    };

    if(!args[0]){
        message.channel.send("Je moet de maker van de ticket meegeven om deze ticket te beeïndigen.");
    };
    } else {
 
        message.channel.send("Gelieve dit commando in een ticket kanaal te doen.");
 
    }
 
    
}
module.exports.help = {
    name: "close",
    description: "Sluit een ticket af"
}