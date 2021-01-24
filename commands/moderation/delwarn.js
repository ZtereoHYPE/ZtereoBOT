const fs = require('fs');
const Discord = require('discord.js');
const path = require('path')
module.exports = {
    name: 'delwarn',
    category: path.dirname(__filename).split(path.sep).pop(),
	description: 'Deletes a user\'s warm.',
	execute(message, args, client, database) {
        // Help command
        if (!args.length || args[0] == 'help') {
            const embed = new Discord.MessageEmbed()
            .setColor('#8EB9FE')
            .setAuthor('Delwarn Command Help:', 'https://i.imgur.com/dSTYnIF.png')
            .addFields(
                { name: `${database[`${message.guild.id}`]["prefix"]}delwarn [@member] [warn number]`, value: `Deletes a user\'s warm.` },
            )
            .setFooter('Kick Members perms required', 'https://i.imgur.com/Z9gjIx1.png')
            message.channel.send(embed);
            return;
        }
        
        if (!(message.guild.member(message.author).hasPermission('MANAGE_MEMBERS') || message.guild.member(message.author).id == message.guild.ownerID)) {
            message.reply("you don\'t have the permission to do that (Manage Members perms).");
            return;
        }

        if (Object.entries(database[message.guild.id]['warnings']).length === 0) {
            message.reply('This server has no warnings for any user.')
            return;
        }

        if (!message.mentions.users.first()) {
            message.reply('please specify a user whose warning to remove.')
            return;
        };

        let User = message.guild.member(message.mentions.users.first())
        let warningNumber = args[1]

        if (!database[message.guild.id]['warnings'][User.id]) {
            message.reply('That user has no warnings in this server.')
            return;
        }

        if (!warningNumber || !database[message.guild.id]['warnings'][User.id]['warns'].hasOwnProperty(warningNumber)) {
            message.reply(`please provide a valid warning number. To see warning numbers, use \`${database[`${message.guild.id}`]["prefix"]}warnhistory [@member]\``)
            return;
        };

        if (!database[message.guild.id]['warnings'].hasOwnProperty(User.id)) {
            message.channel.send("That user has no warnings in this server.");
            return;
        };

        delete database[message.guild.id]['warnings'][User.id]['warns'][warningNumber]
        if (Object.keys(database[message.guild.id]['warnings'][User.id]['warns']).length == '0') {
            delete database[message.guild.id]['warnings'][User.id]
        };

        var saveJson = JSON.stringify(database, null, 4);
        fs.writeFile('database.json', saveJson, 'utf8', (err)=>{
            if(err){
                console.log(err)
            }
        });
        
        message.channel.send(`Successfully deleted ${User.user.username}'s warning.`)
	},
};