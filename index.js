// Load required files and save them in constants
const fs = require('fs');
const Discord = require('discord.js');
const { token } = require('./config.json');
const database = require('./database.json');
const join = require('./extensions/join.js');
const leave = require('./extensions/leave.js');

// Start discord.js stuff
const client = new Discord.Client();
client.commands = new Discord.Collection();

// Load the command files 
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

// Once bot is ready, log it in console
client.once('ready', () => {
    console.log('Your bot should be working now I hope please work please-');
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
    // Grab the prefix from the database
    let prefix = database[`${message.guild.id}`]["prefix"]

    // If doesn't start with prefix, or is made by bot, cancel.
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    // If message comes from DM, say that bot doesn't work in dms yet
    if (message.channel.type === 'dm') message.reply('I don\'t work in DMs *yet*.')

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
        console.log(error);
        message.reply('An error happened. @ZtereoHYPE fix me please!')
    }
});

// Login with token (very secret)
client.login(token);

// Use this link to add ZtereoBOT to your server https://discord.com/oauth2/authorize?client_id=713718980325539910&scope=bot&permissions=8