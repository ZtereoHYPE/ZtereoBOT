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
                { name: `${prefix}mite [someone] **(Admin only)**`, value: `Mutes the person in the server.` },
            )
            message.channel.send(embed);
            return;
        }
        
        // gathers the fist tagged user and sends a message that you wanted to mute him (doesn't actually mute yet)
        const taggedUser = message.mentions.users.first();
        message.channel.send(`You wanted to mute ${taggedUser.username}`);
	},
};