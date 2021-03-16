const fs = require('fs');
const config = require('../../config.json')
const path = require('path')
module.exports = {
    name: 'status',
    category: path.dirname(__filename).split(path.sep).pop(),
    description: 'Sets the bot\'s status',
    execute(message, args, database, shortcuts, client) {
        // Help command
        if (!args.length || args[0] == 'help') {
            shortcuts.functions.helpCommand(message, 'status', '<default> [PLAYING/STREAMING/LISTENING/WATCHING] [what]', 'Sets the bot\'s status.', database[`${message.guild.id}`]["prefix"], 'ZtereoHYPE Only');
            return;
        }

        // If the message author isn't ZtereoHYPE, reject
        if (message.guild.member(message.author).id != 434842825805266944) {
            shortcuts.functions.quickEmbed(message, "Sorry, but for obvious reasons only the bot owner can use this command. Please contact him if you have any form of request.", 'failure')
            return
        }

        // If the first argumet is default then change the config to the chosen status
        if (args[0] == "default") {
            // Shift the args to remove default
            args.shift()

            // let activityType be the first argument while rmoving it
            let activityType = args.shift()

            // let the content be the rest of the arguments
            let activityContent = args.join(' ')

            // Check if they are valid types
            if (activityType != "LISTENING" && activityType != "WATCHING" && activityType != "PLAYING" && activityType != "STREAMING") {
                message.reply(`${activityType} is not a valid activity type.`)
                return
            }

            if (!activityContent) { activityContent = "something" }

            // Set the config to be them
            config.statusType = activityType
            config.statusContent = activityContent

            // Save the config file
            var saveJson = JSON.stringify(config, null, 4);
            fs.writeFile('config.json', saveJson, 'utf8', (err) => {
                if (err) {
                    console.log(err)
                }
            });

            // Set the status to them
            client.user.setActivity(activityContent, { type: activityType });

            // Send success message
            shortcuts.functions.quickEmbed(message, `I've successfully changed my default status to ${activityType} ${activityContent}`, 'success')
            return;
        }

        // let activityType be the first argument while rmoving it
        let activityType = args.shift()

        // let the content be the rest of the arguments
        let activityContent = args.join(' ')

        // Check if they are valid types
        if (activityType != "LISTENING" && activityType != "WATCHING" && activityType != "PLAYING" && activityType != "STREAMING") {
            shortcuts.functions.quickEmbed(message, `${activityType} is not a valid activity type.`, 'failure')
            return
        }

        if (!activityContent) { activityContent = "something" }

        // Set the status to thems
        client.user.setActivity(activityContent, { type: activityType });

        // Send success message
        shortcuts.functions.quickEmbed(message, `I've successfully changed my status to ${activityType} ${activityContent}`, 'success')
    },
};