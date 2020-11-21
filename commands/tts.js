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

        // TODO: guild owner can disable tts in that server

        // if (args[0] == disable && message.guild.member(message.author) === message.guild.ownerID) {
            
        // } else if (args[0] == enable && message.guild.member(message.author) === message.guild.ownerID) {

        // }



        message.reply('tts is currently disabled, until I find a better solution to moderate it.')


        // message.channel.send(`${args.join(' ')}`,{
        //     tts: true
        // });
        // setTimeout()
	},
};