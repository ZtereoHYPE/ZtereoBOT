const fs = require('fs');
const Discord = require('discord.js');
const database = require('../database.json');
module.exports = {
	name: 'warnhistory',
	description: 'Shows a user\'s history of warnings.',
	execute(message, args) {
        // Help command
        if (!args.length || args[0] == 'help') {
            const embed = new Discord.MessageEmbed()
            .setColor('#00cc00')
            .setTitle('Command Help:')
            .addFields(
                { name: `${database[`${message.guild.id}`]["prefix"]}warnhistory [@member]`, value: `Shows a user\'s history of warnings.` },
            )
            message.channel.send(embed);
            return;
        }

        let User = message.guild.member(message.mentions.users.first())
        if (message.guild.member(message.author).hasPermission('KICK_MEMBERS')|| message.guild.member === message.guild.ownerID) {

            if (!message.mentions.users.first()) {
                message.reply('please specify a user to warn.')
                return;
            };

            if (!database[`${message.guild.id}`]['warnings'].hasOwnProperty(`${User.id}`)) {
                message.channel.send("That user has no warnings in this server.");
                return;
            }

            const embed = new Discord.MessageEmbed()
            .setColor('#00cc00')
			.setTitle(`${database[message.guild.id]['warnings'][`${User.id}`]['username']}'s warnings:`)
		    let i;
		    for (i = 0; i < Object.keys(database[message.guild.id]['warnings'][`${User.id}`]['warns']).length; i++) {
			    embed.addField(`${Object.keys(database[message.guild.id]['warnings'][`${User.id}`]['warns'])[i]}.`, `**Reason:** ${database[message.guild.id]['warnings'][`${User.id}`]['warns'][Object.keys(database[message.guild.id]['warnings'][`${User.id}`]['warns'])[i]]['reason']} \n **Date:** ${database[message.guild.id]['warnings'][`${User.id}`]['warns'][Object.keys(database[message.guild.id]['warnings'][`${User.id}`]['warns'])[i]]['date']}`);
		    };
		    message.channel.send(embed);
        
        } else {
            message.reply("you don\'t have the permission to do that (Kick Members perms).");
        };
	},
};