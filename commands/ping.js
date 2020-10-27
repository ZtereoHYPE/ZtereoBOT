const Discord = require('discord.js');
module.exports = {
	name: 'ping',
	description: 'Ping!',
	args: true,
	execute(message, args) {
		// Check if the argument is help
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

		//replies pong
		message.channel.send('Pong.');
	},
};