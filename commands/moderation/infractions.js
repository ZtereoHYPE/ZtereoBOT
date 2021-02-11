const {MessageEmbed} = require('discord.js');
const path = require('path')
module.exports = {
    name: 'infractions',
    aliases: ['warnlist', 'warns', 'mutes', 'mutelist', 'mutehistory', 'warnhistory', 'kicks'],
    category: path.dirname(__filename).split(path.sep).pop(),
    description: 'Shows a user\'s history of infractions.',
    execute(message, args, database, shortcuts) {
        // Help command
        if (!args.length || args[0] == 'help') {
            shortcuts.functions.helpCommand(message, 'infrations', '[@member]', 'Shows a user\'s history of infractions.', database[`${message.guild.id}`]["prefix"]);
            return;
        }

        // if author has no perms say it and cancel
        if (!(message.guild.member(message.author).hasPermission('KICK_MEMBERS') || message.guild.member(message.author).id == message.guild.ownerID)) {
            shortcuts.functions.quickEmbed(message, "You don\'t have the permission to do that (Kick Members perms).", 'failure')
            return;
        }

        // if no users are mentioned say it and cancel
        if (!message.mentions.users.first()) {
            shortcuts.functions.quickEmbed(message, 'Please specify a user to list their infractions.', 'failure')
            return;
        };

        // let user be the first mention
        let User = message.guild.member(message.mentions.users.first())

        // if the user has not warnings say id and cancel
        if (!database[message.guild.id]['warnings'].hasOwnProperty(User.id)) {
            shortcuts.functions.quickEmbed(message, "That user has no infractions in this server.", 'success')
            return;
        };

        // make an embed with all of the warnings
        const embed = new MessageEmbed()
            .setColor('#800000')
            .setTitle(`${User.user.username}'s infractions:`)
        for (let i = 0; i < database[message.guild.id]['warnings'][User.id].length; i++) {
            embed.addField(`${database[message.guild.id]['warnings'][User.id][i]['type']}:`, `**Reason:** ${database[message.guild.id]['warnings'][User.id][i]['reason']} \n **Date:** ${database[message.guild.id]['warnings'][User.id][i]['date']} \n **ID:** ${i + 1}`);
        };

        // send the embed
        message.channel.send(embed);
    },
};