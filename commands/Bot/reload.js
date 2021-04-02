const fs = require('fs');
const { MessageEmbed } = require('discord.js');
const path = require('path');
module.exports = {
    name: 'reload',
    category: path.dirname(__filename).split(path.sep).pop(),
    description: 'Reloads a command.',
    execute(message, args, database, shortcuts) {
        // Help command
        if (!args.length || args[0] == 'help') {
            shortcuts.functions.helpCommand(message, 'reload', 'command [command name],,category [command category],,all', 'Reloads the chosen command.,,Reloads the chosed command category.\nNote: category names are in Upper Case.,,Reloads all commands.', database[`${message.guild.id}`]["prefix"]);
            return;
        }

        // Start counting the time
        let startTime = Date.now();

        function finalEmbed(errors) {
            const embed = new MessageEmbed()
            // If there are errors make it an error embed
            if (errors.length) {
                embed.setColor('#8E1A01')
                embed.setAuthor(`Commands Reloaded but...`, 'https://imgur.com/IdwURBx.png')
                embed.setDescription(`The commands were reloaded but some had errors:`)

                // Iterate over each error and add it to the embed
                for (const error in errors) {
                    embed.addFields({ name: 'Error:', value: `\`${error}\`` })
                }

            // Else make it a success embed
            } else {
                embed.setColor('#15AABF')
                embed.setAuthor(`Commands Reloaded Successfully!`, 'https://imgur.com/yvHrC4Q.png')
                embed.setDescription(`The commands were reloaded successfully!`)
            }
            embed.setFooter(`This action took ${Date.now() - startTime}ms`)
            return embed;
        }

        // create a reloadCommand function that reloads the passed command
        function reloadCommand(commandDirectory, commandName) {
            try {
                delete require.cache[require.resolve(`../${commandDirectory}/${commandName}`)];
                const reloadedCommand = require(`../${commandDirectory}/${commandName}`);
                message.client.commands.set(reloadedCommand.name, reloadedCommand);
            } catch (error) {
                console.error(error);
                return error;
            };
            return;
        };

        if (args[0] == 'command') {
            if (!args[1]) return shortcuts.functions.quickEmbed(message, `You didn't pass any command to reload.`, 'warning');

            const commandName = args[1].toLowerCase();
            const command = message.client.commands.get(commandName)
                || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

            if (!command) return message.channel.send(`There is no command with that name or alias.`);

            const commandFolders = fs
                .readdirSync('./commands')
                .filter(file => fs.statSync(path.join('./commands', file)).isDirectory())

            const folderName = commandFolders.find(folder => fs.readdirSync(`./commands/${folder}`).includes(`${command.name}.js`));

            let error = reloadCommand(folderName, command.name + '.js');

            if (!error) {
                shortcuts.functions.quickEmbed(message, `Successfully reloaded ${command.name}! It took ${Date.now() - startTime}ms.`, 'success')
            } else {
                shortcuts.functions.quickEmbed(message, `There was an error while reloading the command.`, 'failure')
            }
            return;
        }

        if (args[0] == 'category') {
            if (!args[1]) return shortcuts.functions.quickEmbed(message, `You didn't pass any category to reload.`, 'warning');

            let errors = [];

            const commandFolders = fs
                .readdirSync('./commands')
                .filter(file => fs.statSync(path.join('./commands', file)).isDirectory())

            // If there are no commandFiles return an error
            if (!commandFolders.includes(args[1])) return shortcuts.functions.quickEmbed(message, `${args[1]} is not a valid command category`, 'warning');

            let dir = args[1];
            const commandFiles = fs
                .readdirSync(`./commands/${dir}`)
                .filter(file => file.endsWith(".js"));

            // For each of these files, try to reload it and throw any errors in the errors array
            for (const file of commandFiles) {
                let error = reloadCommand(dir, file)
                if (error) {
                    errors.push(error)
                }
            }

            // Send the embed
            message.channel.send(finalEmbed(errors));
            return;
        }

        if (args[0] == 'all') {
            let errors = [];
            
            const commandFolders = fs
                .readdirSync('./commands')
                .filter(file => fs.statSync(path.join('./commands', file)).isDirectory())

            for (const dir of commandFolders) {
                const commandFiles = fs
                    .readdirSync(`./commands/${dir}`)
                    .filter(file => file.endsWith(".js"))

                // For each file of commandFiles try to delete the cache of that file, and set the client commands to that file
                for (const file of commandFiles) {
                    let error = reloadCommand(dir, file)
                    if (error) {
                        errors.push(error)
                    }
                }
            }

            // Send the embed
            message.channel.send(finalEmbed(errors));
            return;
        }

        shortcuts.functions.quickEmbed(message, `${args[0]} isn't a valid argument for the reload command (command, category, all).`, 'warning')
    }
}