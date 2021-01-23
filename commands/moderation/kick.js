const Discord = require('discord.js');
module.exports = {
    name: 'kick',
    category: 'moderation',
    description: 'Kicks a user.',
	execute(message, args, client, database) {

        // Help command
        if (!args.length || args[0] == 'help') {
            const embed = new Discord.MessageEmbed()
            .setColor('#8EB9FE')
            .setAuthor('Kick Command Help:', 'https://i.imgur.com/dSTYnIF.png')
            .addFields(
                { name: `${database[`${message.guild.id}`]["prefix"]}kick [@member] [reason]`, value: `Kicks the person out of the server.` },
            )
            .addFooter('Kick Members perms required', 'https://i.imgur.com/Z9gjIx1.png')
            message.channel.send(embed);
            return;
        }
        
        // Gathers the first tagged user, kicks it, shift the arguments to exclude it, and sends confirmation message. If no perms are detected then reject command.
        if (!(message.guild.member(message.author).hasPermission('KICK_MEMBERS') || message.guild.member(message.author).id == message.guild.ownerID)) {
            message.reply("you don\'t have the permission to do that (Kick Members perms).");
            return;
        }

        if (!message.mentions.users.first()) {
            message.reply('please specify a user to kick.')
            return;
        };

        let User = message.guild.member(message.mentions.users.first());

        if (!User.kickable) {
            message.reply("I don't have enough permissions to kick that user! Please make sure my role is high enough, and that I have Ban Members permissions.")
            return
        }

        args.shift();
        if (args.length == 0) args = ['Not', 'specified'];

        try {
            User.kick(args.join(' '));
        } catch (error) {
            message.reply(error)
        }
        
        message.reply(`you kicked ${User.user.username} for reason: ${args.join(' ')}`);
	},
};