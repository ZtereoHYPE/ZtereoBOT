const { MessageEmbed } = require('discord.js');
const path = require('path')
module.exports = {
    name: 'ping',
    aliases: ['latency'],
    category: path.dirname(__filename).split(path.sep).pop(),
    description: 'Checks the ping (latency) of the bot',
    execute(message, args, database, shortcuts, client) {
        // Help command
        if (args[0] == 'help') {
            shortcuts.functions.helpCommand(message, 'ping', '', 'Gives us the bot and discord API\'s latency.', database[`${message.guild.id}`]["prefix"]);
            return;
        }

        // Send a message and then...
        message.channel.send("Pinging...").then(msg => {
            // Make a new embed with the information taken from that message
            const embed = new MessageEmbed()
                .setColor('#660066')
                .setAuthor('Latency', 'https://i.imgur.com/b04ffHd.png')
                .addFields(
                    { name: 'Bot latency:', value: `\`\`\`${msg.createdTimestamp - message.createdTimestamp}ms\`\`\``, inline: true },
                    { name: '\u200B', value: `\u200B`, inline: true },
                    { name: 'Discord API latency:', value: `\`\`\`${Math.round(client.ws.ping)}ms\`\`\``, inline: true }
                )

            // Delete that message and send the embed
            msg.delete();
            message.channel.send(embed);
        })
    },
};