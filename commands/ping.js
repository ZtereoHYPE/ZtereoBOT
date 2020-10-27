const Discord = require('discord.js');
module.exports = {
	name: 'ping',
	description: 'Ping!',
	args: true,
	execute(message, args) {
		if (args[0] == 'help') {
			const embed = new Discord.MessageEmbed()
			.setColor('#00cc00')
			.setTitle('Ping Command:')
			.addFields(
				{ name: '=ping', value: 'Try it ;)' },
			)
			message.channel.send(embed);
			return;
		  }
		message.channel.send('Pong.');
	},
};