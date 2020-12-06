// Load required files and save them in constants
const fs = require('fs');
const Discord = require('discord.js');
const { token } = require('./config.json');
const database = require('./database.json');
const join = require('./extensions/join.js');
const leave = require('./extensions/leave.js');
const help = require('./commands/help');

// Start discord.js stuff
const client = new Discord.Client();
client.commands = new Discord.Collection();

// Load the command files 
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

// Once bot is ready, log it in console and set status
client.once('ready', () => {
    console.log('Your bot should be working now I hope please work please-');
    client.user.setActivity('-help', { type: 'LISTENING' });
    // client.user.setPresence({
    //     status: "online",
    //     game: {
    //         name: "-help",  //The message shown
    //         type: "LISTENING" //PLAYING: WATCHING: LISTENING: STREAMING:
    //     }
    // });
});

// Guild joining detection
client.on("guildCreate", guild => {
    // Log when the bot enters a new guild
    console.log("Joined a new guild: " + guild.id);

    // Execute the join.js file
    join.execute(guild);
});

// Guild kicking/leaving detection
client.on("guildDelete", guild => {
    // Log when the bot leaves a guild
    console.log("Left a guild: " + guild.id);

    // Execute the leave.js file
    leave.execute(guild);
});

// Execute commands
client.on('message', message => {
    // If made by bot, cancel.
    if (message.author.bot) return;

    // If message comes from DM, say that bot doesn't work in dms *yet*
    if (message.channel.type == 'dm') {
        message.reply('I don\'t work in DMs *yet*.');
        return;
    }

    // Grab the prefix from the database
    let prefix = database[`${message.guild.id}`]["prefix"];

    if (message.content == "-help") {
        try {
            help.execute(message);
        } catch (error) {
            console.error(error);
            message.reply('an error happened. Ask ZtereoHYPE to fix me please!')
        }
        return;
    }

    // If doesn't start with prefix, cancel.
    if (!message.content.startsWith(prefix)) return;

    // Split the message in command and arguments
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    // If the command isn't part of the loaded commands, cancel.
    if (!client.commands.has(commandName)) return;

    // Put the command name into a command const.
    const command = client.commands.get(commandName);

    // Try to execute the command and in case of failure send error message.
    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('an error happened. Ask ZtereoHYPE to fix me please!')
    }
});

// Login with token (very secret)
client.login(token);

// Use this link to add ZtereoBOT to your server https://discord.com/oauth2/authorize?client_id=713718980325539910&scope=bot&permissions=8
