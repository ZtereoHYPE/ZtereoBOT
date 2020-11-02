// Load required files and save them in constants
const fs = require('fs');
const Discord = require('discord.js');
const { token } = require('./config.json');
const database = require('./database.json');
const prefix = "!";
var guildid;

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

    // Create an entry in the database with as key the guild id containing everything needed.
    database[`${guild.id}`] = {
            "prefix" : "!",
            "warnings" : 
            [

            ],
            "rules" : 
            [

            ]
        };
    
    // Save the JSON file
    var saveJson = JSON.stringify(database, null, 4);
    fs.writeFile('database.json', saveJson, 'utf8', (err)=>{
        if(err){
            console.log(err)
        }
    });

    // Log the prefix (mainly to remember the syntax lol)
    console.log(database[`${guild.id}`]["prefix"]);
});

// Guild kicking/leaving detection
client.on("guildDelete", guild => {
    console.log("Left a guild: " + guild.id);

    delete database[`${guild.id}`];

    // Save the JSON file
    var saveJson = JSON.stringify(database, null, 4)
    fs.writeFile('database.json', saveJson, 'utf8', (err)=>{
        if(err){
            console.log(err)
        }
    })
});

// Execute commands
client.on('message', message => {

    // If doesn't start with prefix, or is made by bot, cancel.
    if (!message.content.startsWith(prefix) || message.author.bot) return;

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