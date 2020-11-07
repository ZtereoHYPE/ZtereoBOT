const owoify = require('owoify-js').default
const Discord = require('discord.js');
const database = require('../database.json');
module.exports = {
	name: 'owo',
    description: 'Owoifies a message.',
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
          }

        // Owoify the arguments of the message, made into a string
        let owo
        switch (Math.ceil(Math.random()*3)) {
            case 1:
                owo = 'owo'
                break;
            case 2:
                owo = 'uwu'
                break;
            case 3:
                owo = 'uvu'
        }
		message.channel.send(owoify(args.join(' '), owo));
	},
};
