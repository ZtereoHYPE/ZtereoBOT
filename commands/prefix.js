const fs = require('fs');
const Discord = require('discord.js');
const database = require('../database.json');
module.exports = {
	name: 'prefix',
    description: 'Change the prefix.',
    args: true,
	execute(message, args) {
        // Help command
        if (!args.length || args[0] == 'help') {
            const embed = new Discord.MessageEmbed()
            .setColor('#00cc00')
            .setTitle('Prefix Command Help:')
            .addFields(
                { name: `${prefix}prefix [new prefix] **(Admin only)**`, value: `Changes the current server\'s prefix.` },
            )
            message.channel.send(embed);
            return;
        }
        
        // Gets the first argument and sets it as prefix
        database[`${message.guild.id}`]["prefix"] = args[0];
        
        // Saves the modified JSON file
        var saveJson = JSON.stringify(database, null, 4)
        fs.writeFile('database.json', saveJson, 'utf8', (err)=>{
            if(err){
                console.log(err)
                message.channel.send('There was an error saving the JSON file. The new prefix should work but will reset itself when the bot is restarted.')
            }
        });

        // Sends success embed
        const embed = new Discord.MessageEmbed()
            .setColor('#00cc00')
            .setTitle('Prefix Successfully Changed!')
            .addFields(
                { name: `The new prefix is now \`${database[`${message.guild.id}`]["prefix"]}\``, value : ""},
            )
        message.channel.send(embed);
	},
};