const Discord = require('discord.js');
const database = require('../database.json');
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
                { name: `${database[`${message.guild.id}`]["prefix"]}mute [someone] [time] [reason]`, value: `Mutes the person in the server. **(Ban Members perms required)**` },
            )
            .setFooter(`Can the muted person still type? Try ${database[`${message.guild.id}`]["prefix"]}mute fixPerms `)
            message.channel.send(embed);
            return;
        }
        
        // TODO: make this work with a timeout argument and all, currently crashes.
        const User = message.mentions.users.first();
        
        if (!message.guild.roles.cache.find((role) => role.name === 'Server Muted')) {
            message.guild.roles.create({
                data:{
                    name:"Server Muted",
                    color:"black",
                },
                reason: 'Missing Server Muted role, necessary for mute command.'
            });
            message.channel.send('The `Server Muted` role was created as it was missing. Please run again the command to actually mute the person.');
            return;
        };

        const muteRole = message.guild.roles.cache.find((role) => role.name === 'Server Muted');  
        message.guild.channels.cache.forEach(channel => channel.updateOverwrite(muteRole, { SEND_MESSAGES: false }));

        if (args[0]=='fixPerms') {
            message.channel.send("I've tried fixing the permissions.")
            return;
        }

        // if (!(message.guild.member(message.author).hasPermission('KICK_MEMBERS') || message.guild.member(message.author).id == message.guild.ownerID)) {
        //     message.reply("the mute command is still WIP and doesnt work, plus you dont have permissions to do that lol (Kick Members perms).");
        //     return;
        // }

        // if (!message.mentions.users.first()) {
        //     message.reply('please specify a user to warn.')
        //     return;
        // };

        // args.shift();
        // setTimeout()
        // // message.channel.send(`You muted ${taggedUser.username} for reason: ${args}`);
        // message.channel.send('the mute command is still WIP and doesnt work')
	},
};