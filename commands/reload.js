const fs = require('fs');
const database = require('../database.json');
const Discord = require('discord.js');
module.exports = {
	name: 'reload',
	description: 'Reloads a command',
	execute(message, args) {
        // Help command
		if (!args.length || args[0] == 'help') {
            const embed = new Discord.MessageEmbed()
            .setColor('#00cc00')
            .setTitle('Reload Command Help:')
            .addFields(
                { name: `${database[`${message.guild.id}`]["prefix"]}reload [command/"all"] **(Admin only)**`, value: `Reloads the chosed command.` },
            )
            message.channel.send(embed);
            return;
        }

        // If the first argument is "all", reloads every command
        if (args[0] === "all") {
            const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
            for (const file of commandFiles) {
                delete require.cache[require.resolve(`./${file}`)];
	            try {
                    const reloadedCommand = require(`./${file}`);
                    message.client.commands.set(reloadedCommand.name, reloadedCommand);
                    message.channel.send(`Successfully reloaded \`${file}\`!`);
                } catch (error) {
                    console.error(error);
                    message.channel.send(`There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``);
                }
            }
            return;
        }
        // Saves the selected command to the command constant.
        const commandName = args[0].toLowerCase();
        const command = message.client.commands.get(commandName)
	        || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        // If the selected command doesn't exist, say it.
        if (!command) return message.channel.send(`There is no command with the name or alias \`${commandName}\`.`);

        // Delete the cache that require() made
        delete require.cache[require.resolve(`./${command.name}.js`)];

        // Try to reload the command from file. If an error happens, log it and send it to chat.
        try {
            const reloadedCommand = require(`../commands/${command.name}.js`);
            message.client.commands.set(reloadedCommand.name, reloadedCommand);
            message.channel.send(`Successfully reloaded \`${command.name}\`!`);
        } catch (error) {
            console.error(error);
            message.channel.send(`There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``);
        }
    },
};