const path = require('path')
module.exports = {
    name: 'purge',
    aliases: ['clear', 'prune'],
    category: path.dirname(__filename).split(path.sep).pop(),
    description: 'Purges messages from the chat.',
	execute(message, args, database, shortcuts) {
        // Help command
        if (!args.length || args[0] == 'help') {
            shortcuts.functions.helpCommand(message, 'purge', '[number 1-99]', 'Deletes the specifed number of messages from the chat.', database[`${message.guild.id}`]["prefix"], 'Manage Messages perms required');
            return;
        }

        // Checks if the bot user can manage messages before proceeding
        if (!message.guild.member(message.author).hasPermission('MANAGE_MESSAGES')) {
            shortcuts.functions.quickEmbed(message, `you don\'t have the permission to do that (Manage Messages perms).`, 'failure');
            return;
        }
        
        //turns the number (+1) into an integer and saves it in "amount"
        const amount = parseInt(args[0]) + 1;

        // Checks if "amount" is a valid number
        if (isNaN(amount)) {
            return shortcuts.functions.quickEmbed(message, `That\'s not a valid number.`, 'failure');
        } else if (amount <= 1 || amount > 100) {
            return shortcuts.functions.quickEmbed(message, `Please give me a number between 1 and 99 to prune the chat.`, 'failure');
        }

        // Deletes the amount of messages
        message.channel.bulkDelete(amount, true).catch(error => {
            console.error(error);
            shortcuts.functions.quickEmbed(message, `There was an error trying to prune messages in this channel.`, 'failure');
        });
	},
};