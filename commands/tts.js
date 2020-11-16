const fs = require('fs');
const Discord = require('discord.js');
const database = require('../database.json');
module.exports = {
	name: 'tts',
	description: 'Sends a Test To Speech Message',
	execute(message, args) {
        // Help command
        if (!args.length || args[0] == 'help') {
            const embed = new Discord.MessageEmbed()
            .setColor('#00cc00')
            .setTitle('Command Help:')
            .addFields(
                { name: `${database[`${message.guild.id}`]["prefix"]}tts [text]`, value: `Sends a Text To Speech message.` },
            )
            message.channel.send(embed);
            return;
        }

        message.channel.send(`${args.join(' ')}`,{
            tts: true
        });

	},
};