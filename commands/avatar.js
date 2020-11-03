const Discord = require('discord.js');
const database = require('../database.json');
module.exports = {
	name: 'avatar',
    description: 'Shows a user\'s avatar.',
    args: true,
	execute(message, args) {

        // Help command
        if (!args.length || args[0] == 'help') {
            const embed = new Discord.MessageEmbed()
            .setColor('#00cc00')
            .setTitle('Avatar Command Help:')
            .addFields(
                { name: `${database[`${message.guild.id}`]["prefix"]}avatar [someone]`, value: 'Sends the selected person\'s profile picture.'},
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