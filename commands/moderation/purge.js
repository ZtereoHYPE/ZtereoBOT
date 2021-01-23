const Discord = require('discord.js');
const path = require('path')
module.exports = {
    name: 'purge',
    category: path.dirname(__filename).split(path.sep).pop(),
    description: 'Purges messages from the chat.',
	execute(message, args, client, database) {
        // Help command
        if (!args.length || args[0] == 'help') {
            const embed = new Discord.MessageEmbed()
            .setColor('#8EB9FE')
            .setAuthor('Purge Command Help:', 'https://i.imgur.com/dSTYnIF.png')
            .addFields(
                { name: `${database[`${message.guild.id}`]["prefix"]}purge [number 1-99]`, value: 'Deletes the specifed number of messages from the chat.' },
            )
            .setFooter(`Manage Messages perms required`, 'https://i.imgur.com/Z9gjIx1.png')
            message.channel.send(embed);
            return;
        }

        // Checks if the bot user can manage messages before proceeding
        if (!message.guild.member(message.author).hasPermission('MANAGE_MESSAGES')) {
            message.reply("you don\'t have the permission to do that (Manage Messages perms).");
            return;
        }
        
        //turns the number (+1) into an integer and saves it in "amount"
        const amount = parseInt(args[0]) + 1;

        // Checks if "amount" is a valid number
        if (isNaN(amount)) {
            return message.reply('That\'s not a valid number you moron.');
        } else if (amount <= 1 || amount > 100) {
            return message.reply('Please give me a number between 1 and 99 to prune the chat.')
        }

        // Deletes the amount of messages
        message.channel.bulkDelete(amount, true).catch(error => {
            console.error(error);
            message.channel.send('There was an error trying to prune messages in this channel');
        });
	},
};