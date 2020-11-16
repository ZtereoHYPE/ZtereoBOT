const fs = require('fs');
const Discord = require('discord.js');
const database = require('../database.json');
module.exports = {
	name: 'ban',
	description: 'Bans a player from the guild.',
	execute(message, args) {
        // Help command
        if (!args.length || args[0] == 'help') {
            const embed = new Discord.MessageEmbed()
            .setColor('#00cc00')
            .setTitle('Ban Command Help:')
            .addFields(
                { name: `${database[`${message.guild.id}`]["prefix"]}ban [@member] [reason]`, value: `Bans a player. **(Ban Member perms required)**` },
            )
            message.channel.send(embed);
            return;
        }

        let User = message.guild.member(message.mentions.users.first())
        if (message.guild.member(message.author).hasPermission('BAN_MEMBERS')|| message.guild.member(message.author) === message.guild.ownerID) {
            if (!message.mentions.users.first()) {
                message.reply('please specify a user to ban.')
                return;
            };
            
            if (User.hasPermission('BAN_MEMBERS') || User.id === message.guild.ownerID) {
                message.reply(`you can\'t ban a user with Ban Members perms.`);
                return;
            };

            User.ban(0, args.join(' '));

            args.shift();
            if (args.length == 0) args = ['Not', 'specified'];
            
            database[`${message.guild.id}`]['bans'][`${User.id}`] = {
                "username": "",
                "reason": ""
            };
            
            database[`${message.guild.id}`]['bans'][`${User.id}`]['username'] = `${User.user.username}`;
            database[`${message.guild.id}`]['bans'][`${User.id}`]['reason'] = `${args.join(' ')}`;

            // Save the JSON file
            var saveJson = JSON.stringify(database, null, 4);
            fs.writeFile('database.json', saveJson, 'utf8', (err)=>{
            if(err){
                console.log(err)
            }
        });
            message.reply(`you banned ${User.user.username} for reason: ${args.join(' ')}`);
        } else {
            message.reply("you don\'t have the permission to do that (Ban Members perms).");
        };

        
        
        

	},
};