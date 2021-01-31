const path = require('path')
const {MessageEmbed} = require('discord.js');
module.exports = {
	name: 'help',
	category: path.dirname(__filename).split(path.sep).pop(),
	description: 'List all of my commands or info about a specific command.',
	execute(message, args, database, shortcuts) {

		// make it react and then send in dms. too lazy rn to do it lol

		// let commands be the client's commnads
		const { commands } = message.client;

		// create an embed with command list
		const embed = new MessageEmbed()
			.setColor('#8EB9FE')
			.setAuthor('Command List:', 'https://i.imgur.com/dSTYnIF.png')
			.setDescription(`My prefix here is \`${database[message.guild.id]["prefix"]}\` \n **This message will self-destruct in 20 seconds!**`)
			.setFooter(`This message will self-destruct in 20s`)
		
		// iterate over each command of commands and add field to embed for it
		let i;
		for (i = 0; i < commands.map(command => command.name).length; i++) {
			embed.addField(`${database[`${message.guild.id}`]["prefix"]}${commands.map(command => command.name)[i]}`, `${commands.map(command => command.description)[i]}`);
		};

		// This looks much neater BUT it requires different pages as it hits the maximum amounts of fields that a bot can have. Sad, I know.

		//  let commandsArray = commands.map(command => command)
		// 	let categoryArray = commands.map(command => command.category).filter((value, index, array) => array.indexOf(value) === index);
		// 	for (categoryKind of categoryArray) {
		// 		embed.addField(`\u200B`, `**${categoryKind.toUpperCase()}:**`);
		// 		console.log(commandsArray.filter(value => value.category == 'utility'))
		// 		for (correctCommand of commandsArray.filter(value => value.category == categoryKind)) {
		// 			embed.addField(`${database[`${message.guild.id}`]["prefix"]}${correctCommand.name}`, correctCommand.description)
		// 		  }
		// 	 } 

		// send the embed then set a timeout to change it and finally delete it
		message.channel.send(embed)
			.then(newMessage => {
				newMessage.delete({ timeout: 20000 })
				embed.setFooter(`This message will self-destruct in 5s`)
				embed.setDescription(`My prefix here is \`${database[`${message.guild.id}`]["prefix"]}\` \n **This message will self-destruct in 5 seconds!**`)
				setTimeout(function () { newMessage.edit(embed) }, 15000)
			})
	},
};