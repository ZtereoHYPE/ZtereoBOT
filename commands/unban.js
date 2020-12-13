const fs = require('fs');
const Discord = require('discord.js');
const database = require('../database.json');
module.exports = {
	name: 'unban',
	description: 'Unbans a player from the guild.',
	execute(message, args) {
        // Help command
        if (!args.length || args[0] == 'help') {
            const embed = new Discord.MessageEmbed()
            .setColor('#00cc00')
            .setTitle('Unban Command Help:')
            .addFields(
                { name: `${database[`${message.guild.id}`]["prefix"]}unban [member id]`, value: `Unbans a player from the guild. **(Ban Member perms required)**` },
            )
            message.channel.send(embed);
            return;
        };

        if (!(message.guild.member(message.author).hasPermission('BAN_MEMBERS') || message.guild.member(message.author).id == message.guild.ownerID)) {
            message.reply("you don\'t have the permission to do that (Ban Members perms).");
            return;
        }

        if (/[a-z]/.test(args[0])) {
            message.reply(`please give select a user by its ID. To find the ID, use \`${database[`${message.guild.id}`]["prefix"]}banlist\``)
            return;
        };

        if (!Object.keys(database[`${message.guild.id}`]['bans']).includes(args[0])) {
            message.reply('that user is not currently banned in this guild.')
            return;
        };
        
        message.guild.members.unban(args[0])
        .then(user => message.reply(`you unbanned ${user.username} from ${message.guild.name}.`))
        delete database[`${message.guild.id}`]['bans'][`${args[0]}`];
        
        // Save the JSON file
        var saveJson = JSON.stringify(database, null, 4);
        fs.writeFile('database.json', saveJson, 'utf8', (err)=>{
            if(err){
                console.log(err)
            }
        });
	},
};