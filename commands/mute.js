const Discord = require('discord.js');
module.exports = {
	name: 'mute',
    description: 'Mute a user.',
    args: true,
	execute(message, args) {

        // Help command
        if (!args.length || args[0] == 'help') {
            const embed = new Discord.MessageEmbed()
            .setColor('#00cc00')
            .setTitle('Mute Command Help:')
            .addFields(
                { name: `${prefix}mite [someone] **(Admin only)**, value: Mutes the person in the server.` },
            )
            message.channel.send(embed);
            return;
        }
        
        // gathers the fist tagged user and sends a message that you wanted to kick him (doesn't actually kick yet)
        const taggedUser = message.mentions.users.first();
        message.channel.send(`You wanted to kick ${taggedUser.username}`);
	},
};