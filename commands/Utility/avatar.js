const {MessageEmbed} = require('discord.js');
const path = require('path')
module.exports = {
    name: 'avatar',
    aliases: ['profile', 'pfp'],
    category: path.dirname(__filename).split(path.sep).pop(),
    description: 'Shows a user\'s avatar.',
	execute(message, args, database, shortcuts) {
        // Help command
        if (args[0] == 'help') {
            shortcuts.functions.helpCommand(message, 'avatar', '<@member>', `Sends the selected person\'s profile picture.\nIf empty, sends the sender\'s avatar.`, database[`${message.guild.id}`]["prefix"]);
            return;
        }

        // declare user
        let User;

        // if there are no args let user be the author
        if (!args.length) {
            User = message.guild.members.cache.get(message.author.id)

        // else let user be the first mention
        } else {
            User = message.guild.members.cache.get(message.mentions.users.first().id)

            // if the first mention doesn't exist say it and cancel
            if (!User) {
                shortcuts.functions.quickEmbed(message, `${args.join(' ')} isn't a user.`, 'warning')
                return;
            }
        }
        
        // make an embed with the user's url
        const embed = new MessageEmbed()
            .setTitle(`${User.user.username}\'s avatar:`)
            .setImage(User.user.avatarURL({dynamic: true, format: 'png', size: 2048}));

        // send the embed
        message.channel.send(embed);
	},
};