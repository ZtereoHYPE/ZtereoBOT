const fs = require('fs');
const Discord = require('discord.js');
const database = require('../database.json');
module.exports = {
	name: 'help',
	description: 'List all of my commands or info about a specific command.',
	execute(message) {
        const { commands } = message.client;
		const embed = new Discord.MessageEmbed()
			.setColor('#8EB9FE')
			.setAuthor('Command List:', 'https://i.imgur.com/dSTYnIF.png')
			.setDescription(`My prefix here is \`${database[`${message.guild.id}`]["prefix"]}\``)
			.setFooter(`PS: to have more information about a command, use the command with no arguments.`)
		let i;
		for (i = 0; i < commands.map(command => command.name).length; i++) {
			embed.addField(`${database[`${message.guild.id}`]["prefix"]}${commands.map(command => command.name)[i]}`, commands.map(command => command.description)[i]);
		};
		message.channel.send(embed);
	},
};