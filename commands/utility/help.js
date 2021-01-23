const path = require('path')
const Discord = require('discord.js');
module.exports = {
	name: 'help',
	category: path.dirname(__filename).split(path.sep).pop(),
	description: 'List all of my commands or info about a specific command.',
	execute(message, args, client, database, shortcuts) {
        const { commands } = message.client;
		const embed = new Discord.MessageEmbed()
			.setColor('#8EB9FE')
			.setAuthor('Command List:', 'https://i.imgur.com/dSTYnIF.png')
			.setDescription(`My prefix here is \`${database[`${message.guild.id}`]["prefix"]}\``)
			.setFooter(`This message will self-destruct in 20s`)
		let i;
		for (i = 0; i < commands.map(command => command.name).length; i++) {
			embed.addField(`${database[`${message.guild.id}`]["prefix"]}${commands.map(command => command.name)[i]}`, commands.map(command => command.description)[i]);
		};
		message.channel.send(embed).then(newMessage => {
			newMessage.delete({timeout: 20000})
			embed.setFooter(`This message will self-destruct in 5s`)
			setTimeout(function() {newMessage.edit(embed)}, 15000)
		})
	},
};