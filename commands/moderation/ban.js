const fs = require('fs');
const Discord = require('discord.js');
module.exports = {
    name: 'ban',
    category: 'moderation',
    description: 'Bans a player from the guild.',
    execute(message, args, client, database) {
        // Help command
        if (!args.length || args[0] == 'help') {
            const embed = new Discord.MessageEmbed()
                .setColor('#8EB9FE')
                .setAuthor('Ban Command Help:', 'https://i.imgur.com/dSTYnIF.png')
                .addFields(
                    { name: `${database[`${message.guild.id}`]["prefix"]}ban [@member] [reason]`, value: `Bans a player from the server` },
                )
                .setFooter('Ban Member perms required', 'https://i.imgur.com/Z9gjIx1.png')
            message.channel.send(embed);
            return;
        }

        let User = message.guild.member(message.mentions.users.first())
        if (!(message.guild.member(message.author).hasPermission('BAN_MEMBERS') || message.guild.member(message.author).id == message.guild.ownerID)) {
            message.reply("you don\'t have the permission to do that (Ban Members perms).");
            return;
        }

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
        fs.writeFile('database.json', saveJson, 'utf8', (err) => {
            if (err) {
                console.log(err)
            }
        });
        message.reply(`you banned ${User.user.username} for reason: ${args.join(' ')}`);
    },
};