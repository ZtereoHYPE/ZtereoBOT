const fs = require('fs')
const { MessageEmbed } = require('discord.js');
var methods = {
    // Used to write the database to disk. Needs the database.
	saveDatabase: function(database) {
        // Write the new database to the JSON file.
        var saveJson = JSON.stringify(database, null, 4)
        fs.writeFile('database.json', saveJson, 'utf8', (error) => {
            if (error) {
                console.error(error)
                message.channel.send('There was an error saving the database.')
            }
        });
    },
    
    // Used to send a quick reply in the form of an embed. Needs 3 fields:
    // 1. message - the message the bot is replying to,
    // 2. author - the message to display in the embed (used in the author field),
    // 3. type - can be success of failure for now (2 types of image and colour)
	quickEmbed: function(message, author, type) {
        let color
        let authorLink
        if (type == 'success') {
            color = '#15AABF'
            authorLink = 'https://i.imgur.com/yvHrC4Q.png'
        } else if (type == 'failure') {
            color = '#8E1A01'
            authorLink = 'https://i.imgur.com/rs1souv.png'
        }
		const embed = new MessageEmbed()
			.setColor(color)
			.setAuthor(author, authorLink)
		message.channel.send(embed);
    },

    // Used to make Help commands at the start of each command.
    // 1. commandName - the name of the command
    // 2. commandSyntax - how the command is used. If there are more ways, then separate them with a double comma.
    // 3. commandUsageDescription - the description of the commandSyntax. If there are more descriptions, then separate them with a comma.
    // 4. footer - the footer of the embed. Can contain additional notes.
    // 5. prefix - the prefix grabbed form the database
    helpCommand: function(message, commandName, commandSyntax, commandUsageDescription, prefix, footer) {
        const embed = new MessageEmbed()
            .setColor('#8EB9FE')
            .setAuthor(`${commandName} Command Help:`, 'https://i.imgur.com/dSTYnIF.png')
            if (footer) {
                embed.setFooter(`${footer}`, 'https://i.imgur.com/Z9gjIx1.png')
            }

            if (commandSyntax.indexOf(',,') > -1) {
                commandSyntax = commandSyntax.split(',,')
                commandUsageDescription = commandUsageDescription.split(',,')
                let i = 0;
                while (i < commandSyntax.length) {
                    embed.addField(`${prefix}${commandName} ${commandSyntax[i]}`, `${commandUsageDescription[i]}`)
                    i++
                }
            } else {
                embed.addField(`${prefix}${commandName} ${commandSyntax}`, `${commandUsageDescription}`)
            }

        message.channel.send(embed);
        return;
	}
};
exports.functions = methods;