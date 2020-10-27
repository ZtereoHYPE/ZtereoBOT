const Discord = require('discord.js');
module.exports = {
	name: 'kick',
    description: 'Kick a user.',
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
            .setTitle('Kick Command:')
            .addFields(
                { name: '=kick [someone] **(Admin only)**', value: 'Kicks the person out of the server.' },
            )
            message.channel.send(embed);
            return;
          }
        
        // gathers the fist tagged user and sends a message that you wanted to kick him (doesn't actually kick yet)
        const taggedUser = message.mentions.users.first();
        message.channel.send(`You wanted to kick ${taggedUser.username}`);
	},
};