const Discord = require('discord.js');
const path = require('path')
module.exports = {
    name: 'warnhistory',
    category: path.dirname(__filename).split(path.sep).pop(),
    description: 'Shows a user\'s history of warnings.',
    execute(message, args, database, shortcuts) {
        // Help command
        if (!args.length || args[0] == 'help') {
            shortcuts.functions.helpCommand(message, 'warnhistory', '[@member]', 'Shows a user\'s history of warnings.', database[`${message.guild.id}`]["prefix"]);
            return;
        }

        // if author has no perms say it and cancel
        if (!(message.guild.member(message.author).hasPermission('KICK_MEMBERS') || message.guild.member(message.author).id == message.guild.ownerID)) {
            shortcuts.functions.quickEmbed(message, "you don\'t have the permission to do that (Kick Members perms).", 'failure')
            return;
        }

        // if no users are mentioned say it and cancel
        if (!message.mentions.users.first()) {
            shortcuts.functions.quickEmbed(message, 'please specify a user to warn.', 'failure')
            return;
        };

        // let user be the first mention
        let User = message.guild.member(message.mentions.users.first())

        // if the user has not warnings say id and cancel
        if (!database[message.guild.id]['warnings'].hasOwnProperty(User.id)) {
            shortcuts.functions.quickEmbed(message, "That user has no warnings in this server.", 'success')
            return;
        };

        // make an embed with all of the warnings
        const embed = new Discord.MessageEmbed()
            .setColor('#800000')
            .setTitle(`${database[message.guild.id]['warnings'][User.id]['username']}'s warnings:`)
        let i;
        for (i = 0; i < database[message.guild.id]['warnings'][User.id]['warns'].length; i++) {
            embed.addField(`${i + 1}.`, `**Reason:** ${database[message.guild.id]['warnings'][User.id]['warns'][i]['reason']} \n **Date:** ${database[message.guild.id]['warnings'][`${User.id}`]['warns'][i]['date']}`);
        };

        // send the embed
        message.channel.send(embed);
    },
};