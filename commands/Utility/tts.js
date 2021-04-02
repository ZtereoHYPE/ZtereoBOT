const path = require('path');
module.exports = {
    name: 'tts',
    aliases: ['speak', 'say'],
    category: path.dirname(__filename).split(path.sep).pop(),
    description: 'Sends a Test To Speech Message',
    execute(message, args, database, shortcuts) {

        // Check if the command is disabled
        let commandStatus;
        if (database[message.guild.id]["disabled"].includes('tts')) {
            commandStatus = 'disabled'
        } else {
            commandStatus = 'enabled'
        }

        // Help command
        if (!args.length || args[0] == 'help') {
            shortcuts.functions.helpCommand(message, 'TTS', '[text]', 'Sends a Text To Speech message.', database[`${message.guild.id}`]["prefix"], 'Enabling/disabling TTS requires Admin perms')
            return;
        }
asdsad
        // If the first arg is enable, check if server owner and if already enabled, and else enable it
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

            // Save the database file
            shortcuts.functions.saveDatabase(database)

            shortcuts.functions.quickEmbed(message, 'TTS command has been enabled.', 'success')
            return

        // if the first arg is disable, check if server owner and if already disables, and else disable it
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

        // if the command is disabled say it and cancel
        if (commandStatus == 'disabled') {
            shortcuts.functions.quickEmbed(message, 'TTS is currently disabled in this server.\nIf you want to enable it, please ask the server owner', 'failure')
            return
        }

        // send the tts message
        message.channel.send(args.join(' '), {
            tts: true
        });
    },
};