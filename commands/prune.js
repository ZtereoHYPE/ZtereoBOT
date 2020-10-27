const Discord = require('discord.js');
module.exports = {
	name: 'prune',
    description: 'Prunes messages from the chat.',
    args: true,
	execute(message, args) {
        // Check if there are no arguements
        if (!args.length) {
            return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
        }
        if (args[0] == 'help') {
            const embed = new Discord.MessageEmbed()
            .setColor('#00cc00')
            .setTitle('Prune Command:')
            .addFields(
                { name: '=prune [number]', value: 'Deletes the specifed number of messages from the chat.' },
            )
            message.channel.send(embed);
            return;
        }

        const amount = parseInt(args[0]) + 1;
    
        if (isNaN(amount)) {
            return message.reply('That\'s not a valid number you moron.');
        } else if (amount <= 1 || amount > 100) {
            return message.reply('Please give me a number between 1 and 99 to prune the chat.')
        }
        message.channel.bulkDelete(amount, true).catch(err => {
            console.error(err);
            message.channel.send('There was an error trying to prune messages in this channel!');
        });
	},
};