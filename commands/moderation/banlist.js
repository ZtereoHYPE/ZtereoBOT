const path = require('path')
const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'banlist',
    category: path.dirname(__filename).split(path.sep).pop(),
    description: 'Lists all the banned players of the server',
    execute(message, args, database, shortcuts) {
        // Help command
        if (args[0] == 'help') {
            shortcuts.functions.helpCommand(message, 'banlist', '', 'Shows the list of banned players in the server.', database[`${message.guild.id}`]["prefix"]);
            return;
        }

        // Fetch all bans in the guild then...
        message.guild.fetchBans().then(bans => {
            // If there are none, abort
            if (bans.size == 0) {
                shortcuts.functions.quickEmbed(message, 'There are no banned users in this server.', 'failure')
                return;
            }

            // Create an embed...
            const embed = new MessageEmbed()
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