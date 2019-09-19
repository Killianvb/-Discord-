const discord = require("discord.js");
 
module.exports.run = async (bot, message, args) => {
 
    // Id van category van tickets.
    const categoryId = "610070471328923688";

    
    // Als bericht in ticket kanaal is dan verwijder kanaal ander zend bericht
    if (message.channel.parentID == categoryId) {
        var embedCloseTicket = new discord.RichEmbed()
        .setTitle(message.channel.name)
        .setDescription("Je bestelling is gemarkeerd als **compleet**. Dit kanaal verwijdert zich na 10 seconden.")
        .setColor("#ff5900")
        .setFooter("Ticket gesloten");
    
        message.channel.send(embedCloseTicket)
        function myFunction() {
            message.channel.delete();
        }
        
        // stop for sometime if needed
        setTimeout(myFunction, 10000);
        
 
    } else {
 
        message.channel.send("Gelieve dit commando in een bestelling te doen.");
 
    }
 
    
 
    // Vind kanaal voor de logs.
    var logChannel = message.guild.channels.find("name", "🔌logs");
    if (!logChannel) return message.channel.send("Kanaal bestaat niet");
 
    var logEmbed = new discord.RichEmbed()
    .setTitle("Bestelling")
    .addField("Gemaakt door: ", ticketUser)
    .addField("Gesloten door: ", message.author)
    .addField("Kanaal: ", channel )
    .setColor("#ff5900")
    .setFooter("Bestelling Compleet");

    logChannel.send(logEmbed);
 
}
 
module.exports.help = {
    name: "bestelClose",
    description: "Sluit een ticket af"
}