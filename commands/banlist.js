const fs = require('fs');
const Discord = require('discord.js');
const database = require('../database.json');
module.exports = {
	name: 'banlist',
	description: 'Lists all the banned players of the server',
	execute(message, args) {
        // Help command
        if (args[0] == 'help') {
            const embed = new Discord.MessageEmbed()
            .setColor('#00cc00')
            .setTitle('Banlist Command Help:')
            .addFields(
                { name: `${database[`${message.guild.id}`]["prefix"]}banlist`, value: `Shows the list of banned players in the guild.` },
            )
            message.channel.send(embed);
            return;
        }

        if (Object.keys(database[message.guild.id]['bans']).length == '0') {
            message.channel.send("There are no banned users in this server.");
            return;
        }

        const embed = new Discord.MessageEmbed()
            .setColor('#00cc00')
			.setTitle('Banned Users List:')
		let i;
		for (i = 0; i < Object.keys(database[message.guild.id]['bans']).length; i++) {
			embed.addField(`${database[message.guild.id]['bans'][Object.keys(database[message.guild.id]['bans'])[i]]['username']}`, `**ID:** ${Object.keys(database[message.guild.id]['bans'])[i]} \n **Reason:** ${database[message.guild.id]['bans'][Object.keys(database[message.guild.id]['bans'])[i]]['reason']}`);
		};
		message.channel.send(embed);
	},
};