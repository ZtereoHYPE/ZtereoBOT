const fs = require('fs');
const Discord = require('discord.js');
const database = require('../database.json');
const { isBuffer } = require('util');
module.exports = {
	name: 'tts',
	description: 'Sends a Test To Speech Message',
	execute(message, args) {
        
        if (database[`${message.guild.id}`]["enable"].includes('tts')) {
            commandStatus = 'enabled'
        } else {
            commandStatus = 'disabled'
        }

        // Help command
        if (!args.length || args[0] == 'help') {
            const embed = new Discord.MessageEmbed()
            .setColor('#8EB9FE')
            .setAuthor('TTS Command Help:', 'https://i.imgur.com/dSTYnIF.png')
            .addFields(
                { name: `${database[`${message.guild.id}`]["prefix"]}tts [text]`, value: `Sends a Text To Speech message. [currently ${commandStatus}]` },
                { name: `${database[`${message.guild.id}`]["prefix"]}tts enable/disable`, value: `Enables and disables the command` },
            )
            .setFooter('Enabling/disabling TTS requires Admin perms', 'https://i.imgur.com/Z9gjIx1.png')
            message.channel.send(embed);
            return;
        }

        if (args[0] == 'enable') {
            if (!(message.author.id === message.guild.ownerID)) {
                message.reply(`Only the server owner can change the tts command status.`);
                return;
            }

            if (database[`${message.guild.id}`]["enable"].includes('tts')) {
                message.reply('TTS command is already enabled.')
                return;
            }
            database[`${message.guild.id}`]["enable"].push('tts')
            // Save the JSON file
            var saveJson = JSON.stringify(database, null, 4);
            fs.writeFile('database.json', saveJson, 'utf8', (err)=>{
                if(err){
                    console.log(err)
                }
            });
            message.channel.send('TTS command has been enabled.')
            return
        } else if (args[0] == 'disable') {
            if (!(message.author.id === message.guild.ownerID)) {
                message.reply(`Only the server owner can change the tts command status.`);
                return;
            }

            if (!database[`${message.guild.id}`]["enable"].includes('tts')) {
                message.reply('TTS command is already disabled.')
                return;
            }
            database[`${message.guild.id}`]["enable"] = database[`${message.guild.id}`]["enable"].filter(object => object.indexOf('tts'), 1)
            // Save the JSON file
            var saveJson = JSON.stringify(database, null, 4);
            fs.writeFile('database.json', saveJson, 'utf8', (err)=>{
                if(err){
                    console.log(err)
                }
            });
            message.channel.send('TTS command has been disabled.')
            return;
        }

        if (commandStatus == 'disabled') {
            message.reply('tts is currently disabled in this server. If you want to enable it, please ask the server owner')
            return
        }

        message.channel.send(`${args.join(' ')}`,{
            tts: true
        });
	},
};