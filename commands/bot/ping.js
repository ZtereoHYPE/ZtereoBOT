const Discord = require('discord.js');
module.exports = {
    name: 'ping',
    category: path.dirname(__filename).split(path.sep).pop(),
    description: 'Checks the ping (latency) of the bot',
    execute(message, args, client, database) {
        // Help command
        if (args[0] == 'help') {
            const embed = new Discord.MessageEmbed()
                .setColor('#8EB9FE')
                .setAuthor('Ping Command Help:', 'https://i.imgur.com/dSTYnIF.png')
                .addFields(
                    { name: `${database[`${message.guild.id}`]["prefix"]}ping`, value: `Gives us the bot and discord API's latency` },
                )
            message.channel.send(embed);
            return;
        }

        message.channel.send("Pinging...").then(msg => {
            const embed = new Discord.MessageEmbed()
                .setColor('#660066')
                .setAuthor('Latency', 'https://raw.githubusercontent.com/ZtereoHYPE/ZtereoBOT/v2/assets/images/ping.png')
                .addFields(
                    { name: 'Bot latency:', value: `\`\`\`${msg.createdTimestamp - message.createdTimestamp}ms\`\`\``, inline: true },
                    { name: '\u200B', value: `\u200B`, inline: true },
                    { name: 'Discord API latency:', value: `\`\`\`${Math.round(client.ws.ping)}ms\`\`\``, inline: true }
                )
            msg.delete()
            message.channel.send(embed);
        })
    },
};