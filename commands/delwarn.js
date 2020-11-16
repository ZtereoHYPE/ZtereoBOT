const fs = require('fs');
const Discord = require('discord.js');
const database = require('../database.json');
module.exports = {
	name: 'delwarn',
	description: 'Deletes a user\'s warm.',
	execute(message, args) {
        // Help command
        if (!args.length || args[0] == 'help') {
            const embed = new Discord.MessageEmbed()
            .setColor('#00cc00')
            .setTitle('Command Help:')
            .addFields(
                { name: `${database[`${message.guild.id}`]["prefix"]}delwarn [@user] [warn number]`, value: `Deletes a user\'s warm.` },
            )
            message.channel.send(embed);
            return;
        }

        let User = message.guild.member(message.mentions.users.first())
        if (message.guild.member(message.author).hasPermission('KICK_MEMBERS')|| message.guild.member === message.guild.ownerID) {

            let warningNumber = args[1]

            if (!message.mentions.users.first()) {
                message.reply('please specify a user who\'s warning to remove.')
                return;
            };

            if (!warningNumber || !database[message.guild.id]['warnings'][User.id]['warns'].hasOwnProperty(warningNumber)) {
                message.reply(`please provide a valid warning number. To see warning numbers, use \`${database[`${message.guild.id}`]["prefix"]}warnhistory [@member]\``)
            }

            if (!database[message.guild.id]['warnings'].hasOwnProperty(User.id)) {
                message.channel.send("That user has no warnings in this server.");
                return;
            }

            // TODO the actual logic that removes it from the database
            delete database[message.guild.id]['warnings'][User.id]['warns'][warningNumber]

            if (Object.keys(database[message.guild.id]['warnings'][User.id]['warns']).length == '0') {
                delete database[message.guild.id]['warnings'][User.id]
            }
        
            var saveJson = JSON.stringify(database, null, 4);
            fs.writeFile('database.json', saveJson, 'utf8', (err)=>{
                if(err){
                    console.log(err)
                }
            });

            message.channel.send(`Successfully deleted ${User.user.username}'s warning.`)
        } else {
            message.reply("you don\'t have the permission to do that (Kick Members perms).");
        };
	},
};