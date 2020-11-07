const Discord = require('discord.js');
module.exports = {
	name: 'purge',
    description: 'Purges messages from the chat.',
    args: true,
	execute(message, args) {
        // Help command
        if (!args.length || args[0] == 'help') {
            const embed = new Discord.MessageEmbed()
            .setColor('#00cc00')
            .setTitle('Prune Command:')
            .addFields(
                { name: `${database[`${message.guild.id}`]["prefix"]}prune [number 1-99]`, value: 'Deletes the specifed number of messages from the chat.' },
            )
            message.channel.send(embed);
            return;
        }

        // Checks if the bot user can manage messages before proceeding
        if (message.guild.member(message.author).hasPermission('MANAGE_MESSAGES')) {
            //turns the number (+1) into an integer and saves it in "amount"
            const amount = parseInt(args[0]) + 1;

            //checks if "amount" is a valid number
            if (isNaN(amount)) {
                return message.reply('That\'s not a valid number you moron.');
            } else if (amount <= 1 || amount > 100) {
                return message.reply('Please give me a number between 1 and 99 to prune the chat.')
            }

            //deletes the amount of messages
            message.channel.bulkDelete(amount, true).catch(error => {
                console.error(error);
                message.channel.send('There was an error trying to prune messages in this channel');
            });
        } else {
            message.reply("you don\'t have the permission to do that (Manage Messages perms).")
        }
	},
};