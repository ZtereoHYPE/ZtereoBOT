const fs = require('fs');
const Discord = require('discord.js');
module.exports = {
    name: 'ban',
    category: path.dirname(__filename).split(path.sep).pop(),
    description: 'Bans a player from the guild.',
    execute(message, args, client, database) {
        // Help command
        if (!args.length || args[0] == 'help') {
            const embed = new Discord.MessageEmbed()
                .setColor('#8EB9FE')
                .setAuthor('Ban Command Help:', 'https://i.imgur.com/dSTYnIF.png')
                .addFields(
                    { name: `${database[`${message.guild.id}`]["prefix"]}ban [@member] [reason] <days of msgs to delete (0-7)>`, value: `Bans a player from the server` },
                )
                .setFooter('Ban Member perms required', 'https://i.imgur.com/Z9gjIx1.png')
            message.channel.send(embed);
            return;
        }
        
        if (!(message.guild.member(message.author).hasPermission('BAN_MEMBERS') || message.guild.member(message.author).id == message.guild.ownerID)) {
            message.reply("you don\'t have the permission to do that (Ban Members perms).");
            return;
        }

        if (!message.mentions.users.first()) {
            message.reply('please specify a user to ban.')
            return;
        };

        let User = message.guild.member(message.mentions.users.first())

        if (!User.bannable) {
            message.reply("I don't have enough permissions to ban that user! Please make sure my role is high enough, and that I have Ban Members permissions.")
            return;
        }

        let days = 0
        args.shift();

        let lastElement = args[args.length - 1]

        if (/[0-9]/.test(lastElement)) {
            if (parseInt(lastElement) < 9 && parseInt(lastElement) > -1) {
                days = parseInt(lastElement)
            } else {
                message.reply(`${parseInt(lastElement)} is not a valid number of days of messages to remove.`)
                return;
            }
        }

        if (args.length == 0) args = ['Not', 'specified'];
        
        try {
            User.ban({
                days: days,
                reason: args.join(' ')
            })
        } catch {
            message.reply(error)
        }

        message.reply(`you banned ${User.user.username} for reason: ${args.join(' ')}`);
    },
};