const fs = require('fs');
const Discord = require('discord.js');
module.exports = {
    name: 'prefix',
    category: path.dirname(__filename).split(path.sep).pop(),
    description: 'Changes the prefix.',
	execute(message, args, client, database) {
        // Help command
        if (!args.length || args[0] == 'help') {
            var embed = new Discord.MessageEmbed()
            .setColor('#8EB9FE')
            .setAuthor('Prefix Command Help:', 'https://i.imgur.com/dSTYnIF.png')
            .addFields(
                { name: `${database[`${message.guild.id}`]["prefix"]}prefix [new prefix]`, value: `Changes the current server\'s prefix.`},
            )
            .setFooter(`Server Owner only`, 'https://i.imgur.com/Z9gjIx1.png')
            message.channel.send(embed);
            return;
        }

        if (!(message.guild.member(message.author).id == message.guild.ownerID)) {
            message.reply("you don\'t have the permission to do that (Server Owner).");
            return;
        }
        
        // Gets the first argument and sets it as prefix
        database[`${message.guild.id}`]["prefix"] = args[0];
        
        // Saves the modified JSON file
        var saveJson = JSON.stringify(database, null, 4)
        fs.writeFile('database.json', saveJson, 'utf8', (error)=>{
            if(error){
                console.error(error)
                message.channel.send('There was an error saving the JSON file. The new prefix should work but will reset itself when the bot is restarted.')
            }
        });

        // Sends success embed
        var embed = new Discord.MessageEmbed()
            .setColor('#00cc00')
            .setTitle('Prefix Successfully Changed!')
            .addFields(
                { name: `The new prefix is now \`${database[`${message.guild.id}`]["prefix"]}\``, value : "Good choice!" },
            )
        message.channel.send(embed);
	},
};