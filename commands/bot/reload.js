const fs = require('fs');
const { MessageEmbed } = require('discord.js');
const path = require('path');
module.exports = {
    name: 'reload',
    category: path.dirname(__filename).split(path.sep).pop(),
    description: 'Reloads a command.',
    execute(message, args, database, shortcuts) {
        // Help command
        if (!args.length) {
            shortcuts.functions.helpCommand(message, 'reload', '[command],,all,,[command category]', 'Reloads the chosen command.,,Reloads all commands.,,Reloads the chosed command category.', database[`${message.guild.id}`]["prefix"]);
            return;
        }

        // If the first argument is "all", reloads every command
        let startTime = Date.now();

        // If the argument is all then reload all commands
        if (args[0] === "all") {
            // Make empty errors array
            let errors = [];

            // Make commandFolders containing the command folders
            const commandFolders = fs
                .readdirSync('./commands')
                .filter(file => fs.statSync(path.join('./commands', file)).isDirectory())

            // For each directory of commandFolders, save its internal js files to commandFiles
            for (const dir of commandFolders) {
                const commandFiles = fs
                    .readdirSync(`./commands/${dir}`)
                    .filter(file => file.endsWith(".js"))

                // For each file of commandFiles try to delete the cache of that file, and set the client commands to that file
                for (const file of commandFiles) {
                    try {
                        delete require.cache[require.resolve(`../${dir}/${file}`)];
                        const reloadedCommand = require(`../${dir}/${file}`);
                        message.client.commands.set(reloadedCommand.name, reloadedCommand);

                        // In case of errors, push em to the errors array
                    } catch (error) {
                        console.error(error);
                        errors.push({
                            "name": file,
                            "error": error.message
                        })
                    }
                }
            }

            // Make new embed
            const embed = new MessageEmbed();

            // If there are errors, make embed with errors title
            if (errors.length) {
                embed.setColor('#8E1A01');
                embed.setAuthor('Commands Reloaded but...', 'https://i.imgur.com/rs1souv.png');
                embed.setDescription('All commands were reloaded but some had errors:');

                // For each error in errors add a field with the name and the error
                for (const error in errors) {
                    embed.addFields({ name: errors[error]['name'], value: `\`${errors[error]['error']}\`` });
                }

                // If there are no errors make embed with no errors title
            } else {
                embed.setColor('#15AABF');
                embed.setAuthor('Commands Reloaded Successfully!', 'https://i.imgur.com/yvHrC4Q.png');
                embed.setDescription('All commands were reloaded with success!');
            }
            embed.setFooter(`This action took ${Date.now() - startTime}ms`);
            message.channel.send(embed);
            return;
        }



        // Saves the selected command to the command constant.
        const commandName = args[0].toLowerCase();
        const command = message.client.commands.get(commandName)
            || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));


        // If the selected command doesn't exist, try to see if it's a category
        if (!command) {
            // Make empty errors array
            let errors = []

            // Save all the commands folders in commandFolders
            const commandFolders = fs
                .readdirSync('./commands')
                .filter(file => fs.statSync(path.join('./commands', file)).isDirectory())

            // If the first argument is included in commandFolders, read all files in it
            if (commandFolders.includes(args[0].toLowerCase())) {
                let dir = args[0].toLowerCase()
                const commandFiles = fs
                    .readdirSync(`./commands/${dir}`)
                    .filter(file => file.endsWith(".js"));

                // For each of these files, try to reload it and throw any errors in the errors array
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
                // Make an embed
                const embed = new MessageEmbed()

                // If there are errors make it an error embed
                if (errors.length) {
                    embed.setColor('#8E1A01')
                    embed.setAuthor(`Commands Reloaded but...`, 'https://i.imgur.com/rs1souv.png')
                    embed.setDescription(`All \`${dir}\` commands were reloaded but some had errors:`)

                    // Iterate over each error and add it to the embed
                    for (const error in errors) {
                        embed.addFields({ name: errors[error]['name'], value: `\`${errors[error]['error']}\`` })
                    }

                    // Else make it a success embed
                } else {
                    embed.setColor('#15AABF')
                    embed.setAuthor(`Commands Reloaded Successfully!`, 'https://i.imgur.com/yvHrC4Q.png')
                    embed.setDescription(`All \`${dir}\` commands were reloaded with success!`)
                }
                embed.setFooter(`This action took ${Date.now() - startTime}ms`)

                // Send the embed
                message.channel.send(embed)
                return;
            }
        }

        // Try to delete the cache and if it fails, say the command doesn't exist (most probable reason lol)
        try {
            delete require.cache[require.resolve(`../${command.category}/${command.name}.js`)];
        } catch (error) {
            shortcuts.functions.quickEmbed(message, 'That command does not exist.', 'failure')
            return;
        }

        // Try to reload the command from file. If an error happens, send it to chat.
        try {
            const reloadedCommand = require(`../${command.category}/${command.name}.js`);
            message.client.commands.set(reloadedCommand.name, reloadedCommand);
            shortcuts.functions.quickEmbed(message, `Successfully reloaded ${command.name}! It took ${Date.now() - startTime}ms.`, 'success')
        } catch (error) {
            shortcuts.functions.quickEmbed(message, `There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``, 'failure')
        }
    },
};