const Discord = require('discord.js');
module.exports = {
	name: 'rule',
    description: 'Command to quote a rule',
    args: true,
	execute(message, args) {
        // Check if there are no arguements
        if (!args.length) {
            return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
        }

        if (args[0] == 'help') {
            var embed = new Discord.MessageEmbed()
            .setColor('#00cc00')
            .setTitle('Rule Command:')
            .addFields(
                { name: '=rule [1-5]', value: 'Sends the specified rule.' },
            )
            message.channel.send(embed);
            return;
        }

		if (args.length != 1 || args[0] > 5) {
            return message.channel.send('That is not a valid rule.');
        }

        switch (args[0]) {
            case '1':
                var embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle('Rule 1')
                    .addFields(
                        { name: 'Follow Discord TOS', value: 'Follow the Terms Of Service of the Discord platform please.' },
                    )
                message.channel.send(embed);
                break;

            case '2':
                var embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle('Rule 2')
                    .addFields(
                        { name: 'Have some common sense', value: 'Please show some decency and don\'t act on purpose like a fool.' },
                    )
                message.channel.send(embed);
                break;

            case '3':
                var embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle('Rule 3')
                    .addFields(
                        { name: 'Be respectful to each other', value: 'Again, have some respect for others. Please? :) .' },
                    )
                message.channel.send(embed);
                break;

            case '4':
                var embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle('Rule 4')
                    .addFields(
                        { name: 'No posts containing homophobia/racism/sexism/nazism', value: 'This is obvious and will not go unpunished.' },
                    )
                message.channel.send(embed);
                break;

            case '5':
                var embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle('Rule 5')
                    .addFields(
                        { name: 'No NSFW/Pornography', value: 'Like the rule above, this will be severely punished.' },
                    )
                message.channel.send(embed);
        }
	},
};