const path = require('path')
const { MessageEmbed } = require('discord.js');
module.exports = {
	name: 'help',
	category: path.dirname(__filename).split(path.sep).pop(),
	description: 'List all of my commands or info about a specific command.',
	execute(message, args, database, shortcuts) {
		// let commands be the client's commnads
		const { commands } = message.client;

		let embedArray = [];
		let commandsArray = commands.map(command => command)
		let categoryArray = commands.map(command => command.category).filter((value, index, array) => array.indexOf(value) === index);
		for (var i = 0; i < categoryArray.length; ++i) {
			embedArray[i] = new MessageEmbed()
				.setColor('#8EB9FE')
				.setAuthor(categoryArray[i], 'https://i.imgur.com/dSTYnIF.png')
			for (correctCommand of commandsArray.filter(value => value.category == categoryArray[i])) {
				embedArray[i].addField(`${database[`${message.guild.id}`]["prefix"]}${correctCommand.name + ':'}`, correctCommand.description)
			}
		}

		message.react('👍');

		function sendHelpCategories(int) {
			if (int >= embedArray.length) return;
			setTimeout(sendHelpCategories, 500, int + 1)
			message.author.send(embedArray[int]);
			int++;
		}

		sendHelpCategories(0)
	},
};