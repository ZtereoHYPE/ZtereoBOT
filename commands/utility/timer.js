const Discord = require('discord.js');
module.exports = {
    name: 'timer',
    category: path.dirname(__filename).split(path.sep).pop(),
    description: 'Sets a timer after which you get pinged.',
	execute(message, args, client, database, commandDate) {
        
        
        if (!args.length || args[0] == 'help') {
            const embed = new Discord.MessageEmbed()
            .setColor('#8EB9FE')
            .setAuthor('Timer Command Help:', 'https://i.imgur.com/dSTYnIF.png')
            .addFields(
                { name: `${database[`${message.guild.id}`]["prefix"]}timer [number] seconds/minutes/hours`, value: 'Sets a timer for the chosen amount of time and pings you when timer is over' },
            )
            message.channel.send(embed);
            return;
        }
        //console.log(Date.now() - commandDate)
        // Else if chain (switch to switch please) to check if the sent message is a valid timer and set the timer accordingly
        if (args.length < 1) {
            message.channe.send('Please provide a timer length.');
            return;
        } else if (args[0].endsWith("s")) {
            message.react('👍');
            setTimeout(function() {message.channel.send(`${message.author}, your ${args[0]} timer has expired.`);}, args[0].slice(0, -1)*1000);
        } else if (args[1] == "seconds"|| args[1] == "second") {
            message.react('👍');
            setTimeout(function() {message.channel.send(`${message.author}, your ${args[0]} ${args[1]} timer has expired.`);}, args[0]*1000);
        } else if (args[0].endsWith("m")) {
            message.react('👍');
            setTimeout(function() {message.channel.send(`${message.author}, your ${args[0]} timer has expired.`);}, args[0].slice(0, -1)*60000);
        } else if (args[1] == "minutes"|| args[1] == "minute") {
            message.react('👍');
            setTimeout(function() {message.channel.send(`${message.author}, your ${args[0]} ${args[1]} timer has expired.`);}, args[0]*60000);
        } else if (args[0].endsWith("h")) {
            message.react('👍');
            setTimeout(function() {message.channel.send(`${message.author}, your ${args[0]} timer has expired.`);}, args[0].slice(0, -1)*3600000);
        } else if (args[1] == "hours"|| args[1] == "hour") {
            message.react('👍');
            setTimeout(function() {message.channel.send(`${message.author}, your ${args[0]} ${args[1]} timer has expired.`);}, args[0]*3600000);
        }
        
	},
};