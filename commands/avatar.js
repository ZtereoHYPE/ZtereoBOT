const Discord = require('discord.js');
module.exports = {
	name: 'avatar',
    description: 'Shows a user\'s avatar.',
    args: true,
	execute(message, args) {
        // Check if there are no arguements
        if (!args.length) {
            return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
        }

        // Check if the argument is help
        if (args[0] == 'help') {
            const embed = new Discord.MessageEmbed()
            .setColor('#00cc00')
            .setTitle('Avatar Command:')
            .addFields(
                { name: '=avatar [someone]', value: 'Sends the selected person\'s profile picture.'},
            )
            message.channel.send(embed);
            return;
          }

        //maps the mentioned users in an array and sends an embed for each element of the array
        const avatarList = message.mentions.users.map(user => {
            const embed = new Discord.MessageEmbed()
                .setTitle(`${user.username}\'s avatar:`)
                .setImage(user.avatarURL({dynamic: true, format: 'png', size: 2048}));
            return embed;
        });
        message.channel.send(avatarList);
	},
};