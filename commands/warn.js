const fs = require('fs');
const Discord = require('discord.js');
const database = require('../database.json');
module.exports = {
	name: 'warn',
	description: 'Warns a user for rule-breaking and adds the warning to a user-specific record.',
	execute(message, args) {
        // Help command
        if (!args.length || args[0] == 'help') {
            const embed = new Discord.MessageEmbed()
            .setColor('#00cc00')
            .setTitle('Command Help:')
            .addFields(
                { name: `${database[`${message.guild.id}`]["prefix"]}warn [@member] [reason]`, value: `Warns a user for rule-breaking and adds the warning along with its reasons to a user-specific record. **(Kick Members perms required)**` },
            )
            message.channel.send(embed);
            return;
        }

        let User = message.guild.member(message.mentions.users.first())
        if (!(message.guild.member(message.author).hasPermission('KICK_MEMBERS') || message.guild.member(message.author).id == message.guild.ownerID)) {
            message.reply("you don\'t have the permission to do that (Kick Members perms).");
            return;
        }

        if (!message.mentions.users.first()) {
            message.reply('please specify a user to warn.')
            return;
        };

        if (User.id === message.guild.ownerID) {
            message.reply(`you can\'t warn the server owner lol.`);
            return;
        };
        
        args.shift();
        if (args.length == 0) args = ['Not', 'specified'];
        if (!Object.keys(database[`${message.guild.id}`]['warnings']).includes(`${User.id}`)) {
            database[`${message.guild.id}`]['warnings'][`${User.id}`] = {
                "username": "",
                "warns": {
                    "0": {
                        "date": "",
                        "reason": ""
                    }
                }
            }
        } else {
            database[`${message.guild.id}`]['warnings'][`${User.id}`]['warns']['0'] = {
                "date": "",
                "reason": ""
            }
        };
        
        var date = new Date();
        database[`${message.guild.id}`]['warnings'][`${User.id}`]['username'] = `${User.user.username}`;
        database[`${message.guild.id}`]['warnings'][`${User.id}`]['warns']['0']['date'] = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} at ${date.getHours()}:${date.getMinutes()}`;
        database[`${message.guild.id}`]['warnings'][`${User.id}`]['warns']['0']['reason'] = `${args.join(' ')}`;
        database[`${message.guild.id}`]['warnings'][`${User.id}`]['warns'][Object.keys(database[message.guild.id]['warnings'][`${User.id}`]['warns']).length] = database[`${message.guild.id}`]['warnings'][`${User.id}`]['warns']['0'];
        delete database[`${message.guild.id}`]['warnings'][`${User.id}`]['warns']['0'];
        var saveJson = JSON.stringify(database, null, 4);
        fs.writeFile('database.json', saveJson, 'utf8', (err)=>{
            if(err){
                console.log(err)
            }
        });

        message.reply(`you warned ${User.user.username} for reason: ${args.join(' ')}`);
	}
};