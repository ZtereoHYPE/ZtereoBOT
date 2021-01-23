const Discord = require('discord.js');
module.exports = {
    name: 'tts',
    category: 'utility',
    description: 'Sends a Test To Speech Message',
    execute(message, args, client, database, shortcuts) {

        if (database[`${message.guild.id}`]["disabled"].includes('tts')) {
            commandStatus = 'disabled'
        } else {
            commandStatus = 'enabled'
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
                shortcuts.functions.quickEmbed(message, 'Only the server owner can change the tts command status.', 'failure')
                return;
            }

            if (!database[`${message.guild.id}`]["disabled"].includes('tts')) {
                shortcuts.functions.quickEmbed(message, 'TTS command is already enabled.', 'success')
                return;
            }

            database[`${message.guild.id}`]["disabled"] = database[`${message.guild.id}`]["disabled"].filter(object => object.indexOf('tts'), 1)

            // Save the JSON file
            shortcuts.functions.saveDatabase(database)

            shortcuts.functions.quickEmbed(message, 'TTS command has been enabled.', 'success')
            return
        } else if (args[0] == 'disable') {
            if (!(message.author.id === message.guild.ownerID)) {
                shortcuts.functions.quickEmbed(message, 'Only the server owner can change the tts command status.', 'failure')
                return;
            }

            if (database[`${message.guild.id}`]["disabled"].includes('tts')) {
                shortcuts.functions.quickEmbed(message, 'TTS command is already disabled.', 'success')
                return;
            }
            database[`${message.guild.id}`]["disabled"].push('tts')

            // Save the JSON file
            shortcuts.functions.saveDatabase(database)

            shortcuts.functions.quickEmbed(message, 'TTS command has been disabled.', 'success')
            return;
        }

        if (commandStatus == 'disabled') {
            shortcuts.functions.quickEmbed(message, 'TTS is currently disabled in this server.\nIf you want to enable it, please ask the server owner', 'failure', )
            return
        }

        message.channel.send(`${args.join(' ')}`, {
            tts: true
        });
    },
};