const Discord = require('discord.js');
const database = require('../database.json');
module.exports = {
	name: 'avatar',
    description: 'Shows a user\'s avatar.',
    args: true,
	execute(message, args) {
        // Help command
        if (args[0] == 'help') {
            const embed = new Discord.MessageEmbed()
            .setColor('#00cc00')
            .setTitle('Avatar Command Help:')
            .addFields(
                { name: `${database[`${message.guild.id}`]["prefix"]}avatar [someone]`, value: 'Sends the selected person\'s profile picture.'},
            )
            message.channel.send(embed);
            return;
        }

        let User;
        if (!args.length) {
            User = message.guild.member(message.author)
        } else {
            User = message.guild.member(message.mentions.users.first())
            if (!User) {
                message.reply(`${args.join(' ')} isn't a user.`)
                return;
            }
        }
        
        const embed = new Discord.MessageEmbed()
            .setTitle(`${User.user.username}\'s avatar:`)
            .setImage(User.user.avatarURL({dynamic: true, format: 'png', size: 2048}));
        message.channel.send(embed);
	},
};