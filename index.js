// Load required files and save them in constants
//TODO have a recursisve system like for commands (dont load each and every single extension manually bruh)
const fs = require('fs');
const Discord = require('discord.js');
const path = require('path');
const { token, statusType, statusContent } = require('./config.json');
const database = require('./database.json');

// Start discord.js stuff
const client = new Discord.Client();
client.commands = new Discord.Collection();
client.extensions = new Discord.Collection();

//TODO this works but make it recursive/ checks if each item is folder and applies function to it and uh idk how to make it reuse the same array... Maybe store good files in an array okay yeah makes sense
const commandFolders = fs
    .readdirSync('./commands')
    .filter(file => fs.statSync(path.join('./commands', file)).isDirectory())

for (const dir of commandFolders) {
    const commandFiles = fs
        .readdirSync(`./commands/${dir}`)
        .filter(file => file.endsWith(".js"));

    for (const file of commandFiles) {
        const command = require(`./commands/${dir}/${file}`);
        client.commands.set(command.name, command);
    }
}

// Extension loader
const extensionFiles = fs
    .readdirSync('./extensions')
    .filter(file => file.endsWith(".js"));

for (const file of extensionFiles) {
    const extension = require(`./extensions/${file}`);
    client.extensions.set(extension.name, extension);
}

// Once bot is ready, log it in console and set status
client.once('ready', () => {
    client.extensions.get('backOnline').execute(client, database)
});

// Guild joining detection
client.on("guildCreate", guild => {
    // Execute the join.js extension
    client.extensions.get('join').execute(guild);
});

// Guild kicking/leaving detection
client.on("guildDelete", guild => {
    // Execute the leave.js file
    client.extensions.get('leave').execute(guild);
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
            client.commands.get('help').execute(message, 0, 0, database);
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
        command.execute(message, args, client, database);
    } catch (error) {
        console.error(error);
        message.reply('an error happened. Ask ZtereoHYPE to fix me please!')
    }
});

process.on('unhandledRejection', error => {
	console.error('Unhandled promise rejection:', error);
});

// Login with token (very secret)
client.login(token);

// Use this link to add ZtereoBOT to your server https://discord.com/oauth2/authorize?client_id=713718980325539910&scope=bot&permissions=8
// Use this link to add ZtereoBOT Beta to your server https://discord.com/oauth2/authorize?client_id=791744080127197204&scope=bot&permissions=8
// Use this command to update the git on the pi lol  git pull https://github.com/ZtereoHYPE/ZtereoBOT.git (~/ZtereoBOT directory)
