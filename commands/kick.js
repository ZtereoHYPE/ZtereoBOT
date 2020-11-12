const Discord = require('discord.js');
const database = require('../database.json');
module.exports = {
	name: 'kick',
    description: 'Kicks a user.',
    args: true,
	execute(message, args) {
        // Help command
        if (!args.length || args[0] == 'help') {
            const embed = new Discord.MessageEmbed()
            .setColor('#00cc00')
            .setTitle('Kick Command Help:')
            .addFields(
                { name: `${database[`${message.guild.id}`]["prefix"]}kick [someone] [reason]`, value: `Kicks the person out of the server. **(Kick Members perms required)**` },
            )
            message.channel.send(embed);
            return;
        }
        
        // Gathers the first tagged user, kicks it, shift the arguments to exclude it, and sends confirmation message. If no perms are detected then reject command.
        if (message.guild.member(message.author).hasPermission('KICK_MEMBERS')|| message.guild.member === message.guild.ownerID) {
            let User = message.guild.member(message.mentions.users.first())
            if (User.hasPermission('KICK_MEMBERS') || User.id === message.guild.ownerID) {
                message.reply(`you can\'t kick a user with Kick Members perms.`);
            };
            args.shift();
            if (!args) args = 'Not specified'
            User.kick(args.join(' '));
            message.reply(`you kicked ${User.nickname} for reason: ${args.join(' ')}`);
        } else {
            message.reply("you don\'t have the permission to do that (Kick Members perms).");
        };
	},
};