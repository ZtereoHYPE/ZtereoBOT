const owoify = require('owoify-js').default
const Discord = require('discord.js');
const database = require('../database.json');
module.exports = {
	name: 'owo',
    description: 'owoifies a message',
    args: true,
	execute(message, args) {

        // Help command
        if (!args.length || args[0] == 'help') {
            const embed = new Discord.MessageEmbed()
            .setColor('#00cc00')
            .setTitle('OwO Command Help:')
            .addFields(
                { name: `${database[`${message.guild.id}`]["prefix"]}owo [message to owoify]`, value: 'OwOifies a message.'},
            )
            message.channel.send(embed);
            return;
          } else {
			  message.channel.send(owoify(args, 'owo'));
		  }
	},
};
