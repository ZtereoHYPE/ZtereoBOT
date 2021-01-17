// Load required files and save them in constants
//TODO have a recursisve system like for commands (dont load each and every single extension manually bruh)
let startDate = Date.now()
const fs = require('fs');
const Discord = require('discord.js');
const path = require('path');
const { token } = require('./config.json');
const database = require('./database.json');

// Start discord.js stuff
const client = new Discord.Client();
client.commands = new Discord.Collection();
client.eventListeners = new Discord.Collection();
// client.quickActions = new Discord.Collection();

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

// EventListener loader
const eventListenerFiles = fs
    .readdirSync('./eventListeners')
    .filter(file => file.endsWith(".js"));

for (const file of eventListenerFiles) {
    const eventListener = require(`./eventListeners/${file}`);
    client.eventListeners.set(eventListener.name, eventListener);
}

// cursed shit, use https://evdokimovm.github.io/javascript/nodejs/2016/06/13/NodeJS-How-to-Use-Functions-from-Another-File-using-module-exports.html instead


// // quickActions loader
// const quickActionsFiles = fs
//     .readdirSync('./quickActions')
//     .filter(file => file.endsWith(".js"));

// for (const file of quickActionsFiles) {
//     const quickAction = require(`./quickActions/${file}`);
//     client.eventListeners.set(quickAction.name, quickAction);
// }

// Once bot is ready, log it in console and set status
client.once('ready', () => {
    client.eventListeners.get('ready').execute(client, database, startDate)
});

// Guild joining detection
client.on("guildCreate", guild => {
    // Execute the join.js extension
    client.eventListeners.get('guildCreate').execute(guild);
});

// Guild kicking/leaving detection
client.on("guildDelete", guild => {
    // Execute the leave.js file
    client.eventListeners.get('guildDelete').execute(guild);
});

// Execute commands
client.on('message', message => {
    client.eventListeners.get('message').execute(message, client, database)
});

process.on('unhandledRejection', error => {
    console.error('Unhandled promise rejection:', error);
});

// Login with token (very secret)
client.login(token);

// Use this link to add ZtereoBOT to your server https://discord.com/oauth2/authorize?client_id=713718980325539910&scope=bot&permissions=8
// Use this link to add ZtereoBOT Beta to your server https://discord.com/oauth2/authorize?client_id=791744080127197204&scope=bot&permissions=8
// Use this command to update the git on the pi lol  git pull https://github.com/ZtereoHYPE/ZtereoBOT.git (~/ZtereoBOT directory)


// OPTIMISATIONS TO DO:
// https://scotch.io/tutorials/how-to-optimize-node-requests-with-simple-caching-strategies

// Cool APIs:
// https://wiki.vg/Mojang_API
// https://medium.com/better-programming/a-curated-list-of-100-cool-and-fun-public-apis-to-inspire-your-next-project-7600ce3e9b3
// https://catfact.ninja/fact