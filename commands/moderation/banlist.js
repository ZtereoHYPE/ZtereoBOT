const fs = require('fs');
const Discord = require('discord.js');
const { captureRejectionSymbol } = require('events');
module.exports = {
    name: 'banlist',
    category: 'moderation',
    description: 'Lists all the banned players of the server',
    execute(message, args, client, database) {
        // Help command
        if (args[0] == 'help') {
            const embed = new Discord.MessageEmbed()
                .setColor('#8EB9FE')
                .setAuthor('Banlist Command Help:', 'https://i.imgur.com/dSTYnIF.png')
                .addFields(
                    { name: `${database[message.guild.id]["prefix"]}banlist`, value: `Shows the list of banned players in the guild.` },
                )
            message.channel.send(embed);
            return;
        }

        // Fetch all bans in the guild then...
        message.guild.fetchBans().then(bans => {
            // If there are none, abort
            if (bans.size == 0) {
                message.channel.send("There are no banned users in this server.");
                return;
            }

            // Create an embed...
            const embed = new Discord.MessageEmbed()
                .setColor('#00cc00')
                .setTitle('Banned Users List:')

            // Iterate over the bans adding them to the embed
            for (ban of bans) {
                embed.addField(`${ban[1]['user']['username']}`, `**ID:** ${ban[0]} \n **Reason:** ${ban[1]['reason']}`);
            };

            // Send the embed
            message.channel.send(embed);
        })
    },
};