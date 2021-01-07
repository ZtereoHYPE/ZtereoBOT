const fs = require('fs');
const Discord = require('discord.js');
const database = require('../database.json');
const https = require('https');
module.exports = {
	name: 'funfact',
	description: 'Entirely factual information.',
	execute(message) {
		const {
			commands
		} = message.client;
		https.get('https://api.chucknorris.io/jokes/random', (resp) => {
			let data = '';

			resp.on('data', (chunk) => {
				data += chunk;
			});

			resp.on('end', () => {

				const embed = new Discord.MessageEmbed()
					.setColor('#00cc00')
					.setTitle('Fun Fact:')
					.setDescription(JSON.parse(data).value)
					.setFooter('It\'s true!')
					.setTimestamp()
				let i;
				for (i = 0; i < commands.map(command => command.name).length; i++) {
					embed.addField(`${database[`${message.guild.id}`]["prefix"]}${commands.map(command => command.name)[i]}`, commands.map(command => command.description)[i]);
				};
				message.channel.send(embed);
			});

		}).on("error", (err) => {
			const embed = new Discord.MessageEmbed()
				.setColor('#00cc00')
				.setTitle('Fun Fact:')
				.setDescription('There an an error retrieving the data!')
				.setFooter('It\s true!')
				.setTimestamp()
			let i;
			for (i = 0; i < commands.map(command => command.name).length; i++) {
				embed.addField(`${database[`${message.guild.id}`]["prefix"]}${commands.map(command => command.name)[i]}`, commands.map(command => command.description)[i]);
			};
			message.channel.send(embed);
		});
	});

},
};
