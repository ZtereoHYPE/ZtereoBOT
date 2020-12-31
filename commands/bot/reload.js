const fs = require('fs');
const Discord = require('discord.js');
const path = require('path');
module.exports = {
    name: 'reload',
    category: 'bot',
    description: 'Reloads a command.',
    execute(message, args, client, database) {
        // Help command
        if (!args.length) {
            const embed = new Discord.MessageEmbed()
                .setColor('#8EB9FE')
                .setAuthor('Reload Command Help:', 'https://i.imgur.com/dSTYnIF.png')
                .addFields(
                    { name: `${database[`${message.guild.id}`]["prefix"]}reload [command/"all"]`, value: `Reloads the chosen command.` },
                )
            message.channel.send(embed);
            return;
        }

        // If the first argument is "all", reloads every command
        if (args[0] === "all") {

            let errors = []
            const commandFolders = fs
                .readdirSync('./commands')
                .filter(file => fs.statSync(path.join('./commands', file)).isDirectory())

            for (const dir of commandFolders) {
                const commandFiles = fs
                    .readdirSync(`./commands/${dir}`)
                    .filter(file => file.endsWith(".js"));

                for (const file of commandFiles) {
                    try {
                        delete require.cache[require.resolve(`../${dir}/${file}`)]
                        const reloadedCommand = require(`../${dir}/${file}`)
                        message.client.commands.set(reloadedCommand.name, reloadedCommand);
                    } catch (error) {
                        console.error(error);
                        errors.push({
                            "name": file,
                            "error": error.message
                        })
                    }
                }
            }

            const embed = new Discord.MessageEmbed()
            if (errors.length) {
                embed.setColor('#8E1A01')
                embed.setAuthor('Commands Reloaded but...', 'https://i.imgur.com/rs1souv.png')
                embed.setDescription('All commands were reloaded but some had errors:')
                for (const error in errors) {
                    embed.addFields({ name: errors[error]['name'], value: `\`${errors[error]['error']}\`` })
                }
            } else {
                embed.setColor('#15AABF')
                embed.setAuthor('Commands Reloaded Successfully!', 'https://i.imgur.com/yvHrC4Q.png')
                embed.setDescription('All commands were reloaded with success!')
            }
            message.channel.send(embed)
            return
        }

        // Saves the selected command to the command constant.
        const commandName = args[0].toLowerCase();
        const command = message.client.commands.get(commandName)
            || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        // If the selected command doesn't exist, say it.
        if (!command) return message.channel.send(`There is no command with the name or alias \`${commandName}\`.`);

        // Delete the cache that require() made
        delete require.cache[require.resolve(`../${command.category}/${command.name}.js`)];

        // Try to reload the command from file. If an error happens, log it and send it to chat.
        try {
            const reloadedCommand = require(`../${command.category}/${command.name}.js`);
            message.client.commands.set(reloadedCommand.name, reloadedCommand);
            message.channel.send(`Successfully reloaded \`${command.name}\`!`);
        } catch (error) {
            console.error(error);
            message.channel.send(`There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``);
        }
    },
};