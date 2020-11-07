const fs = require('fs');
const Discord = require('discord.js');
const database = require('../database.json');
module.exports = {
	name: 'help',
	description: 'List all of my commands or info about a specific command.',
	cooldown: 5,
	execute(message, args) {
        const { commands } = message.client;
		const embed = new Discord.MessageEmbed()
            .setColor('#00cc00')
			.setTitle('Commmand List:')
		let i;
		for (i = 0; i < commands.map(command => command.name).length; i++) {
			embed.addField(`${database[`${message.guild.id}`]["prefix"]}${commands.map(command => command.name)[i]}`, commands.map(command => command.description)[i]);
		};
		message.channel.send(embed);
	},
};