const fs = require('fs');
const Discord = require('discord.js');
const config = require('../../config.json')
module.exports = {
    name: 'status',
    category: 'bot',
	description: 'Sets the bot\'s status',
	execute(message, args, client, database) {

        // Help command
        if (!args.length || args[0] == 'help') {
            const embed = new Discord.MessageEmbed()
            .setColor('#8EB9FE')
            .setAuthor('Status Command Help:', 'https://i.imgur.com/dSTYnIF.png')
            .addFields(
                { name: `${database[`${message.guild.id}`]["prefix"]}status [PLAYING/STREAMING/LISTENING/WATCHING] [what]`, value: `Sets the bot\'s status.` },
            )
            .setFooter('ZtereoHYPE Only lol', 'https://i.imgur.com/Z9gjIx1.png')
            message.channel.send(embed);
            return;
        }

        if (message.guild.member(message.author).id != 434842825805266944) {
            message.reply('Sorry, but for obvious reasons only the bot owner can use this command. Please contact him if you have any form of request <@434842825805266944>')
            return
        }

        if (args[0] == "default") {
            args.shift()
            let activityType = args.shift()
            let activityContent = args.join(' ')

            config.statusType = activityType
            config.statusContent = activityContent

            var saveJson = JSON.stringify(config, null, 4);
            fs.writeFile('config.json', saveJson, 'utf8', (err)=>{
                if(err){
                    console.log(err)
                }
            });

            message.channel.send(`I've successfully changed my default status to ${activityType} ${activityContent}`)
            return
        }

        let activityType = args.shift()
        let activityContent = args.join(' ')

        if (activityType != "LISTENING" && activityType != "WATCHING" && activityType != "PLAYING" && activityType != "STREAMING") {
            message.reply(`${activityType} is not a valid activity type.`)
            return
        }

        if (!activityContent) {activityContent = "something"}
        client.user.setActivity(activityContent, { type: activityType });

        message.channel.send("done.")
	},
};