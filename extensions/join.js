const fs = require('fs');
const Discord = require('discord.js');
const database = require('../database.json');

module.exports = {
    name: "join",
    execute(guild) {
        // Create an entry in the database with as key the guild id containing everything needed.
        database[`${guild.id}`] = {
            "prefix" : "!",
            "warnings" : [],
            "rules" : []
        };
        
        // Save the JSON file
        var saveJson = JSON.stringify(database, null, 4);
        fs.writeFile('database.json', saveJson, 'utf8', (err)=>{
            if(err){
                console.log(err)
            }
        });

        // Send welcome message :)
        const embed = new Discord.MessageEmbed()
            .setColor('#00cc00')
            .setTitle('Hello everyone!')
            .addFields(
                { name: `Thank you for inviting me in this server!`, value: `My default prefix is \`!\`, to change it use \`!prefix\`.`},
                { name: `If you need any help, just type \`!help\``, value: 'Or simply ask ZtereoHYPE :)'}
            )
        guild.systemChannel.send(embed);
    }
}