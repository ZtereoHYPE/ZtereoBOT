const Discord = require('discord.js');
module.exports = {
    name: 'unmute',
    category: 'moderation',
    description: 'Unmute a user.',
	execute(message, args, client, database) {

        //TODO: ADDD FAILPROOFNESS IF THERE ARE MORE ROLES CALLED THE SAME AND THELL THEM TO DELETE ONE OF THE ROLES. OR SWITCH TO A ROLE ID BUT IT WOULD HAVE TO BE PER-SERVER

        const muteRole = message.guild.roles.cache.find((role) => role.name === 'Server Muted');

        // Help command
        if (!args.length || args[0] == 'help') {
            const embed = new Discord.MessageEmbed()
            .setColor('#8EB9FE')
            .setAuthor('Mute Command Help:', 'https://i.imgur.com/dSTYnIF.png')
            .addFields(
                { name: `${database[`${message.guild.id}`]["prefix"]}unmute [@member] [reason]`, value: `Unmutes the person in the server.` },
            )
            .setFooter('Manage Member perms required', 'https://i.imgur.com/Z9gjIx1.png')
            message.channel.send(embed);
            return;
        }
        
        // TODO: make this work with a timeout argument and all, currently crashes.
        const User = message.guild.member(message.mentions.users.first())

        if (!(message.guild.member(message.author).hasPermission('MANAGE_ROLES') || message.guild.member(message.author).id == message.guild.ownerID)) {
            message.reply("You dont have permissions to do that (Manage Roles perms).");
            return;
        }

        if (!User) {
            message.reply('please specify a user to unmute.')
            return;
        };

        if (!User.roles.cache.some((role)=> role === muteRole)) {
            message.reply('That person is not muted.')
            return;
        }

        if (User.id === message.guild.ownerID) {
            message.channel.send(`wtf happened here.`);
        };

        args.shift()
        if (args.length == 0) args = ['Not', 'specified'];

        User.roles.remove(muteRole, "Unmute command used.")

        message.channel.send(`You unmuted ${User.user.username}.`)
	},
};