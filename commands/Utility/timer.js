const path = require('path')
module.exports = {
    name: 'timer',
    category: path.dirname(__filename).split(path.sep).pop(),
    description: 'Sets a timer after which you get pinged.',
	execute(message, args, database, shortcuts) {
        // help command
        if (!args.length || args[0] == 'help') {
            shortcuts.functions.helpCommand(message, 'timer', '[number] seconds/minutes/hours`', 'Sets a timer for the chosen amount of time and pings you when timer is over.', database[`${message.guild.id}`]["prefix"]);
            return;
        }
        // Else if chain to check if the sent message is a valid timer and set the timer accordingly
        if (args.length < 1) {
            shortcuts.functions.quickEmbed(message, 'Please provide a timer lenght.', 'warning');
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